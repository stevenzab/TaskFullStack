
import ListBridge from '@/components/list-bridge';

/**
 * BridgeList component is a component that renders the ListBridge component.
 * 
 * This component is used to display a list of bridge.
 * 
 * @returns {JSX.Element} The rendered `ListBridge` component wrapped in a React Fragment.
 */

const BridgeList = () => {
  
  return (
		<div className="bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
					Bridges List
				</h1>
        <ListBridge/>
      </div>
    </div>
  );
};

export default BridgeList;
