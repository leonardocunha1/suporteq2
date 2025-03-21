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
import { PDV } from "./pdv";

export function CalculoEstornoParcial() {
  const [tipoTransacao, setTipoTransacao] = useState<string>("");
  const [exibirFormulario, setExibirFormulario] = useState<boolean>(false);

  return (
    <Tabs defaultValue="calculo">
      <TabsList>
        <TabsTrigger value="calculo">Calcular</TabsTrigger>
        <TabsTrigger value="guide">Guia</TabsTrigger>
      </TabsList>
      <TabsContent value="calculo">
        {!exibirFormulario && (
          <CardComponent
            sections={[
              {
                titulo: "Tipo de Transação",
                itens: [
                  <div className="space-y-4" key="tipo-transacao">
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
                  </div>,
                ],
              },
            ]}
          />
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
            <PDV
              onBack={() => {
                setExibirFormulario(false);
                setTipoTransacao("");
              }}
            />
          ))}
      </TabsContent>
      <TabsContent value="guide">
        <CardComponent
          sections={[
            {
              titulo:
                "Para que serve o cálculo de estorno parcial de ingressos?",
              itens: [
                <div className="space-y-2">
                  <p>
                    Exemplo: Uma compra teve 10 ingressos, mas apenas 5 serão
                    estornados e o recalculo das taxas e valores no financeiro
                    terão que ser ajustadas.
                  </p>
                  <p>
                    Para calcular o valor corretamente, precisamos informar o
                    valor dos ingressos que permanecerão ativos.
                  </p>
                </div>,
              ],
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
