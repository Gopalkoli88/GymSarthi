import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import AdminSidePanel from "@/Component/AdminSidePanel";

const QRCodeGenerator = () => {
  const [qrData, setQrData] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  // Function to generate QR Code with current date
  const handleGenerateQRCode = async () => {
    const currentDate = new Date();
    const localDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    ); // Adjust for local timezone
    const formattedDate = localDate.toISOString().split("T")[0]; // Get the correct local date in YYYY-MM-DD format
    const qrContent = `"date": "${formattedDate}"`; // QR content with the correct date

    setQrData(qrContent);

    try {
      const qrUrl = await QRCode.toDataURL(qrContent); // Generate QR code image URL
      setQrImageUrl(qrUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  // Use useEffect to automatically update QR code every day
  useEffect(() => {
    // Generate QR code immediately when the component loads
    handleGenerateQRCode();

    // Set interval to update the QR code daily at midnight
    const interval = setInterval(() => {
      handleGenerateQRCode(); // Regenerate the QR code with the new date
    }, 24 * 60 * 60 * 1000); // Update every 24 hours

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Toggle visibility of QR code and download button
  const handleToggleQR = () => {
    setShowQR(!showQR); // Toggle visibility
  };

  // Download the QR Code
  const downloadQRCode = () => {
    if (qrImageUrl) {
      const link = document.createElement("a");
      link.href = qrImageUrl;
      link.download = "qr-code.jpeg";
      link.click();
    }
  };

  // Print the QR Code
  const printQRCode = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print QR Code</title></head><body style="text-align: center;">`
    );
    printWindow.document.write(`<h2>QR Code</h2>`);
    printWindow.document.write(
      `<img src="${qrImageUrl}" alt="QR Code" style="width: 600px; height: 600px;" />`
    );
    printWindow.document.write(`</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <AdminSidePanel>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 mt-[-200px]">
        {/* Heading */}
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Scan QR for Attendance
        </h1>
  
        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-8 text-white rounded-lg shadow-lg w-96 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          {/* QR Code Image */}
          <img
            src={qrImageUrl}
            alt="QR Code"
            className="w-48 h-48 rounded-md shadow-md"
          />
  
          {/* Buttons for Download & Print */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={downloadQRCode}
              className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Download QR
            </button>
  
            <button
              onClick={printQRCode}
              className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-green-500 rounded-md hover:bg-green-600"
            >
              Print QR
            </button>
          </div>
        </div>
      </div>
    </AdminSidePanel>
  );
}
  export default QRCodeGenerator;
  