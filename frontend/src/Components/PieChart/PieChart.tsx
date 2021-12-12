import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        Rank{payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <text id="sideLabel" x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} textAnchor={textAnchor} fill="#333">{`댓글 + 좋아요 수`}</text>
      <text id="sideLabel" x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {` ${value}(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface pieChartData {
  rank: number;
  cluster_id: string;
  total_value: number;
  total_like: number;
  total_count: number;
  top_comment_text: string;
}
type PieChartDataProps = {
  data: pieChartData[];
};

const PieChartC: React.FC<PieChartDataProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = data.map((item) => {
    return {
      name: item.rank,
      value: item.total_value,
    };
  });
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const COLORS = [
    "rgb(133, 125, 181)",
    "rgba(133, 125, 181, 0.90)",
    "rgba(133, 125, 181, 0.80)",
    "rgba(133, 125, 181, 0.70)",
    "rgba(133, 125, 181, 0.60)",
    "rgba(133, 125, 181, 0.50)",
    "rgba(133, 125, 181, 0.40)",
    "rgba(133, 125, 181, 0.30)",
    "rgba(133, 125, 181, 0.20)",
    "rgba(133, 125, 181, 0.10)",
  ];
  return (
    <ResponsiveContainer width="99%" height="99%">
      <PieChart className="pieMargin">
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={Data}
          innerRadius="40%"
          outerRadius="70%"
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {Data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartC;
