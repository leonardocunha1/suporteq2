import { useState } from "react";
import { FormularioPDV } from "./formulario-pdv";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CardComponent } from "@/components/ui/card-component";

export function PDV({ onBack }: { onBack: () => void }) {
  const [resultados, setResultados] = useState<{
    originalProductValue: number;
    producerNetValue: number;
    valueFull: number;
    valueLiquid: number;
    valueLiquidFranchise: number;
    valueLiquidQuero2: number;
  } | null>(null);

  return (
    <div className="space-y-6">
      <FormularioPDV onBack={onBack} setResultados={setResultados} />
      {resultados && (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <CardComponent
              sections={[
                {
                  titulo: "Valores",
                  itens: Object.entries(resultados).map(([key, value]) => (
                    <div key={key}>
                      <p className="font-medium text-gray-700">{key}</p>
                      <p className="text-gray-900">{value}</p>
                      <Separator className="my-2" />
                    </div>
                  )),
                },
              ]}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
