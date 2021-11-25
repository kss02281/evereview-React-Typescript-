from typing_extensions import Required
from flask_restx import Namespace, Resource, reqparse, fields
from flask_jwt_extended import jwt_required, get_jwt_identity

from evereview.services.user_service import get_user_by_id, update_user

user_namespace = Namespace("user", description="user 리소스 가져오기, 수정하기")

parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)

patch_parser = parser.copy()
patch_parser.add_argument(
    "nickname", type=str, location="form", required=True, help="변경할 닉네임(별명)"
)
patch_parser.add_argument(
    "upload_term", type=int, location="form", required=True, help="변경할 영상업로드 주기"
)
patch_parser.add_argument(
    "contents_category",
    type=str,
    required=True,
    action="split",
    location="form",
    help="변경할 주력 컨텐츠 카테고리",
)

user_success = user_namespace.model(
    "user_success",
    {
        "result": fields.String(example="success"),
        "email": fields.String,
        "name": fields.String,
        "nickname": fields.String,
        "upload_term": fields.Integer,
        "contents_category": fields.String,
        "img_url": fields.String,
    },
)
user_fail = user_namespace.model(
    "user_fail", {"result": fields.String(example="fail"), "message": fields.String}
)


@user_namespace.route("")
class User(Resource):
    @user_namespace.expect(parser)
    @user_namespace.response(200, "Get User Success", user_success)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

        user = get_user_by_id(user_id)

        result = {
            "result": "success",
            "email": user.email,
            "name": user.name,
            "nickname": user.nickname,
            "upload_term": user.upload_term,
            "contents_category": user.contents_category,
            "img_url": user.img_url,
        }

        return result, 200

    @user_namespace.expect(patch_parser)
    @user_namespace.response(200, "Update User Success", user_success)
    @user_namespace.response(400, "Update User Fail(파라미터 누락)", user_fail)
    @jwt_required()
    def patch(self):
        user_id = get_jwt_identity()

        args = patch_parser.parse_args()

        nickname = args.get("nickname")
        upload_term = args.get("upload_term")
        contents_category = args.get("contents_category")

        user = update_user(
            user_id=user_id,
            nickname=nickname,
            upload_term=upload_term,
            contents_category=contents_category,
        )

        result = {
            "result": "success",
            "email": user.email,
            "name": user.name,
            "nickname": user.nickname,
            "upload_term": user.upload_term,
            "contents_category": user.contents_category,
            "img_url": user.img_url,
        }

        return result, 200
