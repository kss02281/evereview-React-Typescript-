from flask_restx import Namespace, Resource, reqparse, fields

from evereview.services.comment_service import get_comment, get_comments

comment_namespace = Namespace("comments", description="comment 리소스 가져오기")

parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)

response_fail = comment_namespace.model(
    "simple_fail", {"result": fields.String(default="fail"), "message": fields.String}
)

comment = comment_namespace.model(
    "comment",
    {
        "id": fields.String,
        "author": fields.String,
        "author_img": fields.String,
        "text_display": fields.String,
        "text_original": fields.String,
        "like_count": fields.Integer,
        "published_at": fields.DateTime,
    },
)
comment_list = comment_namespace.model(
    "comment_list", {"comment_items": fields.List(fields.Nested(comment))}
)


@comment_namespace.route("/<string:comment_id>")
@comment_namespace.doc(params={"comment_id": "comment id"})
class Comment(Resource):
    @comment_namespace.expect(parser)
    @comment_namespace.response(200, "Comment Success", comment)
    @comment_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @comment_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @comment_namespace.response(404, "Video Fail(존재하지 않는 댓글)", response_fail)
    def get(self, comment_id):
        comment = get_comment(comment_id)
        if comment is None:
            return {"result": "fail", "message": "존재하지 않는 리소스입니다."}, 404

        result = comment.to_dict()

        return result, 200


@comment_namespace.route("/cluster/<string:cluster_id>")
@comment_namespace.doc(params={"cluster_id": "analysis 요청으로 얻은 cluster_id"})
class Comments(Resource):
    @comment_namespace.expect(parser)
    @comment_namespace.response(200, "Comments Success", comment_list)
    @comment_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @comment_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @comment_namespace.response(404, "Video Fail(존재하지 않는 cluster)", response_fail)
    def get(self, cluster_id):
        comments = get_comments(cluster_id)

        if len(comment) == 0:
            return {"result": "fail", "message": "존재하지 않는 리소스입니다."}, 404

        return comments, 200
