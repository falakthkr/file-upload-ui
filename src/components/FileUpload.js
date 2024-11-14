"use client";

import {
  CheckCircle,
  CloudUpload,
  Error,
  UploadFile,
} from "@mui/icons-material";
import { useState, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";

const FileUpload = () => {
  // States
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [stage, setStage] = useState("default");
  const [showAlert, setShowAlert] = useState(false);

  // Refs
  const inputRef = useRef(null);

  // Functions
  const handleFileUpload = (e) => {
    let currentFileData = {
      filename: e.target.files[0].name,
      status: 0,
    };
    setStage("uploading");
    e.preventDefault();
    setTimeout(() => {
      setStage("success"); // using setTimeout to showcase loader functionality
      setFilesData((prevState) => [
        ...prevState,
        { ...currentFileData, status: 1 },
      ]);
    }, 5000);
    setFiles((prevState) => [...prevState, e.target.files[0]]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  // find more efficient alt.
  const getStatus = () => {
    switch (stage) {
      case "uploading":
        return "Running";
      case "success":
        return "Done";
      case "failed":
        return "Failed";
      case "default":
        return "Running";
    }
  };

  // find more efficient alt.
  const getCurrentFiles = () => {
    switch (stage) {
      case "uploading":
        return files.length - 1;
      case "success":
        return files.length;
      case "failed":
        return files.length - 1;
      case "default":
        return files.length - 1;
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  // render functions

  // find more efficient alt.
  const renderStages = () => {
    switch (stage) {
      case "uploading":
        return (
          <div className="outline-gray-300 text-gray-900 rounded-lg outline p-10 text-center flex flex-col items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-blue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="blue"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600 font-semibold">
              Uploading {files.length > 1 ? "Files" : "File"}
            </p>
            <span
              className="font-semibold cursor-pointer py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
              onClick={() => {
                setStage("default");
                setFiles([]);
              }}
            >
              Cancel
            </span>
          </div>
        );
      case "success":
        return (
          <div className="outline-emerald-700 text-gray-900 rounded-lg outline p-5 text-center flex flex-col items-center justify-center">
            <CheckCircle className="text-emerald-700 mb-2" />
            <p className="font-semibold">Upload Complete</p>
            <p className="text-sm text-gray-500 mb-2">{files[0].name}</p>
            <div className="flex">
              <span
                className="font-semibold cursor-pointer mr-5 py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(filesData));
                  setShowAlert(true);
                }}
              >
                View Details
              </span>
              <span
                className="font-semibold cursor-pointer py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
                onClick={() => setStage("default")}
              >
                New Upload
              </span>
            </div>
          </div>
        );
      case "failed":
        return (
          <div className="outline-red-600 text-gray-900 rounded-lg outline p-5 text-center flex flex-col items-center justify-center">
            <Error className="text-red-600 mb-2" />
            <p className="font-semibold">Upload Failed</p>
            <p className="text-sm text-gray-500 mb-2">
              File type not compatible
            </p>
            <div className="flex">
              <span
                className="font-semibold cursor-pointer py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
                onClick={() => setStage("default")}
              >
                Reupload
              </span>
            </div>
          </div>
        );
      case "default":
        return (
          <form
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={`cursor-pointer ${
              dragActive ? "outline-blue-300" : "outline-gray-300"
            } text-gray-900 rounded-lg outline-dashed p-10 text-center flex flex-col items-center justify-center`}
          >
            <input
              placeholder="inputFile"
              className="hidden"
              type="file"
              onChange={handleFileUpload}
              ref={inputRef}
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />
            <CloudUpload />
            <p className="text-gray-600 font-semibold">
              Drop files here to upload
            </p>
            <span
              className="font-semibold cursor-pointer py-2 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
              onClick={openFileExplorer}
            >
              Browse files
            </span>
          </form>
        );
    }
  };

  const renderAlert = () => {
    return (
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        message="Data copied to your clipboard"
      />
    );
  };

  return (
    <div className="flex item-center justify-center">
      <div className="p-4 flex flex-col w-1/3 justify-center h-screen">
        <div className="flex">
          <UploadFile />
          <h2 className="text-lg font-bold">Sample File Name</h2>
        </div>
        <p className="text-gray-500 text-sm mb-1">
          {files.length > 0
            ? `${getStatus()} • ${getCurrentFiles()}/${files.length}`
            : "No file uploaded"}
        </p>
        <div className={`${dragActive ? "bg-blue-100" : "bg-gray-100"}`}>
          {renderStages()}
        </div>
      </div>
      {renderAlert()}
    </div>
  );
};

export default FileUpload;
