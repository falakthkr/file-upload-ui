"use client";

import { CloudUpload, UploadFile } from "@mui/icons-material";
import { useState, useRef } from "react";

const FileUpload = () => {
  // States
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  // Refs
  const inputRef = useRef(null);

  // Functions
  const handleFileUpload = (e) => {
    e.preventDefault();
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

  return (
    <div className="flex item-center justify-center">
      <div className="p-4 flex flex-col w-1/3 justify-center h-screen">
        <div className="flex">
          <UploadFile />
          <h2 className="text-lg font-bold">Sample File Name</h2>
        </div>
        <p className="text-gray-500 text-sm mb-1">No file uploaded</p>
        <div className="bg-gray-100">
          <form
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className="cursor-pointer outline-gray-300 text-gray-900 rounded-lg outline-dashed p-10 text-center flex flex-col items-center justify-center"
          >
            <input
              placeholder="inputFile"
              className="hidden"
              type="file"
              onChange={handleFileUpload}
              ref={inputRef}
              multiple={true}
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
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
