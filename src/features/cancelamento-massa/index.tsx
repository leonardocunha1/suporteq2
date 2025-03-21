import { Formulario } from "@/components/ui/formulario";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  planilhaCancelamento: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Selecione um arquivo.",
  }),
});

export function CancelamentoMassa() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Formulario
        form={form}
        formSchema={formSchema}
        onSubmit={onSubmit}
        inputs={[
          {
            id: "planilhaCancelamento",
            label: "Planilha de cancelamento",
            type: "file",
            columns: "col-span-3",
          },
        ]}
      />
    </div>
  );
}
