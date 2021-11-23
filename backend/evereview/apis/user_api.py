from flask_restx import Namespace, Resource, reqparse

user_namespace = Namespace("user")

parser = reqparse.RequestParser()
parser.add_argument("nickname", type=str, location="form", help="변경할 닉네임(별명)")
parser.add_argument("upload_term", type=int, location="form", help="변경할 영상업로드 주기")
parser.add_argument(
    "contents_category",
    type=str,
    action="split",
    location="form",
    help="변경할 주력 컨텐츠 카테고리",
)


@user_namespace.route("/<string:user_id>")
@user_namespace.doc(params={"user_id": "유저 식별을 위한 user_id"})
class User(Resource):
    def get(self, user_id):
        return {"result": f"get user number {user_id}"}

    @user_namespace.expect(parser)
    def patch(self, user_id):
        return {"result": f"patch user number {user_id}"}
