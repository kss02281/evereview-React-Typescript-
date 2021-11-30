from flask_restx import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from evereview.utils.dto import ChannelDto
from evereview.services import oauth_service, user_service, channel_service

api = ChannelDto.api

parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)


@api.route("")
@api.response(200, "Channels Success", ChannelDto.channel_list)
@api.response(400, "Channel Fail(잘못된 요청)", ChannelDto.fail)
@api.response(403, "Channel Fail(권한 없음)", ChannelDto.fail)
class Channels(Resource):
    @api.expect(parser)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = user_service.get_user_by_id(user_id)
        oauth_token = user.oauth_token

        channels_db = channel_service.get_channels(user_id)
        channel_ids = list(map(lambda channel: channel.get("id"), channels_db))

        result = []
        if len(channels_db) > 0:
            updated_channel_info = oauth_service.fetch_channels(channel_ids)
            for channel in updated_channel_info:
                updated_channel = channel_service.update_channel(
                    channel_id=channel.get("channel_id"),
                    user_id=user_id,
                    title=channel.get("title"),
                    comment_count=channel.get("comment_count"),
                    video_count=channel.get("video_count"),
                    channel_url=channel.get("channel_url"),
                    img_url=channel.get("img_url"),
                )
                result.append(updated_channel.to_dict())

        channels_oauth = oauth_service.fetch_user_channels(
            oauth_token, admin=user.admin
        )
        for channel in channels_oauth:
            if channel.get("channel_id") not in channel_ids:
                new_channel = channel_service.insert_channel(
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


@api.route("/<string:channel_id>")
@api.doc(params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"})
@api.response(200, "Channel Resource", ChannelDto.channel)
@api.response(400, "Channel Fail(잘못된 요청)", ChannelDto.fail)
@api.response(403, "Channel Fail(권한 없음)", ChannelDto.fail)
@api.response(404, "Channel Fail(없는 channel_id)", ChannelDto.fail)
class Channel(Resource):
    @api.expect(parser)
    @jwt_required()
    def get(self, channel_id):
        channels_db = channel_service.get_channels(get_jwt_identity())
        channels_db = list(map(lambda channel: channel.get("id"), channels_db))

        channel_fetch = oauth_service.fetch_channels(channel_id)

        if channel_id not in channels_db or len(channel_fetch) == 0:
            return {"result": "fail", "message": "존재하지 않는 리소스 입니다."}, 404

        channel_fetch = channel_fetch[0]

        updated_channel = channel_service.update_channel(
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
