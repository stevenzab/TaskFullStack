import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface BridgeFormProps {
    id: number;
  }

const BridgeForm = ({ id }: BridgeFormProps) => {

    const router = useRouter();

    const [errors, setErrors] = useState({});


    const [bridge, setBridge] = useState({
        name: '',
        location: '',
        inspection_date: '',
        status: '',
        traffic_load: '',
      });

    const handleChange = (e) => {
        setBridge({
          ...bridge,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://127.0.0.1:8000/bridge/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bridge),
          });
    
          if (response.status === 200) {
            router.push('/');
          } else if (response.status === 400) {
            const errorData = await response.json();
            setErrors(errorData);
          }
        } catch (error) {
          console.error('Error updating bridge:', error);
        }
      };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={bridge.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={bridge.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Inspection Date</label>
        <input
          type="date"
          name="inspection_date"
          value={bridge.inspection_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <input
          type="text"
          name="status"
          value={bridge.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Traffic Load</label>
        <input
          type="number"
          name="traffic_load"
          value={bridge.traffic_load}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Update Bridge
      </button>
    </form>
  );
};

export default BridgeForm;
