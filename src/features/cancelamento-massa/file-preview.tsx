import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <motion.div
      key="file-preview"
      className="flex justify-between p-6 bg-stone-50 border rounded-lg h-60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2">
        <FileText className="w-5 h-5 text-green-600" />
        <span className="text-sm text-gray-700">{file.name}</span>
      </div>
      <Button variant="destructive" size="icon" onClick={onRemove}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
