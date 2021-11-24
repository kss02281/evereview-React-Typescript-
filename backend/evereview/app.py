from flask import Flask, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restx import Api
import jwt

from evereview import config
from evereview.db_connect import db

from evereview.apis.oauth_api import oauth_namespace
from evereview.apis.auth_api import auth_namespace
from evereview.apis.user_api import user_namespace
from evereview.apis.channel_api import channel_namespace
from evereview.apis.video_api import video_namespace
from evereview.apis.comment_api import comment_namespace
from evereview.apis.chart_api import chart_namespace
from evereview.apis.analysis_api import analysis_namespace


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app, supports_credentials=True)
    JWTManager(app)

    db.init_app(app)
    Migrate().init_app(app, db)

    @app.route("/")
    def landing():
        return "hello evereview"

    restx_bp = Blueprint("api", __name__, url_prefix="/api")
    restx = Api(restx_bp)
    restx.add_namespace(oauth_namespace)
    restx.add_namespace(auth_namespace)
    restx.add_namespace(user_namespace)
    restx.add_namespace(channel_namespace)
    restx.add_namespace(video_namespace)
    restx.add_namespace(comment_namespace)
    restx.add_namespace(chart_namespace)
    restx.add_namespace(analysis_namespace)

    @restx.errorhandler
    def default_error_handler(error):
        # default status code
        status_code = getattr(error, "status_code", 500)

        if isinstance(error, jwt.exceptions.ExpiredSignatureError):
            return {"result": "fail", "message": "토큰이 만료되었습니다."}, 403

    app.register_blueprint(restx_bp)

    return app


application = create_app()

if __name__ == "__main__":

    HOST = "0.0.0.0"
    PORT = 5000
    application.run(host=HOST, port=PORT)
