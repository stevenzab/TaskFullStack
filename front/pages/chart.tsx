import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface BridgeStatus {
    status: string;
    percentage: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BridgeStatusPieChart = () => {
    const [data, setData] = useState<BridgeStatus[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/bridge/api/bridge-status-distribution/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setData(data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='bg-white flex flex-col items-center justify-center'>
					<h1 className='text-black p-5'>
						Pie CHART
					</h1>
					<div className=''>
						<PieChart width={400} height={400}>
								<Pie
										data={data}
										cx={200}
										cy={200}
										labelLine={false}
										label={({ status, percentage }) => `${status}: ${percentage.toFixed(1)}%`}
										outerRadius={150}
										fill="#8884d8"
										dataKey="percentage"
										nameKey="status"
								>
										{data.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
								</Pie>
								<Tooltip />
								<Legend />
						</PieChart>
					</div>
        </div>
    );
};

export default BridgeStatusPieChart;
