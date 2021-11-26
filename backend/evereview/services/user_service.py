from evereview.models.user import db, User


def get_user_by_id(user_id):
    result = User.query.filter_by(id=user_id).one_or_none()
    return result


def get_user_by_email(email):
    result = User.query.filter_by(email=email).one_or_none()
    return result


def insert_user(**kwargs):
    try:
        new_user = User(
            email=kwargs.get("email"),
            name=kwargs.get("name"),
            nickname=kwargs.get("nickname"),
            upload_term=kwargs.get("upload_term"),
            contents_category=kwargs.get("contents_category"),
            img_url=kwargs.get("img_url"),
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except Exception:
        db.session.rollback()
        raise


def update_user_googleinfo(user_id, **kwargs):
    try:
        user = User.query.filter_by(id=user_id).one_or_none()

        if user is None:
            return user

        user.name = kwargs.get("name")
        user.img_url = kwargs.get("img_url")

        db.session.commit()
        return user
    except Exception:
        db.session.rollback()
        raise


def update_user(user_id, **kwargs):
    try:
        user = User.query.filter_by(id=user_id).one_or_none()

        if user is None:
            return user

        user.nickname = kwargs.get("nickname")
        user.upload_term = kwargs.get("upload_term")
        user.contents_category = kwargs.get("contents_category")

        db.session.commit()
        return user
    except Exception:
        db.session.rollback()
        raise


def update_token(user_id, **kwargs):
    try:
        user = User.query.filter_by(id=user_id).one_or_none()

        if user is None:
            return user

        user.oauth_token = kwargs.get("oauth_token")
        user.access_token = kwargs.get("access_token")
        user.refresh_token = kwargs.get("refresh_token")

        db.session.commit()
        return user
    except Exception:
        db.session.rollback()
        raise
