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
					// {mode: 'no-cors'})
				console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBridges(data.bridge); // Assuming your JSON response has a 'bridge' key containing the list of bridges
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchBridges();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Bridges List</h1>
      <ul>
        {bridges.map(bridge => (
          <li key={bridge.id}>
            <strong>{bridge.name}</strong> - {bridge.status}<br />
            Inspection Date: {bridge.inspection_date}<br />
            Traffic Load: {bridge.traffic_load}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BridgeList;
