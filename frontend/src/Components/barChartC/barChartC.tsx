import "./styles.css";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  {
    name: "소리가 너무 커요",
    댓글수: 300,
    좋아요수: 240,
    box: 10
  },
  {
    name: "자막 틀렸어요",
    댓글수: 400,
    좋아요수: 138,
    box: 10
  },
  {
    name: "진짜 맛있어 보이네요",
    댓글수: 200,
    좋아요수: 98,
    box: 10
  },
  {
    name: "먹방 잘 찍으시네요",
    댓글수: 278,
    좋아요수: 98,
    box: 10
  },
  {
    name: "치킨먹어주세요",
    댓글수: 189,
    좋아요수: 80,
    box: 10
  },
  {
    name: "자세한 설명 굿",
    댓글수: 239,
    좋아요수: 180,
    box: 10
  },
  {
    name: "구독 누르고 갑니다",
    댓글수: 349,
    좋아요수: 230,
    box: 10
  },
  {
    name: "진짜 웃기다",
    댓글수: 189,
    좋아요수: 80,
    box: 10
  },
  {
    name: "화질 너무 구려요",
    댓글수: 239,
    좋아요수: 138,
    box: 10
  },
  {
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
          style={{ border: "1px solid", backgroundColor: "#fff" }}
        >
          <p className="label">{`${label}`}</p>
          <p>
            {payload[0].name} {payload[0].value}
          </p>
          <p>
            {payload[2].name} {payload[2].value}
          </p>
        </div>
      );
    }
  
    return null;
  };
  
function BarChartC() {
    return (
      <BarChart
        width={500}
        height={330}
        data={data}
        margin={{
          top: 20,
          right: 100,
          left: 20,
          bottom: 70
        }}
      >
        <XAxis dataKey="name" interval={0} angle={30} dx={40} dy={40} />
        <Tooltip content={<CustomTooltip />} />
        <Legend align="left" verticalAlign="top" />
        <Bar
          dataKey="댓글수"
          barSize={10}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#8884d8"
        />
        <Bar
          dataKey="box"
          barSize={10}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#fff"
        />
        <Bar
          dataKey="좋아요수"
          barSize={10}
          radius={[25, 25, 25, 25]}
          stackId="a"
          fill="#00CED1"
        />
      </BarChart>
    );
  }

  export default BarChartC