import { Formulario } from "@/components/ui/formulario";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchemaPDV = z.object({
  originalProductValue: z.number().min(1, "O valor da transação é obrigatório"),
  taxPayment: z.number(),
  quemAssumeTaxPayment: z.enum(["cliente", "produtor"]),
  taxPaymentQ2: z.number().default(0),
  taxPaymentProducer: z.number().default(0),
  taxaAdquirente: z.number().nonnegative(),
  franchise: z.boolean().default(false),
  taxValueFranchise: z.number().optional(),
});

export function FormularioPDV({
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
  const form = useForm<z.infer<typeof formSchemaPDV>>({
    resolver: zodResolver(formSchemaPDV),
    defaultValues: {
      taxPayment: 0,
      taxPaymentQ2: 0,
      taxPaymentProducer: 0,
      franchise: false,
    },
  });

  // Observa mudanças nos valores do formulário
  const taxPayment = useWatch({ control: form.control, name: "taxPayment" });
  const quemAssumeTaxPayment = useWatch({
    control: form.control,
    name: "quemAssumeTaxPayment",
  });
  const taxPaymentQ2 = useWatch({
    control: form.control,
    name: "taxPaymentQ2",
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
  }, [taxPayment, taxPaymentQ2, quemAssumeTaxPayment, form]);

  function onSubmit(data: z.infer<typeof formSchemaPDV>) {
    const majorarValorTransacao =
      Math.trunc(((100 - data.taxPayment) / 100) * 100) / 100;

    const valueFull =
      data.quemAssumeTaxPayment === "cliente"
        ? Math.ceil(
            data.originalProductValue /
              parseFloat(majorarValorTransacao.toString())
          )
        : data.originalProductValue;

    const taxPaymentDecimal = data.taxPayment / 100;
    const parteQ2QueSeraSplitada = valueFull * taxPaymentDecimal;

    const valorCobradoAdquirente = valueFull * (data.taxaAdquirente / 100);

    const valueLiquid = valueFull - valorCobradoAdquirente;

    const parteTaxaProdutor = data.taxPaymentProducer / data.taxPayment;
    const valorTaxaPagamentoRepassadoAoProdutor =
      data.taxPaymentProducer > 0
        ? parteTaxaProdutor * (valueFull * taxPaymentDecimal)
        : 0;
    // console.log(valorTaxaPagamentoRepassadoAoProdutor);

    const producerNetValue =
      data.quemAssumeTaxPayment === "cliente"
        ? data.originalProductValue + valorTaxaPagamentoRepassadoAoProdutor
        : data.originalProductValue -
          data.originalProductValue * taxPaymentDecimal;

    const lucroBruto = valueFull - data.originalProductValue;
    const gordurinhaQ2 =
      data.quemAssumeTaxPayment === "cliente"
        ? lucroBruto - parteQ2QueSeraSplitada
        : 0;

    let valueLiquidFranchise;
    let valueLiquidQuero2;

    if (isMariliaEvent) {
      const parteTaxaFranca = (data.taxValueFranchise ?? 0) / data.taxPayment;
      const parteTaxaMarilia =
        (data.taxPaymentQ2 - (data.taxValueFranchise ?? 0)) / data.taxPayment;

      valueLiquidFranchise =
        parteQ2QueSeraSplitada * parteTaxaFranca +
        gordurinhaQ2 -
        valorCobradoAdquirente;

      valueLiquidQuero2 = parteQ2QueSeraSplitada * parteTaxaMarilia;

      console.log({
        gordurinhaQ2,
        parteQ2QueSeraSplitada,
      });
    } else {
      valueLiquidQuero2 = 0;
      valueLiquidFranchise = valueLiquid - producerNetValue;
    }

    setResultados({
      originalProductValue: data.originalProductValue,
      producerNetValue,
      valueFull,
      valueLiquid,
      valueLiquidFranchise,
      valueLiquidQuero2,
    });
  }

  return (
    <>
      <Formulario
        form={form}
        inputs={[
          {
            type: "number",
            label: "Valor original product value (R$)",
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
            label: "Taxa método pagamento (%)",
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
        formSchema={formSchemaPDV}
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
