import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cross from '../assets/cross.svg'
import Image from 'next/image';
import BridgeForm from './bridge-form-update';

interface RouterQuery {
  id: number
}

export default function BridgeDetail() {
  const router = useRouter();
  const { id } = router.query as unknown as RouterQuery;

	console.log(id);

  const [errors, setErrors] = useState({});

	const handleDelete = async() => {
		try {
      const response = await fetch(`http://127.0.0.1:8000/bridge/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<div className='flex justify-between mx-auto'>
					<h1 className="text-2xl font-bold mb-6 text-center text-black">
						Modifier le pont
					</h1>
					<div>
						<button className='bg-red-500 rounded mx-auto' onClick={() => {handleDelete()}}>
							<Image
								src={Cross}
								alt="cross"
							/>
						</button>
					</div>
				</div>
				<BridgeForm id={id}/>
      </div>
    </div>
  );
}
