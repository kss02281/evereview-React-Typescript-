from flask_restx import Namespace, Resource, fields, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from evereview.services.user_service import get_user_by_id
from evereview.services.channel_service import (
    get_channels,
    insert_channel,
    update_channel,
)
from evereview.services.oauth_service import fetch_channels, fetch_user_channels

channel_namespace = Namespace("channels", description="channel 리소스 가져오기, 추가하기")


parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)
channel_parser = parser.copy()
channel_parser.add_argument(
    "channel_url",
    type=str,
    location="form",
    help="channel_url: 해당 채널의 channel_id가 적혀있는 url",
)

response_fail = channel_namespace.model(
    "fail", {"result": fields.String(default="fail"), "message": fields.String}
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
class Channels(Resource):
    @channel_namespace.expect(parser)
    @channel_namespace.response(200, "Channels Success", channel_list)
    @channel_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @channel_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = get_user_by_id(user_id)
        oauth_token = user.oauth_token

        channels_db = get_channels(user_id)
        channel_ids = list(map(lambda channel: channel.get("id"), channels_db))

        result = []
        if len(channels_db) > 0:
            updated_channel_info = fetch_channels(channel_ids)
            for channel in updated_channel_info:
                updated_channel = update_channel(
                    channel_id=channel.get("channel_id"),
                    user_id=user_id,
                    title=channel.get("title"),
                    comment_count=channel.get("comment_count"),
                    video_count=channel.get("video_count"),
                    channel_url=channel.get("channel_url"),
                    img_url=channel.get("img_url"),
                )
                result.append(updated_channel.to_dict())

        channels_oauth = fetch_user_channels(oauth_token, admin=user.admin)
        for channel in channels_oauth:
            if channel.get("channel_id") not in channel_ids:
                new_channel = insert_channel(
                    channel_id=channel.get("channel_id"),
                    user_id=user_id,
                    title=channel.get("title"),
                    comment_count=channel.get("comment_count"),
                    video_count=channel.get("video_count"),
                    channel_url=channel.get("channel_url"),
                    img_url=channel.get("img_url"),
                )
                result.append(new_channel.to_dict())

        return result, 200


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
        channels_db = get_channels(get_jwt_identity())
        channels_db = list(map(lambda channel: channel.get("id"), channels_db))

        channel_fetch = fetch_channels(channel_id)

        if channel_id not in channels_db or len(channel_fetch) == 0:
            return {"result": "fail", "message": "존재하지 않는 리소스 입니다."}, 404

        channel_fetch = channel_fetch[0]

        updated_channel = update_channel(
            channel_id=channel_fetch.get("channel_id"),
            user_id=channel_fetch.get("user_id"),
            title=channel_fetch.get("title"),
            comment_count=channel_fetch.get("comment_count"),
            video_count=channel_fetch.get("video_count"),
            channel_url=channel_fetch.get("channel_url"),
            img_url=channel_fetch.get("img_url"),
        )

        result = updated_channel.to_dict()

        return result, 200
