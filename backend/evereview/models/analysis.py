from evereview.db_connect import db


class Analysis(db.Model):

    __tablename__ = "analysis"

    id = db.Column(db.String(128), primary_key=True, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    analysis_at = db.Column(db.DateTime(), nullable=False)
