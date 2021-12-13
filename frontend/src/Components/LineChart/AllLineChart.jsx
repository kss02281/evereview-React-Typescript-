import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer  
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { nowAllDateTenArray, nowAnalysis, nowDateAnalysis } from "store/modules/analysis";
import { actions } from "store/modules";

  
function AllLineChart() {
  const dispatch = useDispatch();

  const [analysisData, setAnalysisData] = useState([]);
  const isAnalysis = useSelector(nowAnalysis)?.dateAnalysisArray?.clusters;

  const dataArray = [];
  const object = {};
  function sortAnalysis() {
    console.log(isAnalysis);
    if (isAnalysis != undefined) {
      dispatch(actions.setLoading(false));
      for (let i = 10; i < isAnalysis.length; i++) {
        object[i] = {
          id: i - 9,
          name: isAnalysis[i].top_comment.text_display,
          댓글수: isAnalysis[i].count,
          좋아요수: isAnalysis[i].like_count,
          box: 10,
          comment_id: isAnalysis[i].id,
          top_comment: isAnalysis[i].top_comment,
          published_at: `${new Date(isAnalysis[i].top_comment.published_at).getMonth() +1} / ` +  `${new Date(isAnalysis[i].top_comment.published_at).getDate()}`
        };
        dataArray.push(object[i]);
      }
      setAnalysisData(dataArray);
      dispatch(actions.setDateAllTen(dataArray));
    } else {
    }
  }

  useEffect(() => {
    sortAnalysis();
  }, [isAnalysis]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{ width:"120%", lineHeight: "10px", border: "0.1px solid black", borderRadius: "20px" ,backgroundColor: "#fff", textAlign: "center" }}
        >
          <p className="label">{payload[0].payload.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 15
                                ? payload[0].payload.name
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .replace(/\n/, "")
                                    .substring(0, 15) + "..."
                                : payload[0].payload.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}</p>
          <p>
            {payload[0].name} {payload[0].value}
          </p>
          <p>
            {payload[1].name} {payload[1].value}
          </p>
        </div>
      );
    }
  
    return null;
  };

    return (
        <ResponsiveContainer width="90%" height="90%">
        <LineChart data={analysisData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="published_at" interval={0} angle={-25} dx={0} dy={10} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="댓글수"
            type="monotone"
            fill="#009c5b"
          />
          <Line
            dataKey="좋아요수"
            type="monotone"
            fill="#2dda91"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  export default AllLineChart

function setAnalysisData(dataArray: any[]) {
  throw new Error("Function not implemented.");
}
