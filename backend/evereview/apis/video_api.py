from flask_restx import Namespace, Resource, reqparse, fields

from evereview.services.video_service import get_video, get_videos

video_namespace = Namespace("videos", description="video 리소스 가져오기")

parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)

response_fail = video_namespace.model(
    "simple_fail", {"result": fields.String(default="fail"), "message": fields.String}
)
video = video_namespace.model(
    "video",
    {
        "id": fields.String,
        "published_at": fields.DateTime,
        "thumbnail_url": fields.String,
        "category_id": fields.Integer,
        "view_count": fields.Integer,
        "like_count": fields.Integer,
        "comment_count": fields.Integer,
    },
)
video_list = video_namespace.model(
    "video_list", {"video_items": fields.List(fields.Nested(video))}
)


@video_namespace.route("/<string:video_id>")
@video_namespace.doc(params={"video_id": "/videos 요청을 통해 얻은 video_id"})
class Video(Resource):
    @video_namespace.expect(parser)
    @video_namespace.response(200, "Video Success", video)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 영상)", response_fail)
    def get(self, video_id):
        video = get_video(video_id)
        if video is None:
            return {"result": "fail", "message": "존재하지 않는 리소스입니다."}, 404
        result = video.to_dict()
        return result, 200


@video_namespace.route("/all/<string:channel_id>")
@video_namespace.doc(params={"channel_id": "/channel 요청을 통해 얻은 channel_id"})
class Videos(Resource):
    @video_namespace.expect(parser)
    @video_namespace.response(200, "Video Success", video_list)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 채널)", response_fail)
    def get(self, channel_id):
        videos = get_videos(channel_id)
        if videos is None:
            return {"result": "fail", "message": "존재하지 않는 리소스입니다."}, 404

        return videos, 200


@video_namespace.route("/hot/<string:channel_id>")
@video_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class HotVideos(Resource):
    @video_namespace.expect(parser)
    @video_namespace.response(200, "Video Success", video_list)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 채널)", response_fail)
    def get(self):
        """
        ToDo: 아직 미구현
        """
        return {"result": "아직 미구현"}
