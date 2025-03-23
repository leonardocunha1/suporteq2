import { useState } from "react";
import { FormularioPDV } from "./formulario-pdv";
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
    <div className="">
      <FormularioPDV onBack={onBack} setResultados={setResultados} />
      {resultados && (
        <div className="max-w-lg mx-auto">
          <CardComponent
            sections={[
              {
                titulo: "Valores Financeiro",
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
        </div>
      )}
    </div>
  );
}
