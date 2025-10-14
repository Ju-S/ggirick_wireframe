import React, { useState, useRef } from "react";

export default function FileUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setFiles([]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);
  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
      >
        파일 업로드
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              파일 업로드
            </h2>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <p className="text-gray-500">
                {dragOver
                  ? "여기에 파일을 놓으세요"
                  : "클릭하거나 파일을 드래그하여 업로드"}
              </p>
            </div>

            {files.length > 0 && (
              <ul className="mt-4 max-h-40 overflow-y-auto text-sm text-gray-700 border-t pt-2">
                {files.map((file, idx) => (
                  <li key={idx} className="py-1 truncate">
                    📄 {file.name}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert(`${files.length}개의 파일 업로드!`);
                  handleClose();
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
