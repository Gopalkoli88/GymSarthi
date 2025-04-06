import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const loadingCount = useSelector((state) => state.loading.loadingCount);

  if (loadingCount === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-blue-600">Loading...</p>
      </div>
    </div>
   
  );
};

export default GlobalLoader;
