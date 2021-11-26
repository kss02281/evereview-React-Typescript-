from flask_restx import Namespace, Resource, fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from evereview.services.channel_service import get_channel, get_channels

channel_namespace = Namespace("channels", description="channel 리소스 가져오기, 추가하기")


parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)

response_fail = channel_namespace.model(
    "simple_fail", {"result": fields.String(default="fail"), "message": fields.String}
)
channel = channel_namespace.model(
    "channel",
    {
        "id": fields.String,
        "title": fields.String,
        "comment_count": fields.Integer,
        "video_count": fields.Integer,
        "channel_url": fields.String,
        "img_url": fields.String,
    },
)
channel_list = channel_namespace.model(
    "channel_list", {"channel_items": fields.List(fields.Nested(channel))}
)


@channel_namespace.route("")
class AddChannel(Resource):
    channel_parser = parser.copy()
    channel_parser.add_argument(
        "channel_url",
        type=str,
        location="form",
        help="channel_url: 해당 채널의 channel_id가 적혀있는 url",
    )

    @channel_namespace.expect(parser)
    @channel_namespace.response(200, "Channels Success", channel_list)
    @channel_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @channel_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        result = get_channels(user_id)

        return result, 200

    @channel_namespace.expect(channel_parser)
    @channel_namespace.response(200, "Channel Resource", channel)
    @channel_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @channel_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    def post(self):
        """
        ToDo : youtube data api 연동 후 작업
        """
        user_id = get_jwt_identity()
        channel_url = self.channel_parser.parse_args("channel_url")

        return {"result": "아직 미구현", "message": channel_url}, 200


@channel_namespace.route("/<string:channel_id>")
@channel_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class Channel(Resource):
    @channel_namespace.expect(parser)
    @channel_namespace.response(200, "Channel Resource", channel)
    @channel_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @channel_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @channel_namespace.response(404, "Channel Fail(없는 channel_id)", response_fail)
    @jwt_required()
    def get(self, channel_id):
        channel = get_channel(channel_id)

        if channel is None:
            return {"result": "fail", "message": "존재하지 않는 리소스 입니다."}, 404

        result = {
            "channel_id": channel.id,
            "title": channel.title,
            "comment_count": channel.comment_count,
            "video_count": channel.video_count,
            "channel_url": channel.channel_url,
            "img_url": channel.img_url,
        }
        return result, 200
