import CreateFormBridge from "@/components/create-form-bridge";

/**
 * CreateBridge component is a component that renders the CreateFormBridge component.
 * 
 * This component is used to display and create a form in the application.
 * 
 * @returns {JSX.Element} The rendered `CreateFormBridge` component wrapped in a React Fragment.
 */

export default function CreateBridge() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        Create Bridge
      </h1>
      <CreateFormBridge/>
    </div>
  </div>
  );
}
