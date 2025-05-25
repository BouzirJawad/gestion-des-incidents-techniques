import { useNavigate } from "react-router-dom";

const OpsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F4F4F5] text-center p-4">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-6">OOPS!</h1>
      <p className="text-xl text-gray-600 mb-4">
        Something went wrong or this page doesn’t exist.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-black px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Go Back
        </button>
        
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-[#005fa3] transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default OpsPage;
