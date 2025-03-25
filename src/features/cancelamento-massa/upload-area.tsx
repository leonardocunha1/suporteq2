import { UploadCloud } from "lucide-react";
import { DragEvent, useState } from "react";
import { motion } from "framer-motion";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function UploadArea({ onFileSelect, fileInputRef }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      onFileSelect(event.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div
      key="upload-area"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 w-full text-center"
    >
      <label
        className={`flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg cursor-pointer transition h-60 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:bg-gray-100"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
        <span className="text-sm text-gray-500 font-medium">
          {isDragging ? "Solte o arquivo aqui" : "Clique ou arraste um arquivo"}
        </span>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>
    </motion.div>
  );
}
