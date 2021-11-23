from evereview.db_connect import db


class Comment(db.Model):

    __tablename__ = "comment"

    id = db.Column(db.String(128), primary_key=True, nullable=False)
    video_id = db.Column(
        db.String(128),
        db.ForeignKey("video.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    author = db.Column(db.String(128), nullable=False)
    author_img = db.Column(db.String(1024), nullable=False)
    text_display = db.Column(db.Text, nullable=False)
    text_original = db.Column(db.Text, nullable=False)
    like_count = db.Column(db.Integer, nullable=False)
    published_at = db.Column(db.Datetime, nullable=False)
