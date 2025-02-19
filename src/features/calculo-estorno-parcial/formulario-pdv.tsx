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
  taxaAdquirente: z.number(),
});

export function FormularioPDV({ onBack }: { onBack: () => void }) {
  const form = useForm<z.infer<typeof formSchemaPDV>>({
    resolver: zodResolver(formSchemaPDV),
    defaultValues: {
      taxPayment: 0,
      taxPaymentQ2: 0,
      taxPaymentProducer: 0,
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

  useEffect(() => {
    if (quemAssumeTaxPayment === "produtor") {
      form.setValue("taxPaymentQ2", taxPayment);
      form.setValue("taxPaymentProducer", 0);
    } else {
      form.setValue("taxPaymentProducer", taxPayment - taxPaymentQ2);
    }
  }, [taxPayment, taxPaymentQ2, quemAssumeTaxPayment, form]);

  function onSubmit(data: z.infer<typeof formSchemaPDV>) {
    // calculo da taxa de pagamento
    const taxPaymentValue = data.originalProductValue * (data.taxPayment / 100);

    // calculo da taxa de pagamento repassada ao produtor e a Q2
    const valorTaxaPagamentoRepassadoAoProdutor =
      data.taxPaymentProducer > 0
        ? (data.taxPaymentProducer / data.taxPayment) * taxPaymentValue
        : 0;
    // const valorTaxaPagamentoRepassadoAQ2 =
    //   taxPaymentValue - valorTaxaPagamentoRepassadoAoProdutor;

    const producerNetValue =
      data.quemAssumeTaxPayment === "cliente"
        ? data.originalProductValue + valorTaxaPagamentoRepassadoAoProdutor
        : data.originalProductValue - taxPaymentValue;

    const valueFull =
      data.quemAssumeTaxPayment === "cliente"
        ? data.originalProductValue + taxPaymentValue
        : data.originalProductValue;

    const valueLiquid = valueFull - valueFull * (data.taxaAdquirente / 100);

    const valueLiquidFranchise = valueLiquid - producerNetValue;

    console.log({
      taxPaymentValue,
      valorTaxaPagamentoRepassadoAoProdutor,
      producerNetValue,
      valueFull,
      valueLiquid,
      valueLiquidFranchise,
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
