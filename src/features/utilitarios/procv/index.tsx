import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { CardComponent } from "../../../components/ui/card-component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  transactionsFinance: z
    .string()
    .min(1, "As transações financeiras são obrigatórias"),
  transactionsAdmin: z
    .string()
    .min(1, "As transações administrativas são obrigatórias"),
});

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

export function PROCV() {
  const form = useForm<z.infer<typeof formSchema>>({
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
    <>
      <div className="space-y-6">
        <Tabs defaultValue="calculo">
          <TabsList className="shadow-md bg-blue-500 text-stone-50">
            <TabsTrigger value="calculo">Calcular</TabsTrigger>
            <TabsTrigger value="guide">Guia</TabsTrigger>
          </TabsList>
          <TabsContent value="guide" className="m-0 pt-3">
            <div className="space-y-6">
              <CardComponent
                sections={[
                  {
                    titulo: "Guia de como utilizar o PROCV",
                    icon: () => null,
                    itens: [
                      <div className="space-y-2">
                        <p>
                          Esse utilitário tem por função encontrar valores que
                          estão presentes em uma lista, mas não em outra.
                        </p>
                        <p>
                          Para isso, basta informar os valores separados por
                          vírgula em cada um dos campos e clicar em "Encontrar
                          Divergências".
                        </p>
                      </div>,
                    ],
                  },
                ]}
              />
            </div>
          </TabsContent>
          <TabsContent value="calculo" className="m-0 pt-3">
            <Form {...form}>
              <div className="grid grid-cols-1 gap-6  rounded-lg ">
                {/* Formulário de entrada */}
                <Card className="p-6 bg-white border border-gray-300 shadow-sm">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6">
                      {/* Transações Financeiras */}
                      <FormField
                        control={form.control}
                        name="transactionsFinance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Valores 1
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432'"
                                className="p-2 border rounded-md"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              Digite os valores que deseja comparar.
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
                            <FormLabel className="font-semibold text-gray-700">
                              Valores 2
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432'"
                                className="p-2 border rounded-md"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              Digite os outros valores que deseja comparar.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Botão de submissão */}
                    <div className="pt-5">
                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-all"
                        size="sm"
                      >
                        Realizar PROCV
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Exibição de divergências */}
                {mensagem !== "" ||
                valoresFinanceiros.length > 0 ||
                valoresAdministrativos.length > 0 ? (
                  <Card className="shadow-md bg-white border border-gray-300 p-6">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        📌 Divergências Encontradas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ListaDivergencias
                        titulo="📊 Somente no Financeiro:"
                        itens={valoresFinanceiros}
                      />
                      <ListaDivergencias
                        titulo="🏛️ Somente no Administrativo:"
                        itens={valoresAdministrativos}
                      />
                    </CardContent>
                  </Card>
                ) : null}

                {/* Botão para limpar os resultados */}
                {(valoresFinanceiros.length > 0 ||
                  valoresAdministrativos.length > 0) && (
                  <div className="text-center">
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-all"
                      onClick={() => {
                        setValoresFinanceiros([]);
                        setValoresAdministrativos([]);
                        setMensagem("");
                      }}
                    >
                      🗑️ Limpar
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
