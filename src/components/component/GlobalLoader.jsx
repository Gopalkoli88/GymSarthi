import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const loadingCount = useSelector((state) => state.loading.loadingCount);

  if (loadingCount === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/30 backdrop-blur-md space-y-6">
      {/* Elegant Double Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-[6px] border-blue-500 opacity-30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-lg font-semibold text-white animate-pulse tracking-wide">
        Please wait...
      </p>
    </div>
  );
};

export default GlobalLoader;
