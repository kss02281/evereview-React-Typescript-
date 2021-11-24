import requests
import jwt

CLIENT_ID = "437704144690-7heveppoq437luskbpavuf89rairq4ip.apps.googleusercontent.com"
CLIENT_SECRET = "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"
SCOPE = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube",
]
API_KEY = "AIzaSyD4u2jxa6T1zSetBsTWB548DKB6B7qanT0"


def authorization(code):
    data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": "postmessage",
        "grant_type": "authorization_code",
    }

    res = requests.post("https://oauth2.googleapis.com/token", data=data)
    oauth_info = res.json()

    id_token = oauth_info.get("id_token")
    decoded_id_token = jwt.decode(id_token, options={"verify_signature": False})

    oauth_token = oauth_info.get("access_token")
    user_email = decoded_id_token.get("email")
    user_name = decoded_id_token.get("name")
    user_img = decoded_id_token.get("picture")

    return oauth_token, user_email, user_name, user_img
