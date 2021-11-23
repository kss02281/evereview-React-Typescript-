from evereview.db_connect import db


class Analysis(db.Model):

    __tablename__ = "analysis"

    id = db.Column(db.String(128), primary_key=True, nullable=False)
    comment_id = db.Column(
        db.String(128),
        db.ForeignKey("comment.id", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    cluster_id = db.Column(db.String(128), nullable=False)
