from flask_restx import Namespace, Resource, reqparse

channel_namespace = Namespace("channel")


@channel_namespace.route("/<string:channel_id>")
@channel_namespace.doc(
    params={"channel_id": "user_id와 /channel/all 요청을 통해 얻은 channel_id"}
)
class Channel(Resource):
    def get(self, channel_id):
        return {"result": "channel get method"}


@channel_namespace.route("/<string:user_id>")
@channel_namespace.doc(params={"user_id": "user정보의 user_id"})
class AddChannel(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "channel_url",
        type=str,
        location="form",
        help="channel_url: 해당 채널의 channel_id가 적혀있는 url",
    )

    @channel_namespace.expect(parser)
    def post(self, user_id):
        return {"result": "channel post method"}


@channel_namespace.route("/all/<string:user_id>")
@channel_namespace.doc(params={"user_id": "user정보의 user_id"})
class Channels(Resource):
    def get(self, user_id):
        return {"result": "channels get method"}
