from evereview.db_connect import db


class Video(db.Model):

    __tablename__ = "video"

    id = db.Column(db.String(128), primary_key=True, nullable=False)
    channel_id = db.Column(
        db.String(128),
        db.ForeignKey("channel.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    published_at = db.Column(db.DateTime(), nullable=False)
    thumbnail_url = db.Column(db.String(1024), nullable=False)
    category_id = db.Column(db.String(128), nullable=False)
    view_count = db.Column(db.Integer, nullable=False)
    like_count = db.Column(db.Integer, nullable=False)
    comment_count = db.Column(db.Integer, nullable=False)
