from evereview.models.user import db, User


def get_user_by_id(user_id):
    result = User.query.filter_by(id=user_id).one_or_none()
    return result


def get_user_by_email(email):
    result = User.query.filter_by(email=email).one_or_none()
    return result


def insert_user(email, name, nickname, upload_term, contents_category, img_url):
    try:
        new_user = User(
            email=email,
            name=name,
            nickname=nickname,
            upload_term=upload_term,
            contents_category=contents_category,
            img_url=img_url,
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except Exception:
        db.session.rollback()
        raise


def update_user(user_id, name, img_url, nickname, upload_term, contents_category):
    try:
        user = User.query.filter_by(id=user_id).one_or_none()

        if user is None:
            return user

        user.name = name
        user.img_url = img_url
        user.nickname = nickname
        user.upload_term = upload_term
        user.contents_category = contents_category

        db.session.commit()
        return user
    except Exception:
        db.session.rollback()
        raise


def update_token(user_id, oauth_token, access_token, refresh_token):
    try:
        user = User.query.filter_by(id=user_id).one_or_none()

        if user is None:
            return user

        user.oauth_token = oauth_token
        user.access_token = access_token
        user.refresh_token = refresh_token

        db.session.commit()
        return user
    except Exception:
        db.session.rollback()
        raise
