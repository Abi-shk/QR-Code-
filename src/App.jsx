import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

const qrDataList = [
  { id: "STU0001", name: "Akhil MS", validated: false },
  { id: "STU0002", name: "Adhilswalah", validated: false },
  { id: "STU0003", name: "Addith Mathew Thomas", validated: false },
  { id: "STU0004", name: "Amal Biju", validated: false },
  { id: "STU0005", name: "Musaib Hussain", validated: false },
  { id: "STU0006", name: "ABINAV P P", validated: false },
  { id: "STU0007", name: "Gokul A.S", validated: false },
  { id: "STU0008", name: "S Mahendranadh", validated: false },
  { id: "STU0009", name: "Jyothish Sunil", validated: false },
  { id: "STU0010", name: "Haifa Kaliyadan", validated: false },
  { id: "STU0011", name: "Anoop Thomas", validated: false },
  { id: "STU0012", name: "Don", validated: false },
  { id: "STU0013", name: "Leyons Primil", validated: false },
  { id: "STU0014", name: "Adwaith C Murphy", validated: false },
  { id: "STU0015", name: "Melbin Santhosh", validated: false },
  { id: "STU0016", name: "Vidhun S", validated: false },
  { id: "STU0017", name: "Abhijith Satheesh", validated: false },
  { id: "STU0018", name: "Liya Ann Bino", validated: false },
  { id: "STU0019", name: "Geogie Tom", validated: false },
];

const App = () => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanningEnabled, setScanningEnabled] = useState(false); // Scanning state

  let qrScanner;

  // This effect starts the QR Scanner when scanning is enabled
  useEffect(() => {
    if (videoRef.current && scanningEnabled) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (scanningEnabled) {
            handleScan(result.data);
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScanner.start().catch((err) => console.error("Camera Error:", err));
    } else {
      if (qrScanner) {
        qrScanner.destroy();
      }
    }

    // Cleanup the QR scanner when component unmounts or scanning is disabled
    return () => {
      if (qrScanner) {
        qrScanner.destroy();
      }
    };
  }, [scanningEnabled]);

  const handleScan = (data) => {
    if (data) {
      const qrEntry = qrDataList.find((entry) => entry.id === data);

      if (qrEntry) {
        if (qrEntry.validated) {
          // Show an alert only if the QR code is already validated
          alert(`QR Code already validated for ${qrEntry.name}`);
        } else {
          setScanningEnabled(false); // Disable further scans while waiting for user confirmation

          // Display the native confirm dialog
          const isConfirmed = window.confirm(`Validate QR Code for ${qrEntry.name}?`);

          if (isConfirmed) {
            confirmValidation(qrEntry);
          } else {
            cancelValidation();
          }
        }
      } else {
        toast.error("QR Code not found in the database.", {
          position: "top-center",
        });
      }
    }
  };

  const confirmValidation = (qrEntry) => {
    qrEntry.validated = true;
    setScannedData(qrEntry);
    toast.success(`Validation successful for ${qrEntry.name}`, {
      position: "top-center",
    });
    setScanningEnabled(true); // Enable scanning for next QR code
  };

  const cancelValidation = () => {
    setScanningEnabled(true); // Enable scanning for next QR code
    toast.info("Scan cancelled. You can scan again.", {
      position: "top-center",
    });
  };

  const toggleScanning = () => {
    setScanningEnabled(!scanningEnabled); // Toggle scanning on/off
  };

  return (
    <>
        <Header/>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-2xl text-gray-700 mb-4 text-center sm:text-3xl md:text-4xl lg:text-5xl">
          QR Code Scanner
        </h1>
        <video
          ref={videoRef}
          className="w-full max-w-[500px] mb-6 border-2 border-gray-300 rounded-lg shadow-md"
        />
        <ToastContainer />
        <button
          onClick={toggleScanning}
          className="bg-blue-500 text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mb-6 w-full sm:max-w-xs"
        >
          {scanningEnabled ? "Stop Scanning" : "Start Scanning"}
        </button>
        {scannedData && (
          <div
          className={`bg-white p-6 rounded-lg shadow-md max-w-[400px] w-full text-center transition-all duration-300 ${
            scannedData ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {scannedData && (
            <>
              <h3 className="text-lg font-semibold mb-2">Scanned Data:</h3>
              <p className="mb-1">Name: <strong>{scannedData.name}</strong></p>
              <p>ID: <strong>{scannedData.id}</strong></p>
            </>
          )}
        </div>
        )}
      </div>
        <Footer />
    </>
  );
};

export default App;
