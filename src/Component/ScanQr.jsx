 

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { markAttendance } from "@/redux/userSlice"; // Adjust import as needed
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ScanQr = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let scanner;

    if (isScannerActive) {
      scanner = new Html5QrcodeScanner("reader", {
        qrbox: { width: 250, height: 250 },
        fps: 10,
        videoConstraints: { facingMode: "environment" },
      });

      scanner.render(
        (result) => {
          validateAndStoreResult(result);
          scanner.clear();
          setIsScannerActive(false);
        },
        (error) => {
          console.warn("Scan error:", error);
          setErrorMessage("Scanning failed. Please try again.");
          setTimeout(() => setErrorMessage(""), 3000); // Auto-clear error
        }
      );
    }

    return () => {
      if (scanner) scanner.clear();
    };
  }, [isScannerActive]);

  const validateAndStoreResult = (result) => {
    const match = result.trim().match(/"date":\s*"(\d{4}-\d{2}-\d{2})"/);
    if (!match) {
      setErrorMessage("Invalid QR: No date found.");
      setScanResult(null);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const scannedDate = match[1];
    const today = new Date().toISOString().split("T")[0];

    if (scannedDate !== today) {
      setErrorMessage("Invalid QR: Date does not match today's date.");
      setScanResult(null);
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      setScanResult(scannedDate);
      setErrorMessage("");
      dispatch(markAttendance(scannedDate));
    }
  };

  return (
  <div className="flex flex-col items-center max-w-sm p-4 mx-auto space-y-4 text-white border border-blue-500 shadow-lg sm:max-w-md sm:p-6 sm:space-y-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
    <h2 className="text-xl font-bold text-blue-400 sm:text-2xl">QR Code Scanner</h2>

    <Button
      onClick={() => setIsScannerActive((prev) => !prev)}
      className="px-4 py-2 text-base font-semibold transition-all rounded-md shadow-md sm:px-6 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 hover:shadow-xl"
    >
      {isScannerActive ? (
        <>
          <Loader2 className="inline-block w-5 h-5 mr-2 animate-spin" /> Stop Scanner
        </>
      ) : (
        "Start Scanner"
      )}
    </Button>

    {/* {errorMessage && (
      <p className="px-3 py-2 text-sm font-semibold text-red-500 bg-red-200 border border-red-500 rounded-md shadow-md sm:px-4 sm:text-base animate-fadeIn">
        {errorMessage}
      </p>
    )} */}

    {scanResult && (
      <p className="px-3 py-2 text-sm font-semibold text-green-500 bg-green-200 border border-green-500 rounded-md shadow-md sm:px-4 sm:text-base animate-fadeIn">
        ✅ Attendance Marked: {scanResult}
      </p>
    )}

    <div
      id="reader"
      className="flex items-center justify-center w-full h-48 text-gray-400 bg-gray-700 border-4 border-gray-500 border-dashed rounded-lg shadow-md sm:w-64 sm:h-64"
    >
      {isScannerActive ? (
        <span className="text-base font-semibold sm:text-lg animate-pulse">Scanning...</span>
      ) : (
        <span className="text-base sm:text-lg">QR Scanner Inactive</span>
      )}
    </div>
  </div>
);
};

export default ScanQr;