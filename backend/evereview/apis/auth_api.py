from datetime import datetime

from flask_restx import Namespace, Resource, reqparse, fields
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    decode_token,
    get_jwt,
)

from evereview.services.oauth_service import authorization
from evereview.services.user_service import (
    get_user_by_id,
    get_user_by_email,
    insert_user,
    update_token,
)


auth_namespace = Namespace(name="auth", description="evereview auth api")


@auth_namespace.route("/signin")
class Signin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "code",
        type=str,
        location="form",
        required=True,
        help="google login을 통해 얻은 authorization code",
    )

    response_success = auth_namespace.model(
        "signin_success",
        {
            "is_member": fields.Boolean(example=True),
            "email": fields.String(description="이메일"),
            "name": fields.String(description="이름"),
            "img_url": fields.String(description="이미지 url"),
            "access_token": fields.String(description="엑세스 토큰"),
        },
    )
    response_fail = auth_namespace.model(
        "signin_fail",
        {
            "is_member": fields.Boolean(example=False),
            "email": fields.String(description="이메일"),
            "name": fields.String(description="이름"),
            "img_url": fields.String(description="이미지 url"),
        },
    )

    @auth_namespace.expect(parser)
    @auth_namespace.response(200, "Signin Success", response_success)
    @auth_namespace.response(404, "Signin Fail", response_fail)
    def post(self):
        code = self.parser.parse_args().get("code")
        oauth_token, user_email, user_name, user_img = authorization(code)
        user = get_user_by_email(user_email)
        if user is None:
            return {
                "is_member": False,
                "email": user_email,
                "name": user_name,
                "img_url": user_img,
            }, 404

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        update_token(
            user_id=user.id,
            oauth_token=oauth_token,
            access_token=access_token,
            refresh_token=refresh_token,
        )

        return {
            "access_token": access_token,
            "is_member": True,
            "email": user_email,
            "name": user_name,
            "img_url": user_img,
        }, 200


@auth_namespace.route("/signup")
class Signup(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email", type=str, location="form", required=True, help="email")
    parser.add_argument("name", type=str, location="form", required=True, help="이름")
    parser.add_argument(
        "nickname", type=str, location="form", required=True, help="닉네임(별명)"
    )
    parser.add_argument(
        "img_url", type=str, location="form", required=True, help="프로필 이미지 url"
    )
    parser.add_argument(
        "upload_term", type=int, location="form", required=True, help="업로드 주기"
    )
    parser.add_argument(
        "contents_category",
        type=str,
        location="form",
        required=True,
        help="주력 컨텐츠 카테고리",
    )

    response_success = auth_namespace.model(
        "signup_success", {"result": fields.String(example="success")}
    )

    @auth_namespace.expect(parser)
    @auth_namespace.response(200, "Signup Success", response_success)
    def post(self):
        form_data = self.parser.parse_args()
        email = form_data.get("email")
        name = form_data.get("name")
        nickname = form_data.get("img_url")
        img_url = form_data.get("upload_term")
        contents_category = form_data("contents_category")

        insert_user(
            email=email,
            name=name,
            nickname=nickname,
            img_url=img_url,
            contents_category=contents_category,
        )

        return {"result": "success"}, 200


@auth_namespace.route("/refresh")
class Refresh(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "Authorization",
        location="headers",
        required=True,
        help='"Bearer {access_token}"',
    )

    @auth_namespace.expect(parser)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

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

            decoded_refresh_token = decode_token(refresh_token, allow_expired=True)
            if decoded_refresh_token.get("exp") < datetime.now():
                return {"result": "fail", "message": "다시 로그인 해주세요"}, 403

            new_access_token = create_access_token(
                identity=decoded_refresh_token.get("sub")
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
