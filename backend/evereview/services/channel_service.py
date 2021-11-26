from evereview.models.channel import db, Channel


def get_channel(channel_id):
    channel = Channel.query.filter_by(id=channel_id).one_or_none()

    return channel


def get_channels(user_id):
    result = []
    channels = Channel.query.filter_by(user_id=user_id).all()

    for channel in channels:
        item = {
            "id": channel.id,
            "title": channel.title,
            "comment_count": channel.comment_count,
            "video_count": channel.video_count,
            "channel_url": channel.channel_url,
            "img_url": channel.img_url,
        }
        result.append(item)

    return result


def insert_channel(
    channel_id, user_id, title, comment_count, video_count, channel_url, img_url
):
    try:
        new_channel = Channel(
            channel_id=channel_id,
            user_id=user_id,
            title=title,
            comment_count=comment_count,
            video_count=video_count,
            channel_url=channel_url,
            img_url=img_url,
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel
    except Exception:
        db.session.rollback()
        raise


def update_channel(channel_id, title, comment_count, video_count, img_url):
    try:
        channel = Channel.query.filter_by(id=channel_id).one_or_none()
        if channel is None:
            return channel

        channel.title = title
        channel.comment_count = comment_count
        channel.video_count = video_count
        channel.url = img_url

        db.session.commit()
        return channel
    except Exception:
        db.session.rollback()
        raise


def delete_channel(channel_id):
    try:
        channel = Channel.query.filter_by(id=channel_id).one_or_none()

        if channel is None:
            return channel

        db.session.delete(channel)
        db.session.commit()
        return channel
    except Exception:
        db.session.rollback()
        raise
