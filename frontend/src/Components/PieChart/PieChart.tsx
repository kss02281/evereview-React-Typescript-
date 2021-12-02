import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "배틀그라운드", value: 600 },
  { name: "리그오브레전드", value: 500 },
  { name: "카트라이더", value: 40 },
  { name: "오버워치", value: 40 },
  { name: "리니지", value: 200 },
  { name: "서든어택", value: 120 },
  { name: "로스트아크", value: 120 },
  { name: "피파 온라인", value: 80 },
  { name: "메이플스토리", value: 150 },
  { name: "스타크래프트", value: 100 }
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 1}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`댓글 수 ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 1}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function PieChartC() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const COLORS = ["rgb(133, 125, 181)", "rgba(133, 125, 181, 0.90)", "rgba(133, 125, 181, 0.80)", "rgba(133, 125, 181, 0.70)", "rgba(133, 125, 181, 0.60)", "rgba(133, 125, 181, 0.50)", "rgba(133, 125, 181, 0.40)", "rgba(133, 125, 181, 0.30)", "rgba(133, 125, 181, 0.20)", "rgba(133, 125, 181, 0.10)"];
  return (
    <ResponsiveContainer width="99%" height="99%" >
      <PieChart className="pieMargin">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius="50%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartC;