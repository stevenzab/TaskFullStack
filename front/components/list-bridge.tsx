import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

/**
 * ListBridge Component
 *
 * @remarks
 * React component to display a list of bridges. 
 * Fetches bridge data from an API and displays each bridge's details.
 *
 * @component
 * @returns {JSX.Element} Get all the bridge.
 * @example
 * ```tsx
 * import ListBridge from '@/components/ListBridge';
 *
 * const MyBridgeListPage = () => {
 *   return <ListBridge />;
 * };
 * ```
 */

interface Bridge {
  id: number;
  name: string;
  location: string;
  inspection_date: string;
  status: string;
  traffic_load: number;
}

export default function ListBridge() {

	const [bridges, setBridges] = useState<Bridge[]>([]);

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
        <>
 					<ul className="space-y-4">
						{bridges.map((bridge) => (
							<li key={bridge.id} className="border p-4 rounded-lg bg-gray-50">
								<Link href={`/update-bridge/${bridge.id}`}>
								<div className='flex flex-col'>
										<div className="text-xl font-semibold text-black">
											{bridge.name}
										</div>
										<div className={`mt-2 text-sm ${bridge.status === 'Bien' ? 'text-green-500' : bridge.status === 'Moyen' ? 'text-yellow-500' : 'text-red-500'}`}>
											Status: {bridge.status}
										</div>
										<div className="mt-1 text-gray-700">
											Inspection Date: {new Date(bridge.inspection_date).toLocaleDateString()}
										</div>
										<div className="mt-1 text-gray-700">
											Traffic Load: {bridge.traffic_load}
										</div>
										<div className="mt-1 text-gray-700">
											Location:  {bridge.location}
										</div>
								</div>
								</Link>
							</li>
						))}
      		</ul>
        </>
    )
}