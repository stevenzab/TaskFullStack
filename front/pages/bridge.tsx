// pages/BridgeList.js

import { useEffect, useState } from 'react';

const BridgeList = () => {
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    const fetchBridges = async () => {
      try {
				const response = await fetch('http://127.0.0.1:8000/bridge', {
					headers: {
						'Content-Type': 'application/json'
					},	
				})
				console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBridges(data.bridge);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBridges();
  }, []);

  return (
		<div className="bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
					Bridges List
				</h1>
        <ul className="space-y-4">
          {bridges.map((bridge) => (
            <li key={bridge.id} className="border p-4 rounded-lg bg-gray-50">
              <div className="text-xl font-semibold text-black">{bridge.name}</div>
              <div className={`mt-2 text-sm ${bridge.status === 'Good' ? 'text-green-500' : bridge.status === 'Fair' ? 'text-yellow-500' : 'text-red-500'}`}>
                Status: {bridge.status}
              </div>
              <div className="mt-1 text-gray-700">
                Inspection Date: {new Date(bridge.inspection_date).toLocaleDateString()}
              </div>
              <div className="mt-1 text-gray-700">
                Traffic Load: {bridge.traffic_load}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BridgeList;
