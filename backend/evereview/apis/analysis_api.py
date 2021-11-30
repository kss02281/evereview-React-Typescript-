from flask_restx import Namespace, Resource, reqparse, inputs

from evereview.services.analysis_service import Analysis
from evereview.services.cluster_service import Cluster, Code

analysis_namespace = Namespace("analysis", description="ToDo")


@analysis_namespace.route("/video")
class AnalysisByVideo(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "video_list",
        type=str,
        action="split",
        location="form",
        help="video_id 리스트: video_id를 콤마(,)로 구분해 하나의 문자열로 구성해주세요",
    )

    @analysis_namespace.expect(parser)
    def post(self):
        return {"result": "analysis by video"}


@analysis_namespace.route("/date")
class AnalysisByDate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "start_date",
        type=inputs.date,
        location="form",
        help="시작 날짜: YYYY-mm-dd 형식의 문자열",
    )
    parser.add_argument(
        "end_date", type=inputs.date, location="form", help="끝 날짜: YYYY-mm-dd 형식의 문자열"
    )

    @analysis_namespace.expect(parser)
    def post(self):
        return {"result": "analysis by date"}
