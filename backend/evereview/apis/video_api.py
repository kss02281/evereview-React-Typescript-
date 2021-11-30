from flask_restx import Namespace, Resource, reqparse, fields
from flask_jwt_extended import jwt_required

from evereview.services.oauth_service import fetch_videos, search_videos
from evereview.services.video_service import (
    get_video,
    get_videos,
    insert_video,
    update_video,
)
from evereview.services.channel_service import get_channel

video_namespace = Namespace("videos", description="video 리소스 가져오기")

parser = reqparse.RequestParser()
parser.add_argument(
    "Authorization",
    location="headers",
    required=True,
    help='"Bearer {access_token}"',
)

response_fail = video_namespace.model(
    "fail", {"result": fields.String(default="fail"), "message": fields.String}
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
page_info = video_namespace.model(
    "page_info", {"totalResults": fields.Integer, "resultsPerPage": fields.Integer}
)
video_list = video_namespace.model(
    "video_list",
    {
        "video_items": fields.List(fields.Nested(video)),
        "next_page_token": fields.String,
        "prev_page_token": fields.String,
        "page_info": fields.List(fields.Nested(page_info)),
    },
)


@video_namespace.route("/<string:video_id>")
@video_namespace.doc(params={"video_id": "/videos 요청을 통해 얻은 video_id"})
class Video(Resource):
    @video_namespace.expect(parser)
    @video_namespace.response(200, "Video Success", video)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 영상)", response_fail)
    @jwt_required()
    def get(self, video_id):
        video = get_video(video_id)
        if video is None:
            return {"result": "fail", "message": "존재하지 않는 리소스입니다."}, 404

        result = video.to_dict()
        return result, 200


@video_namespace.route("/all")
class Videos(Resource):
    all_parser = parser.copy()
    all_parser.add_argument(
        "channel_id",
        location="args",
        required=True,
        help="channel_id",
    )
    all_parser.add_argument(
        "page_token",
        location="args",
        help="page",
    )

    @video_namespace.expect(all_parser)
    @video_namespace.response(200, "Video Success", video_list)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 채널)", response_fail)
    @jwt_required()
    def get(self):
        args = self.all_parser.parse_args()
        channel_id = args.get("channel_id")
        page = args.get("page_token")

        channel = get_channel(channel_id)
        if channel is None:
            return {"result": "fail", "message": "존재하지 않는 채널입니다"}, 404

        new_videos, page_info, next_page_token, prev_page_token = fetch_videos(
            channel_id, page
        )

        videos = get_videos(channel_id)
        videos_id = set(map(lambda video: video.get("id"), videos))

        video_itmes = []
        for video in new_videos:
            video_id = video.get("id")
            if video_id in videos_id:
                item = update_video(
                    video_id=video_id,
                    title=video.get("title"),
                    thumbnail_url=video.get("thumbnail_url"),
                    category_id=video.get("category_id"),
                    view_count=video.get("view_count"),
                    like_count=video.get("like_count"),
                    comment_count=video.get("comment_count"),
                )
            else:
                item = insert_video(
                    video_id=video_id,
                    channel_id=video.get("channel_id"),
                    title=video.get("title"),
                    published_at=video.get("published_at"),
                    thumbnail_url=video.get("thumbnail_url"),
                    category_id=video.get("category_id"),
                    view_count=video.get("view_count"),
                    like_count=video.get("like_count"),
                    comment_count=video.get("comment_count"),
                )
            video_itmes.append(item.to_dict())

        result = {}
        result["video_items"] = video_itmes
        result["page_info"] = page_info
        result["next_page_token"] = next_page_token
        result["prev_page_token"] = prev_page_token

        return result, 200


@video_namespace.route("/search")
@video_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class SearchVideos(Resource):
    search_parser = parser.copy()
    search_parser.add_argument(
        "channel_id",
        location="args",
        required=True,
        help="channel_id",
    )
    search_parser.add_argument(
        "query",
        location="args",
        required=True,
        help="검색어",
    )
    search_parser.add_argument(
        "page_token",
        location="args",
        help="page",
    )

    @video_namespace.expect(search_parser)
    @video_namespace.response(200, "Video Success", video_list)
    @video_namespace.response(400, "Channel Fail(잘못된 요청)", response_fail)
    @video_namespace.response(403, "Channel Fail(권한 없음)", response_fail)
    @video_namespace.response(404, "Video Fail(존재하지 않는 채널)", response_fail)
    @jwt_required()
    def get(self):
        args = self.search_parser.parse_args()
        channel_id = args.get("channel_id")
        query = args.get("query")
        page = args.get("page_token")

        channel = get_channel(channel_id)
        if channel is None:
            return {"result": "fail", "message": "존재하지 않는 채널입니다"}, 404

        new_videos, page_info, next_page_token, prev_page_token = search_videos(
            query, channel_id, page
        )

        videos = get_videos(channel_id)
        videos_id = set(map(lambda video: video.get("id"), videos))

        video_itmes = []
        for video in new_videos:
            video_id = video.get("id")
            if video_id in videos_id:
                item = update_video(
                    video_id=video_id,
                    title=video.get("title"),
                    thumbnail_url=video.get("thumbnail_url"),
                    category_id=video.get("category_id"),
                    view_count=video.get("view_count"),
                    like_count=video.get("like_count"),
                    comment_count=video.get("comment_count"),
                )
            else:
                item = insert_video(
                    video_id=video_id,
                    channel_id=video.get("channel_id"),
                    title=video.get("title"),
                    published_at=video.get("published_at"),
                    thumbnail_url=video.get("thumbnail_url"),
                    category_id=video.get("category_id"),
                    view_count=video.get("view_count"),
                    like_count=video.get("like_count"),
                    comment_count=video.get("comment_count"),
                )
            video_itmes.append(item.to_dict())

        result = {}
        result["video_items"] = video_itmes
        result["page_info"] = page_info
        result["next_page_token"] = next_page_token
        result["prev_page_token"] = prev_page_token

        return result, 200


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
    @jwt_required()
    def get(self):
        """
        ToDo: 아직 미구현
        """
        return {"result": "아직 미구현"}
