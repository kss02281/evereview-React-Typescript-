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

const data = [
    {
      id: 1,
      date: "11/23",
      name: "소리가 너무 커요",
      너무재밌어요: 251,
      화질구려요: 125,
      다음영상기대돼요: 62,
      box: 10
    },
    {
      id: 2,
      date: "11/24",
      name: "자막 틀렸어요",
      너무재밌어요: 512,
      화질구려요: 213,
      다음영상기대돼요: 632,
      box: 10
    },
    {
      id: 3,
      date: "11/25",
      name: "진짜 맛있어 보이네요",
      너무재밌어요: 123,
      화질구려요: 251,
      다음영상기대돼요: 245,
      box: 10
    },
    {
      id: 4,
      date: "11/26",
      name: "먹방 잘 찍으시네요",
      너무재밌어요: 349,
      화질구려요: 243,
      다음영상기대돼요: 243,
      box: 10
    },
    {
      id: 5,
      date: "11/27",
      name: "치킨먹어주세요",
      너무재밌어요: 52,
      화질구려요: 141,
      다음영상기대돼요: 632,
      box: 10
    },
    {
      id: 6,
      date: "11/28",
      name: "자세한 설명 굿",
      너무재밌어요: 241,
      화질구려요: 123,
      다음영상기대돼요: 252,
      box: 10
    },
    {
      id: 7,
      date: "11/29",
      name: "구독 누르고 갑니다",
      너무재밌어요: 251,
      화질구려요: 521,
      다음영상기대돼요: 222,
      box: 10
    },
    {
      id: 8,
      date: "11/30",
      name: "진짜 웃기다",
      너무재밌어요: 125,
      화질구려요: 11,
      다음영상기대돼요: 626,
      box: 10
    },
    {
      id: 9,
      date: "12/01",
      name: "화질 너무 구려요",
      너무재밌어요: 311,
      화질구려요: 6,
      다음영상기대돼요: 424,
      box: 10
    },
    {
      id: 10,
      date: "12/02",
      name: "음질이 너무 안좋아요",
      너무재밌어요: 422,
      화질구려요: 4,
      다음영상기대돼요: 571,
      box: 10
    }
  ];
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
  
function PosLineChart() {
  const dispatch = useDispatch();

  const [analysisData, setAnalysisData] = useState([]);
  const isAnalysis = useSelector(nowAnalysis)?.dateAnalysisArray?.clusters;

  const dataArray = [];
  const object = {};
  function sortAnalysis() {
    console.log(isAnalysis);
    if (isAnalysis != undefined) {
      dispatch(actions.setLoading(false));
      for (let i = 15; i < 20; i++) {
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
      dispatch(actions.setDatePosFive(dataArray));
    } else {
    }
  }

  useEffect(() => {
    sortAnalysis();
  }, [isAnalysis]);
    return (
        <ResponsiveContainer width="90%" height="90%">
        <LineChart data={analysisData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="published_at" interval={0} angle={-25} dx={0} dy={10} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="댓글수"
            type="monotone"
            fill="#8884d8"
          />
          <Line
            dataKey="좋아요수"
            type="monotone"
            fill="#b4b0ff"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  export default PosLineChart