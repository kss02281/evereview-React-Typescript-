from flask_restx import Namespace, Resource, reqparse, fields

from evereview.services.oauth_service import CLIENT_ID, SCOPE


oauth_namespace = Namespace(name="oauth", description="oauth 인증을 위해 사용하는 api")


clientinfo_response = oauth_namespace.model(
    "clientinfo",
    {
        "client_id": fields.String(description="구글 로그인 요청을 위한 client_id"),
        "scopes": fields.List(fields.String, description="google api scope"),
    },
)


@oauth_namespace.route("/clientinfo")
class ClientInfo(Resource):
    @oauth_namespace.response(200, "SUCCESS", clientinfo_response)
    def get(self):
        return {"client_id": CLIENT_ID, "scopes": SCOPE}
