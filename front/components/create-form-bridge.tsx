import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

/**
 * CreateFormBridge Component
 *
 * @remarks
 * React component to fill a form to create a bridge data.
 * fill a form then create it.
 *
 * @component
 * @returns {JSX.Element} A bridge that has been created using a POST API.
 * @example
 * ```tsx
 * import CreateFormBridge from '@/components/CreateFormBridge';
 *
 * const MyBridgeDetailPage = () => {
 *   return <CreateFormBridge />;
 * };
 * ```
 */

export default function CreateFormBridge() {

	const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
	longitude: '',
    inspection_date: '',
    status: '',
    traffic_load: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/bridge/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })

      if (response.status === 200) {
        router.push('/');
        setFormData({
          name: '',
          latitude: '',
		  longitude: '',
          inspection_date: '',
          status: '',
          traffic_load: ''
        });
      }
    } catch (error) {
			if (error instanceof Error) {
				console.error('Error creating bridge:', error.message);
			} else {
				console.error('An unexpected error occurred:', error);
			}
		}
  };

    return(
        <>
					<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">latitude</label>
						<input
							type="text"
							name="latitude"
							value={formData.latitude}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">longitude</label>
						<input
							type="text"
							name="longitude"
							value={formData.longitude}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Inspection Date</label>
						<input
							type="date"
							name="inspection_date"
							value={formData.inspection_date}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Status</label>
						<input
							type="text"
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Traffic Load</label>
						<input
							type="number"
							name="traffic_load"
							value={formData.traffic_load}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg text-black"
						/>
					</div>
					<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
						Create
					</button>
				</form>
      </>
    )
}