// I am using context as it's one data object to manage as of now, for larger data sets and bigger applications, I think redux is better.

"use client";

import React, { createContext, useState, useContext } from "react";

// Context
const FilesContext = createContext();

// Provider
export const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  // helper functions
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const newFile = {
        filename: uploadedFile.name,
        status: 0,
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const updateStatus = (filename, newStatus) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.filename === filename ? { ...file, status: newStatus } : file
      )
    );
  };

  return (
    <FilesContext.Provider value={{ files, handleFileUpload, updateStatus }}>
      {children}
    </FilesContext.Provider>
  );
};

// Custom hook
export const useFiles = () => useContext(FilesContext);
