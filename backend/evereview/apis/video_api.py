from flask_restx import Namespace, Resource

video_namespace = Namespace("video")


@video_namespace.route("/all/<string:channel_id>")
@video_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class Videos(Resource):
    def get(self, channel_id):
        return {"result": "video get method"}


@video_namespace.route("/hot/<string:channel_id>")
@video_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class HotVideo(Resource):
    def get(self):
        return {"result": "hot video get method"}
