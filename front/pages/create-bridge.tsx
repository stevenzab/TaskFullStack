// pages/create-bridge.tsx

import { useState } from 'react';

export default function CreateBridge() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    inspection_date: '',
    status: '',
    traffic_load: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // console.log(e.target.name)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/bridge/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })

      if (response.status === 201) {
        alert('Bridge created successfully');
        setFormData({
          name: '',
          location: '',
          inspection_date: '',
          status: '',
          traffic_load: ''
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        console.error('Error creating bridge:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Create Bridge
      </h1>
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
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
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
    </div>
  </div>
  );
}
