import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

const qrDataList = [
  { id: "TM-ECU-00011", name: "Akhil MS", validated: false, email: "akhilms016@gmail.com" },
  { id: "TM-ECU-00012", name: "Adhilswalah", validated: false, email: "adhilswalah@gmail.com" },
  { id: "TM-ECU-00013", name: "Addith Mathew Thomas", validated: false, email: "addith2002@gmail.com" },
  { id: "TM-ECU-00014", name: "Amal Biju", validated: false, email: "Amalheaderzofficial@gmail.com" },
  { id: "TM-ECU-00015", name: "Musaib Hussain", validated: false, email: "musaibkksr@gmail.com" },
  { id: "TM-ECU-00016", name: "A J JOSE", validated: false, email: "ajvjcet@gmail.com" },
  { id: "TM-ECU-00017", name: "Muhammad sha.s", validated: false, email: "Shamuhammed9947@gmail.com" },
  { id: "TM-ECU-00018", name: "Jithin Joy", validated: false, email: "jithinjoy95@gmail.com" },
  { id: "TM-ECU-00019", name: "MANJUNATH UP", validated: false, email: "manjunathup5600@gmail.com" },
  { id: "TM-ECU-00020", name: "Adarsh C", validated: false, email: "adarshrichu143@gmail.com" },
  { id: "TM-ECU-00021", name: "Roshin Puliyakode", validated: false, email: "roshim2323@gmail.com" },
  { id: "TM-ECU-00022", name: "Arjun K", validated: false, email: "Contactmeatarjun@gmail.com" },
];

const App = () => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanningEnabled, setScanningEnabled] = useState(false);
  const [validatedList, setValidatedList] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);

  let qrScanner;

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
          alert(`QR Code already validated for ${qrEntry.name}`);
        } else {
          setScanningEnabled(false);

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

  const confirmValidation = (entry) => {
    entry.validated = true;
    setValidatedList((prevList) => [...prevList, entry]);
    setScannedData(entry);
    toast.success(`Validation successful for ${entry.name}`, {
      position: "top-center",
    });
    setScanningEnabled(true);
  };

  const cancelValidation = () => {
    setScanningEnabled(true);
    toast.info("Scan cancelled. You can scan again.", {
      position: "top-center",
    });
  };

  const toggleScanning = () => {
    setScanningEnabled(!scanningEnabled);
  };

  const searchByEmail = () => {
    const student = qrDataList.find((entry) => entry.email.toLowerCase() === searchEmail.toLowerCase());
    if (student) {
      setFoundStudent(student);
      toast.success(`Student found: ${student.name} (ID: ${student.id})`, {
        position: "top-center",
      });
    } else {
      setFoundStudent(null);
      toast.error("No student found with this email.", {
        position: "top-center",
      });
    }
  };

  const validateSearchedStudent = () => {
    if (foundStudent) {
      if (foundStudent.validated) {
        toast.info(`${foundStudent.name} is already validated.`, {
          position: "top-center",
        });
      } else {
        confirmValidation(foundStudent);
      }
    }
  };

  const downloadCSV = () => {
    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,Name,ID\n";

    // Add each student to the CSV content
    qrDataList.forEach((student) => {
      csvContent += `${student.name},${student.id}\n`;
    });

    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_list.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 md:px-16">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center sm:text-4xl md:text-5xl">
          QR Code Scanner
        </h1>
        <video
          ref={videoRef}
          className="w-full max-w-lg mb-6 border-2 border-gray-300 rounded-lg shadow-md"
        />
        <ToastContainer />
        <button
          onClick={toggleScanning}
          className="bg-blue-500 text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mb-6 w-full sm:max-w-xs"
        >
          {scanningEnabled ? "Stop Scanning" : "Start Scanning"}
        </button>
        {scannedData && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <h3 className="text-lg font-semibold mb-2">Scanned Data:</h3>
            <p className="mb-1">
              Name: <strong>{scannedData.name}</strong>
            </p>
            <p>
              ID: <strong>{scannedData.id}</strong>
            </p>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mt-6">
          <h3 className="text-lg font-semibold mb-2">Search Student by Email:</h3>
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-md mb-3"
          />
          <button
            onClick={searchByEmail}
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 w-full mb-3"
          >
            Search
          </button>
          {foundStudent && (
            <div className="mt-4">
              <p>
                Name: <strong>{foundStudent.name}</strong>
              </p>
              <p>
                ID: <strong>{foundStudent.id}</strong>
              </p>
              <button
                onClick={validateSearchedStudent}
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-3"
              >
                Add to Validated List
              </button>
            </div>
          )}
        </div>
        {validatedList.length > 0 && (
          <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-lg w-full mt-6">
            <h3 className="text-lg font-semibold mb-2">Validated List:</h3>
            <ul>
              {validatedList.map((entry) => (
                <li key={entry.id} className="mb-1">
                  <strong>{entry.name}</strong> (ID: {entry.id})
                </li>
              ))}
            </ul>
            <button
              onClick={downloadCSV}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-800 transition duration-300 mt-4 w-full sm:max-w-xs"
            >
              Download All Students List (CSV)
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
