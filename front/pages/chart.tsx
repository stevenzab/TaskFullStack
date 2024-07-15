import { Pie, PieChart, Tooltip, Cell } from "recharts";
import { useState, useEffect } from "react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBridges = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/bridge', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBridges();
  }, []);

  return (
    <div className="bg-white">
      <h1 className="text-black">Hello Chart</h1>
      <PieChart width={400} height={400} className="">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
