from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from evereview import config
from evereview.db_connect import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app, supports_credentials=True)

    db.init_app(app)
    Migrate().init_app(app, db)

    @app.route("/")
    def landing():
        return "hello evereview"

    return app


application = create_app()

if __name__ == "__main__":

    HOST = "0.0.0.0"
    PORT = 5000
    application.run(host=HOST, port=PORT)
