import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    id: 1,
    name: "소리가 너무 커요",
    댓글수: 300,
    좋아요수: 240,
    box: 10
  },
  {
    id: 2,
    name: "자막 틀렸어요",
    댓글수: 400,
    좋아요수: 138,
    box: 10
  },
  {
    id: 3,
    name: "진짜 맛있어 보이네요",
    댓글수: 200,
    좋아요수: 98,
    box: 10
  },
  {
    id: 4,
    name: "먹방 잘 찍으시네요",
    댓글수: 278,
    좋아요수: 98,
    box: 10
  },
  {
    id: 5,
    name: "치킨먹어주세요",
    댓글수: 189,
    좋아요수: 80,
    box: 10
  },
  {
    id: 6,
    name: "자세한 설명 굿",
    댓글수: 239,
    좋아요수: 180,
    box: 10
  },
  {
    id: 7,
    name: "구독 누르고 갑니다",
    댓글수: 349,
    좋아요수: 230,
    box: 10
  },
  {
    id: 8,
    name: "진짜 웃기다",
    댓글수: 189,
    좋아요수: 80,
    box: 10
  },
  {
    id: 9,
    name: "화질 너무 구려요",
    댓글수: 239,
    좋아요수: 138,
    box: 10
  },
  {
    id: 10,
    name: "음질이 너무 안좋아요",
    댓글수: 349,
    좋아요수: 243,
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
          <p className="label">{data[Number(`${label}`)-1].name}</p>
          <p>
            {payload[1].name} {payload[1].value}
          </p>
          <p>
            {payload[3].name} {payload[3].value}
          </p>
        </div>
      );
    }
  
    return null;
  };
  
function NegBarChart() {
    return (
      <ResponsiveContainer width="90%" height="90%">
      <BarChart data={data} margin={{ top: -40, right: 0, left: 0, bottom: 0 }}>
      <XAxis dataKey="id" interval={0} angle={0} dx={0} dy={10} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="box"
          barSize={12}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#fff"
        />
        <Bar
          dataKey="댓글수"
          barSize={12}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#E11C1C"
        />
        <Bar
          dataKey="box"
          barSize={12}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#fff"
        />
        <Bar
          dataKey="좋아요수"
          barSize={12}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#FF6969"
        />
      </BarChart>
    </ResponsiveContainer>
    );
  }

  export default NegBarChart