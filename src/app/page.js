"use client";
import FilesTable from "@/components/FilesTable";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([
    { filename: "file1.csv", status: 0 },
    { filename: "file2.csv", status: 1 },
    { filename: "file3.csv", status: -1 },
  ]);
  const router = useRouter();
  const handleClick = () => {
    router.push("/file-upload/");
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:ml-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            onClick={handleClick}
            type="submit"
            className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload File
          </button>
        </div>
      </div>
      <FilesTable files={files} />
    </div>
  );
}
