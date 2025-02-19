// import { Button } from "@/components/ui/button";
// import { CardComponent } from "@/components/ui/card-component";
// import { Formulario } from "@/components/ui/formulario";
// import {
//   Select,
//   SelectItem,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { watch } from "fs";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const commonSchema = {
//   originalProductValue: z.number().min(1, "O valor da transação é obrigatório"),
//   taxPayment: z.number(),
//   quemAssumeTaxPayment: z.enum(["cliente", "produtor"]),
//   taxPaymentQ2: z.number(),
//   taxPaymentProducer: z.number(),
//   taxaAdquirente: z.number(),
// };

// const formSchemaOnline = z.object({
//   ...commonSchema,
//   protectionValue: z.number(),
//   taxConvenience: z.number(),
//   quemAssumeTaxConvenience: z.enum(["cliente", "produtor"]),
//   taxConvencienceQ2: z.number(),
//   taxConvenienceProducer: z.number(),
//   taxProcessing: z.number(),
//   quemAssumeTaxProcessing: z.enum(["cliente", "produtor"]),
//   taxProcessingQ2: z.number(),
//   taxProcessingProducer: z.number(),
// });

// const formSchemaPDV = z.object({
//   ...commonSchema,
// });

// export function CalculoEstornoParcial() {
//   const [tipoTransacao, setTipoTransacao] = useState<string>("");
//   const [exibirFormulario, setExibirFormulario] = useState<boolean>(false);

//   const formOnline = useForm<z.infer<T>>({
//     resolver: zodResolver(formSchemaOnline),
//   });

//   const formPDV = useForm<z.infer<T>>({
//     resolver: zodResolver(formSchemaPDV),
//   });
//   const quemAssumeTaxaPDV = formPDV.watch("quemAssumeTaxPayment");
//   console.log(quemAssumeTaxaPDV);

//   function onSubmitOnline(data: z.infer<typeof formSchemaOnline>) {
//     console.log(data);
//   }

//   function onSubmitPDV(data: z.infer<typeof formSchemaPDV>) {
//     // calculo da taxa de pagamento
//     const taxPaymentValue = data.originalProductValue * (data.taxPayment / 100);

//     // calculo da taxa de pagamento repassada ao produtor e a Q2
//     const valorTaxaPagamentoRepassadoAoProdutor =
//       data.taxPaymentProducer > 0
//         ? (data.taxPaymentProducer / data.taxPayment) * taxPaymentValue
//         : 0;
//     // const valorTaxaPagamentoRepassadoAQ2 =
//     //   taxPaymentValue - valorTaxaPagamentoRepassadoAoProdutor;

//     const producerNetValue =
//       data.quemAssumeTaxPayment === "cliente"
//         ? data.originalProductValue + valorTaxaPagamentoRepassadoAoProdutor
//         : data.originalProductValue - taxPaymentValue;

//     const valueFull =
//       data.quemAssumeTaxPayment === "cliente"
//         ? data.originalProductValue + taxPaymentValue
//         : data.originalProductValue;

//     const valueLiquid = valueFull - valueFull * (data.taxaAdquirente / 100);

//     const valueLiquidFranchise = valueLiquid - producerNetValue;
//   }

