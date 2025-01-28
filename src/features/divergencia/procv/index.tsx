import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// Esquema de validação
const formSchema = z.object({
  transactionsFinance: z
    .string()
    .min(1, "As transações financeiras são obrigatórias"),
  transactionsAdmin: z
    .string()
    .min(1, "As transações administrativas são obrigatórias"),
});

// Componente reutilizável para listar divergências
type ListaDivergenciasProps = {
  titulo: string;
  itens: string[];
};

function ListaDivergencias({ titulo, itens }: ListaDivergenciasProps) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-blue-600">{titulo}</h4>
      {itens.length > 0 ? (
        <ul className="list-disc pl-6">
          {itens.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma divergência encontrada.</p>
      )}
    </div>
  );
}

export function Procv() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const [valoresFinanceiros, setValoresFinanceiros] = useState<string[]>([]);
  const [valoresAdministrativos, setValoresAdministrativos] = useState<
    string[]
  >([]);
  const [mensagem, setMensagem] = useState<string>("");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const transactionsFinance = data.transactionsFinance
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val);

    // Elimina duplicatas nas transações administrativas
    const transactionsAdmin = Array.from(
      new Set(
        data.transactionsAdmin
          .split(",")
          .map((val) => val.trim())
          .filter((val) => val)
      )
    );

    const financeirosSemCorrespondencia = transactionsFinance.filter(
      (item) => !transactionsAdmin.includes(item)
    );
    const administrativosSemCorrespondencia = transactionsAdmin.filter(
      (item) => !transactionsFinance.includes(item)
    );

    if (
      financeirosSemCorrespondencia.length === 0 &&
      administrativosSemCorrespondencia.length === 0
    ) {
      setMensagem("Nenhuma divergência encontrada.");
    } else {
      setValoresFinanceiros(financeirosSemCorrespondencia);
      setValoresAdministrativos(administrativosSemCorrespondencia);
      setMensagem("");
    }
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 gap-4 p-4">
        <Card className="p-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              {/* Transações Financeiras */}
              <FormField
                control={form.control}
                name="transactionsFinance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transações Financeiro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432', '99485781796'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite as transações relacionadas ao financeiro do evento.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Transações Administrativas */}
              <FormField
                control={form.control}
                name="transactionsAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transações Admin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432', '99485781796'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite as transações relacionadas à administração do
                      evento.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botão de submissão */}
            <div className="pt-4">
              <Button type="submit" className="bg-blue-500" size="sm">
                Encontrar Divergências
              </Button>
            </div>
          </form>
        </Card>

        {mensagem === "" &&
        valoresFinanceiros.length === 0 &&
        valoresAdministrativos.length === 0 ? (
          ""
        ) : (
          <>
            <Card className="shadow-md text-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  Divergências Encontradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Listas de divergências */}
                <ListaDivergencias
                  titulo="Somente no Financeiro:"
                  itens={valoresFinanceiros}
                />
                <ListaDivergencias
                  titulo="Somente no Administrativo:"
                  itens={valoresAdministrativos}
                />
              </CardContent>
            </Card>
            <Button
              className="bg-red-500"
              onClick={() => {
                setValoresFinanceiros([]);
                setValoresAdministrativos([]);
                setMensagem("");
              }}
            >
              Limpar
            </Button>
          </>
        )}
      </div>
    </Form>
  );
}
