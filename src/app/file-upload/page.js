import FileUpload from "@/components/FileUpload";

const FileUploadPage = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <FileUpload />
      </div>
    </main>
  );
};

export default FileUploadPage;
