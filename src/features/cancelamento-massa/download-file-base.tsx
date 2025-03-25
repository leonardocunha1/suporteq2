import { FileText } from "lucide-react";

export function DownloadBaseFile() {
  const fileUrl = "/arquivos/cancelamentoemmassa.xlsx";

  return (
    <div className="flex flex-col items-center flex-wrap justify-center gap-2">
      <span className="text-center sm:text-start">Baixar o arquivo base:</span>
      <FileText className="w-5 h-5 text-green-600" />
      <a href={fileUrl} download className="text-blue-600 hover:underline">
        base.xlsx
      </a>
    </div>
  );
}