//   return (
//     <Tabs defaultValue="calculo">
//       <TabsList>
//         <TabsTrigger value="calculo">Calcular</TabsTrigger>
//         <TabsTrigger value="account">Guia</TabsTrigger>
//       </TabsList>
//       <TabsContent value="calculo">
//         <CardComponent
//           sections={[
//             {
//               itens: [
//                 <div className="space-y-4">
//                   {!exibirFormulario && (
//                     <>
//                       <Select onValueChange={setTipoTransacao}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Selecione o tipo de transação" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="online">Online</SelectItem>
//                           <SelectItem value="pdv">PDV</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <Button
//                         onClick={() => {
//                           if (tipoTransacao) setExibirFormulario(true);
//                         }}
//                         className="bg-blue-500 text-white"
//                         size="sm"
//                         disabled={!tipoTransacao}
//                       >
//                         Próximo
//                       </Button>
//                     </>
//                   )}
//                   {exibirFormulario && (
//                     <>
//                       {tipoTransacao === "online" && (
//                         <Formulario
//                           form={formOnline}
//                           inputs={[
//                             {
//                               type: "number",
//                               label: "Valor da transação ativa (R$)",
//                               id: "originalProductValue",
//                               columns: "col-span-6",
//                             },
//                             {
//                               type: "number",
//                               label: "Taxa adquirente (%)",
//                               id: "taxaAdquirente",
//                               columns: "col-span-6",
//                             },
//                             {
//                               type: "number",
//                               label: "Taxa de conveniência (%)",
//                               id: "taxConvenience",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "select",
//                               label: "Quem assume",
//                               id: "quemAssumeTaxConvenience",
//                               options: [
//                                 { label: "Cliente", value: "cliente" },
//                                 { label: "Produtor", value: "produtor" },
//                               ],
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Q2 Recebe (%)",
//                               id: "taxConvencienceQ2",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Produtor Recebe (%)",
//                               id: "taxConvenienceProducer",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Taxa de processamento (%)",
//                               id: "taxProcessing",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "select",
//                               label: "Quem assume",
//                               id: "quemAssumeTaxProcessing",
//                               options: [
//                                 { label: "Cliente", value: "cliente" },
//                                 { label: "Produtor", value: "produtor" },
//                               ],
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Q2 Recebe (%)",
//                               id: "taxProcessingQ2",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Produtor Recebe (%)",
//                               id: "taxProcessingProducer",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Valor da proteção (R$) - Se houver",
//                               id: "protectionValue",
//                             },
//                           ]}
//                           formSchema={formSchemaOnline}
//                           onSubmit={onSubmitOnline}
//                           buttonName="Calcular Valores"
//                         />
//                       )}
//                       {tipoTransacao === "pdv" && (
//                         <Formulario
//                           form={formPDV}
//                           inputs={[
//                             {
//                               type: "number",
//                               label: "Valor original product value (R$)",
//                               id: "originalProductValue",
//                               columns: "col-span-6",
//                             },
//                             {
//                               type: "number",
//                               label: "Taxa adquirente (%)",
//                               id: "taxaAdquirente",
//                               columns: "col-span-6",
//                             },
//                             {
//                               type: "number",
//                               label: "Taxa método pagamento (%)",
//                               id: "taxPayment",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "select",
//                               label: "Quem assume",
//                               id: "quemAssumeTaxPayment",
//                               options: [
//                                 { label: "Cliente", value: "cliente" },
//                                 { label: "Produtor", value: "produtor" },
//                               ],
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Q2 Recebe (%)",
//                               id: "taxPaymentQ2",
//                               columns: "col-span-3",
//                             },
//                             {
//                               type: "number",
//                               label: "Produtor Recebe (%)",
//                               id: "taxPaymentProducer",
//                               columns: "col-span-3",
//                               disabled: true,
//                             },
//                           ]}
//                           formSchema={formSchemaPDV}
//                           onSubmit={onSubmitPDV}
//                           buttonName="Calcular Valores"
//                         />
//                       )}
//                       <Button
//                         onClick={() => {
//                           setTipoTransacao("");
//                           setExibirFormulario(false);
//                         }}
//                         className="bg-gray-500 text-white mt-4"
//                         size="sm"
//                       >
//                         Voltar
//                       </Button>
//                     </>
//                   )}
//                 </div>,
//               ],
//               titulo: "Tipo de Transação",
//             },
//           ]}
//         />
//       </TabsContent>
//     </Tabs>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardComponent } from "@/components/ui/card-component";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormularioOnline } from "./formulario-online";
import { FormularioPDV } from "./formulario-pdv";

export function CalculoEstornoParcial() {
  const [tipoTransacao, setTipoTransacao] = useState<string>("");
  const [exibirFormulario, setExibirFormulario] = useState<boolean>(false);

  return (
    <Tabs defaultValue="calculo">
      <TabsList>
        <TabsTrigger value="calculo">Calcular</TabsTrigger>
        <TabsTrigger value="account">Guia</TabsTrigger>
      </TabsList>
      <TabsContent value="calculo">
        <CardComponent
          sections={[
            {
              titulo: "Tipo de Transação",
              itens: [
                <div className="space-y-4">
                  {!exibirFormulario && (
                    <>
                      <Select onValueChange={setTipoTransacao}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de transação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="pdv">PDV</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => {
                          if (tipoTransacao) setExibirFormulario(true);
                        }}
                        className="bg-blue-500 text-white"
                        size="sm"
                        disabled={!tipoTransacao}
                      >
                        Próximo
                      </Button>
                    </>
                  )}
                  {exibirFormulario &&
                    (tipoTransacao === "online" ? (
                      <FormularioOnline
                        onBack={() => {
                          setExibirFormulario(false);
                          setTipoTransacao("");
                        }}
                      />
                    ) : (
                      <FormularioPDV
                        onBack={() => {
                          setExibirFormulario(false);
                          setTipoTransacao("");
                        }}
                      />
                    ))}
                </div>,
              ],
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
