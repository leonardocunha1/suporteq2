import { useState } from "react";
import { FormularioPDV } from "./formulario-pdv";

export function PDV({ onBack }: { onBack: () => void }) {
  const [resultados, setResultados] = useState<{
    taxPaymentValue: number;
    producerNetValue: number;
    valueFull: number;
    valueLiquid: number;
    valueLiquidFranchise: number;
    valueLiquidQuero2: number;
  } | null>(null);

  return (
    <div>
      <FormularioPDV onBack={onBack} setResultados={setResultados} />
      {resultados && (
        <div>
          <h2>Resultados</h2>
          <p>Valor do pagamento de taxa: {resultados.taxPaymentValue}</p>
          <p>Valor líquido do produtor: {resultados.producerNetValue}</p>
          <p>Valor líquido: {resultados.valueLiquid}</p>
          <p>Valor líquido da franquia: {resultados.valueLiquidFranchise}</p>
          <p>Valor líquido do Quero2: {resultados.valueLiquidQuero2}</p>
        </div>
      )}
    </div>
  );
}
