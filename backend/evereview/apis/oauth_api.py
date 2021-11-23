from flask_restx import Namespace, Resource, reqparse, fields
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    decode_token,
    get_jwt,
)

from evereview.services.oauth_service import CLIENT_ID, SCOPE, authorization
from evereview.services.user_service import (
    get_user_by_id,
    get_user_by_email,
    insert_user,
    update_token,
)


oauth_namespace = Namespace(name="oauth", description="oauth 인증을 위해 사용하는 api")


clientinfo_response = oauth_namespace.model(
    "clientinfo",
    {
        "client_id": fields.String(description="구글 로그인 요청을 위한 client_id"),
        "scopes": fields.List(fields.String, description="google api scope"),
    },
)

authorization_response = oauth_namespace.model(
    "authorization",
    {
        "is_member": fields.Boolean(description="회원 여부"),
        "email": fields.String(description="이메일"),
        "name": fields.String(description="이름"),
        "img_url": fields.String(description="이미지 url"),
        "access_token": fields.String(description="엑세스 토큰"),
    },
)


@oauth_namespace.route("/clientinfo")
class ClientInfo(Resource):
    @oauth_namespace.response(200, "SUCCESS", clientinfo_response)
    def get(self):
        return {"client_id": CLIENT_ID, "scopes": SCOPE}


@oauth_namespace.route("/authorization/<string:code>")
class Authorization(Resource):
    @oauth_namespace.doc(params={"code": "구글 로그인 결과로 받은 authorization code"})
    @oauth_namespace.response(200, "SUCCESS", authorization_response)
    def get(self, code):
        oauth_token, user_email, user_name, user_img = authorization(code)

        user = get_user_by_email(user_email)
        is_member = True
        if user is None:
            user = insert_user(user_email, user_name, user_img)
        elif user.contents_category is None or user.upload_term is None:
            is_member = False

        access_token = create_access_token(
            identity=user.id,
            additional_claims={"email": user_email, "name": user_name, "img": user_img},
        )
        refresh_token = create_refresh_token(identity=user.id)

        update_token(
            user_id=user.id,
            oauth_token=oauth_token,
            access_token=access_token,
            refresh_token=refresh_token,
        )

        return {
            "is_member": is_member,
            "email": user_email,
            "name": user_name,
            "img_url": user_img,
            "access_token": access_token,
        }


@oauth_namespace.route("/refresh/<int:user_id>")
class Refresh(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "Authorization", location="headers", help='"Bearer {access_token}"'
    )

    @oauth_namespace.expect(parser)
    @jwt_required()
    def get(self, user_id):
        token_identity = get_jwt_identity()
        if token_identity != user_id:
            return {"result": "fail", "message": "권한이 없습니다."}, 403

        user = get_user_by_id(user_id=user_id)
        if user is None:
            return {"result": "fail", "message": "존재하지 않는 회원입니다."}, 404

        access_token = user.access_token
        refresh_token = user.refresh_token
        if not user.refresh_token:
            return {"result": "fail", "message": "다시 로그인 해주세요"}, 403

        try:
            decoded_access_token = decode_token(access_token, allow_expired=True)
            if get_jwt().get("exp") != decoded_access_token.get("exp"):
                return {"result": "fail", "message": "다시 로그인 해주세요"}, 403

            decoded_refresh_token = decode_token(refresh_token)
            new_access_token = create_access_token(
                identity=decoded_refresh_token.get("sub"),
                additional_claims={"email": user.email, "name": user.name},
            )
            update_token(
                user_id=user.id,
                oauth_token=user.oauth_token,
                access_token=new_access_token,
                refresh_token=user.refresh_token,
            )
            return {"result": "success", "access_token": new_access_token}, 200
        except Exception:
            raise
