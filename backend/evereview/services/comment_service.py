from evereview.models.comment import db, Comment


def get_comments(cluster_id):
    comments = Comment.query.filter_by(cluster_id=cluster_id).all()

    result = []
    for comment in comments:
        result.append(comment.to_dict())
    return result


def get_comment(comment_id):
    comment = Comment.query.filter_by(comment_id=comment_id).one_or_none()
    return comment


def insert_comment(**kwargs):
    try:
        new_comment = Comment(
            id=kwargs.get("comment_id"),
            cluster_id=kwargs.get("cluster_id"),
            video_id=kwargs.get("video_id"),
            author=kwargs.get("author"),
            author_img=kwargs.get("author_img"),
            text_display=kwargs.get("text_display"),
            text_original=kwargs.get("text_original"),
            like_count=kwargs.get("like_count"),
            published_at=kwargs.get("published_at"),
        )
        db.session.add(new_comment)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        raise error
