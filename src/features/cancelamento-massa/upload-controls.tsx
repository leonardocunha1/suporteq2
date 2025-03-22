import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadControlsProps {
  file: File | null;
  isUploading: boolean;
  onSelect: () => void;
  onUpload: () => void;
}

export function UploadControls({
  file,
  isUploading,
  onSelect,
  onUpload,
}: UploadControlsProps) {
  return (
    <motion.div
      key="upload-buttons"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex gap-10"
    >
      <Button
        onClick={onSelect}
        className={cn(
          "bg-gray-500 hover:bg-gray-600 w-full",
          file && "cursor-not-allowed"
        )}
        disabled={!!file}
      >
        Selecionar Arquivo
      </Button>

      <Button
        className="bg-blue-500 hover:bg-blue-600 w-full flex items-center justify-center"
        onClick={onUpload}
        disabled={!file || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Arquivo"
        )}
      </Button>
    </motion.div>
  );
}
