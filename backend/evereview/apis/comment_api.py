from flask_restx import Namespace, Resource

comment_namespace = Namespace("comment")


@comment_namespace.route("/<string:analysis_id>/<string:cluster_id>")
@comment_namespace.doc(params={"analysis_id": "analysis 요청으로 얻은 analysis_id"})
@comment_namespace.doc(params={"cluster_id": "analysis 요청으로 얻은 cluster_id"})
class Comment(Resource):
    def get(self, analysis_id, cluster_id):
        return {"result": "comment get method"}
