"use client";

import { CheckCircle, CloudUpload, UploadFile } from "@mui/icons-material";
import { useState, useRef } from "react";

const FileUpload = () => {
  // States
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [stage, setStage] = useState("default");

  // Refs
  const inputRef = useRef(null);

  // Functions
  const handleFileUpload = (e) => {
    setStage("uploading");
    e.preventDefault();
    setTimeout(() => {
      setStage("success"); // using setTimeout to showcase loader functionality
    }, 5000);
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
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

  // render functions
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
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="blue"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600 font-semibold">
              Uploading {files.length > 1 ? "Files" : "File"}
            </p>
            <span
              className="font-semibold cursor-pointer py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
              // onClick={handleCancelUpload}
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
                // onClick={handleCancelUpload}
              >
                View Details
              </span>
              <span
                className="font-semibold cursor-pointer py-1 px-3 mt-1 rounded-full cursor-pointer bg-gray-200"
                // onClick={handleCancelUpload}
              >
                New Upload
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
              // accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
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

  return (
    <div className="flex item-center justify-center">
      <div className="p-4 flex flex-col w-1/3 justify-center h-screen">
        <div className="flex">
          <UploadFile />
          <h2 className="text-lg font-bold">Sample File Name</h2>
        </div>
        <p className="text-gray-500 text-sm mb-1">No file uploaded</p>
        <div className={`${dragActive ? "bg-blue-100" : "bg-gray-100"}`}>
          {renderStages()}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
