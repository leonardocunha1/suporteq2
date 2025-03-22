import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DownloadBaseFile } from "./download-file-base";
import { UploadArea } from "./upload-area";
import { FilePreview } from "./file-preview";
import { UploadControls } from "./upload-controls";

export function CancelamentoMassa() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro no upload");

      alert("Upload realizado com sucesso!");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
      >
        <Card className="p-6 space-y-4 shadow-lg border border-gray-200 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatePresence mode="wait">
              {!file ? (
                <UploadArea
                  onFileSelect={setFile}
                  fileInputRef={fileInputRef}
                />
              ) : (
                <FilePreview file={file} onRemove={() => setFile(null)} />
              )}
            </AnimatePresence>

            <DownloadBaseFile />

            <AnimatePresence>
              <UploadControls
                file={file}
                isUploading={isUploading}
                onSelect={() => fileInputRef.current?.click()}
                onUpload={handleUpload}
              />
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
