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


def insert_comment(
    comment_id,
    cluster_id,
    video_id,
    author,
    author_img,
    text_display,
    text_original,
    like_count,
    published_at,
):
    try:
        new_comment = Comment(
            id=comment_id,
            cluster_id=cluster_id,
            video_id=video_id,
            author=author,
            author_img=author_img,
            text_display=text_display,
            text_original=text_original,
            like_count=like_count,
            published_at=published_at,
        )
        db.session.add(new_comment)
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise
