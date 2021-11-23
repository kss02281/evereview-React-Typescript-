import os

JSON_AS_ASCII = False
SQLALCHEMY_TRACK_MODIFICATIONS = False

DB_HOST = ""
USER = ""
PASSWORD = ""
DB_NAME = "evereview"
SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{USER}:{PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"
)
SECRET_KEY = "dev"

if os.environ.get("FLASK_ENV") == "production":
    DB_HOST = os.environ.get("DB_HOST")
    USER = os.environ.get("DB_USER")
    PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{USER}:{PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"
    )
    SECRET_KEY = os.environ.get("SECRET_KEY")
