import { Formulario } from "@/components/ui/formulario";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
  franchise: z.boolean().default(false),
});

export function FormularioOnline({
  onBack,
  setResultados,
}: {
  onBack: () => void;
  setResultados: (resultados: {
    originalProductValue: number;
    producerNetValue: number;
    valueFull: number;
    valueLiquid: number;
    valueLiquidFranchise: number;
    valueLiquidQuero2: number;
  }) => void;
}) {
  console.log(setResultados);
  const form = useForm<z.infer<typeof formSchemaOnline>>({
    resolver: zodResolver(formSchemaOnline),
  });

  // Observa mudanças nos valores do formulário
  const taxConvenience = useWatch({ control: form.control, name: "taxConvenience" });
  const taxConvenienceQ2 = useWatch({
    control: form.control,
    name: "taxConvencienceQ2",
  });

  const taxPayment = useWatch({ control: form.control, name: "taxPayment" });
  const taxPaymentQ2 = useWatch({
    control: form.control,
    name: "taxPaymentQ2",
  });

  const taxProcessing = useWatch({ control: form.control, name: "taxProcessing" });
  const taxProcessingQ2 = useWatch({
    control: form.control,
    name: "taxProcessingQ2",
  });

  const quemAssumeTaxConvenience = useWatch({
    control: form.control,
    name: "quemAssumeTaxConvenience",
  });
  const quemAssumeTaxPayment = useWatch({
    control: form.control,
    name: "quemAssumeTaxPayment",
  });
  const quemAssumeTaxProcessing = useWatch({
    control: form.control,
    name: "quemAssumeTaxProcessing",
  });

  const isMariliaEvent = useWatch({
    control: form.control,
    name: "franchise",
  });

  useEffect(() => {
    if (quemAssumeTaxPayment === "produtor") {
      form.setValue("taxPaymentQ2", taxPayment);
      form.setValue("taxPaymentProducer", 0);
    } else {
      form.setValue("taxPaymentProducer", taxPayment - taxPaymentQ2);
    }
  }, [
    taxPayment,
    taxPaymentQ2,
    form,
    quemAssumeTaxPayment,
    quemAssumeTaxConvenience,
    quemAssumeTaxProcessing,
  ]);
  
  useEffect(() => {
    if (quemAssumeTaxConvenience === "produtor") {
      form.setValue("taxConvencienceQ2",taxConvenience);
      form.setValue("taxConvenienceProducer", 0);
    } else {
      form.setValue(
        "taxConvenienceProducer",
        taxConvenience - taxConvenienceQ2
      );
    }
  }, [
    quemAssumeTaxConvenience, 
    form,
    taxConvenience,
    taxConvenienceQ2,
    ]
  );

  useEffect(() => {
    if (quemAssumeTaxProcessing === "produtor") {
      form.setValue("taxProcessingQ2", taxProcessing);
      form.setValue("taxProcessingProducer", 0);
    } else {
      form.setValue(
        "taxProcessingProducer",
        taxProcessing - taxProcessingQ2
      );
    }
  }, [
    quemAssumeTaxProcessing, 
    form,
    taxProcessing,
    taxProcessingQ2,
    ]
  );

  function onSubmit(data: z.infer<typeof formSchemaOnline>) {
    const taxConvenienceDecimal = data.taxConvenience / 100;


    const valueComTaxaConveniencia = data.quemAssumeTaxConvenience === "produtor"
    console.log(valueComTaxaConveniencia);
    console.log(taxConvenienceDecimal);
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
            disabled: quemAssumeTaxConvenience === "produtor",
          },
          {
            type: "number",
            label: "Produtor Recebe (%)",
            id: "taxConvenienceProducer",
            columns: "col-span-3",
            disabled: true,
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
            disabled: quemAssumeTaxProcessing === "produtor",
          },
          {
            type: "number",
            label: "Produtor Recebe (%)",
            id: "taxProcessingProducer",
            columns: "col-span-3",
            disabled: true,
          },
          {
            type: "number",
            label: "Taxa de parcelamento (%)",
            id: "taxPayment",
            columns: "col-span-3",
          },
          {
            type: "select",
            label: "Quem assume",
            id: "quemAssumeTaxPayment",
            options: [
              { label: "Cliente", value: "cliente" },
              { label: "Produtor", value: "produtor" },
            ],
            columns: "col-span-3",
          },
          {
            type: "number",
            label: "Q2 Recebe (%)",
            id: "taxPaymentQ2",
            columns: "col-span-3",
            disabled: quemAssumeTaxPayment === "produtor",
          },
          {
            type: "number",
            label: "Produtor Recebe (%)",
            id: "taxPaymentProducer",
            columns: "col-span-3",
            disabled: true,
          },
          {
            type: "number",
            label: "Valor da proteção (R$) - Se houver",
            id: "protectionValue",
          },
          {
            type: "checkbox",
            id: "franchise",
            label: "É evento Marília?",
            columns: "col-span-3",
          },
          ...(isMariliaEvent
            ? [
                {
                  type: "number" as const,
                  id: "taxValueFranchise",
                  label: "Taxa cobrada de Marília (%)",
                  columns: "col-span-8" as const,
                },
              ]
            : []),
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
