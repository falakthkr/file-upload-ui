"use client";
import FilesTable from "@/components/FilesTable";
import { useRouter } from "next/navigation";
import { useFiles } from "@/context/FilesContext";
import { UploadFileOutlined } from "@mui/icons-material";

export default function Home() {
  // hooks
  const { files } = useFiles();
  const router = useRouter();

  // helper functions
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
            className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
          >
            Upload File
          </button>
        </div>
      </div>
      <FilesTable files={files} />
    </div>
  );
}
