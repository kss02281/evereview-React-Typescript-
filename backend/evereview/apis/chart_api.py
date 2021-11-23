from flask_restx import Namespace, Resource

chart_namespace = Namespace("chart")


@chart_namespace.route("/stack/<string:type>/<string:analysis_id>")
@chart_namespace.doc(params={"type": "그래프 종류: all, positive, negative"})
@chart_namespace.doc(params={"ysis_id": "analysis 요청으로 얻은 anaysis_id"})
class ChartStack(Resource):
    def get(self, type, analysis_id):
        return {"result": "stack chart get method"}


@chart_namespace.route("/line/<string:type>/<string:analysis_id>")
@chart_namespace.doc(params={"type": "그래프 종류: all, positive, negative, content"})
@chart_namespace.doc(params={"analysis_id": "analysis 요청으로 얻은 anaysis_id"})
class ChartLine(Resource):
    def get(self, type, analysis_id):
        return {"result": "line chart get method"}


@chart_namespace.route("/pi/<string:analysis_id>")
@chart_namespace.doc(params={"analysis_id": "analysis 요청으로 얻은 anaysis_id"})
class ChartPi(Resource):
    def get(self, analysis_id):
        return {"result": "pi chart get method"}


@chart_namespace.route("/radar/<string:analysis_id>")
@chart_namespace.doc(params={"analysis_id": "analysis 요청으로 얻은 anaysis_id"})
class ChartRadar(Resource):
    def get(self, analysis_id):
        return {"result": "radar chart get method"}
