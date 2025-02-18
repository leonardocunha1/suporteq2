import { CardComponent } from "@/components/ui/card-component";
import { Formulario } from "@/components/ui/formulario";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

const formSchema = z.object({
  transactionId: z.string().min(1, "O ID da transação é obrigatório"),
});

export function CalculoEstornoParcial() {
    function onSubmit() {
        console.log('onSubmit')
    }

  return (
    <>
      <Tabs defaultValue="calculo" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="calculo">Calcular</TabsTrigger>
          <TabsTrigger value="account">Guia</TabsTrigger>
        </TabsList>
        <TabsContent value="calculo">
          <Formulario
          inputs={[
            { type: "text", id: "transactionId", label: "ID da Transação", placeholder: "ID da transação" },
          ]}
          formSchema={formSchema}
          onSubmit={onSubmit}
          />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <CardComponent
        sections={[
          {
            titulo: "Estorno Parcial",
            itens: [
              "O estorno parcial é uma operação que permite a devolução de parte do valor de uma transação.",
              "O valor a ser estornado deve ser informado no campo 'Valor Estornado' e o valor restante será mantido na transação.",
            ],
          },
        ]}
      />
      <h1>CalculoEstornoParcialFin</h1>
    </>
  );
}
