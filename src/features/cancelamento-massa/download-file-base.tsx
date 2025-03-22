import { FileText } from "lucide-react";

export function DownloadBaseFile() {
  const fileUrl = "/arquivos/cancelamentoemmassa.xlsx";

  return (
    <div className="flex items-center justify-center space-x-2">
      <span>Baixar o arquivo base:</span>
      <FileText className="w-5 h-5 text-green-600" />
      <a href={fileUrl} download className="text-blue-600 hover:underline">
        cancelamentoemmassa.xlsx
      </a>
    </div>
  );
}
