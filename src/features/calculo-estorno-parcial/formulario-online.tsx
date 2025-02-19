import { Formulario } from "@/components/ui/formulario";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchemaOnline = z.object({
  originalProductValue: z.number().min(1, "O valor da transação é obrigatório"),
  taxPayment: z.number(),
  quemAssumeTaxPayment: z.enum(["cliente", "produtor"]),
  taxPaymentQ2: z.number(),
  taxPaymentProducer: z.number(),
  taxaAdquirente: z.number(),
  protectionValue: z.number(),
  taxConvenience: z.number(),
  quemAssumeTaxConvenience: z.enum(["cliente", "produtor"]),
  taxConvencienceQ2: z.number(),
  taxConvenienceProducer: z.number(),
  taxProcessing: z.number(),
  quemAssumeTaxProcessing: z.enum(["cliente", "produtor"]),
  taxProcessingQ2: z.number(),
  taxProcessingProducer: z.number(),
});

export function FormularioOnline({ onBack }: { onBack: () => void }) {
  const form = useForm<z.infer<typeof formSchemaOnline>>({
    resolver: zodResolver(formSchemaOnline),
  });

  function onSubmit(data: z.infer<typeof formSchemaOnline>) {
    console.log(data);
  }

  return (
    <>
      <Formulario
        form={form}
        inputs={[
          {
            type: "number",
            label: "Valor da transação ativa (R$)",
            id: "originalProductValue",
            columns: "col-span-6",
          },
          {
            type: "number",
            label: "Taxa adquirente (%)",
            id: "taxaAdquirente",
            columns: "col-span-6",
          },
          {
            type: "number",
            label: "Taxa de conveniência (%)",
            id: "taxConvenience",
            columns: "col-span-3",
          },
          {
            type: "select",
            label: "Quem assume",
            id: "quemAssumeTaxConvenience",
            options: [
              { label: "Cliente", value: "cliente" },
              { label: "Produtor", value: "produtor" },
            ],
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Q2 Recebe (%)",
            id: "taxConvencienceQ2",
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Produtor Recebe (%)",
            id: "taxConvenienceProducer",
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Taxa de processamento (%)",
            id: "taxProcessing",
            columns: "col-span-3",
          },
          {
            type: "select",
            label: "Quem assume",
            id: "quemAssumeTaxProcessing",
            options: [
              { label: "Cliente", value: "cliente" },
              { label: "Produtor", value: "produtor" },
            ],
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Q2 Recebe (%)",
            id: "taxProcessingQ2",
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Produtor Recebe (%)",
            id: "taxProcessingProducer",
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Valor da proteção (R$) - Se houver",
            id: "protectionValue",
          },
        ]}
        formSchema={formSchemaOnline}
        onSubmit={onSubmit}
        buttonName="Calcular Valores"
      />
      <Button
        onClick={onBack}
        className="bg-gray-500 text-white mt-4 p-2 rounded"
        size="sm"
      >
        Voltar
      </Button>
    </>
  );
}
