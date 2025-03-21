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
import { CardComponent } from "@/components/ui/card-component";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Esquema de validação
const formSchema = z.object({
  transactionsFinance: z
    .string()
    .min(1, "As transações financeiras são obrigatórias"),
  transactionsAdmin: z
    .string()
    .min(1, "As transações administrativas são obrigatórias"),
  transactionsFinanceValue: z
    .string()
    .min(1, "Os valores das transações financeiras são obrigatórias"),
  transactionsAdminValues: z
    .string()
    .min(1, "Os valores das transações administrativas são obrigatórias"),
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

export function ValoresDivergentes() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const [transacoesComValoresDivergentes, setTransacoesComValoresDivergentes] =
    useState<{ paymentCode: string; value: number }[]>([]);
  const [mensagem, setMensagem] = useState<string>("");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // ------------------------------------- FINANCEIRO ----------------------------------------

    // PEGANDO O PAYMENTCODE E O VALOR DAS TRANSAÇÕES FINANCEIRAS
    const transactionsFinance = data.transactionsFinance
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val); // Filtra qualquer valor vazio

    const transactionsFinanceValues = data.transactionsFinanceValue
      .split(",")
      .map((val) => parseFloat(val.trim())) // Converte para números
      .filter((val) => val);

    // Cria um array de objetos combinando o PAYMENTCODE e o Valor da transação
    const objetoTransacoesFinanceiras = transactionsFinance.map(
      (transaction, index) => ({
        paymentCode: transaction,
        value: transactionsFinanceValues[index] || 0,
      })
    );

    // ------------------------------------- ADMINISTRATIVO ----------------------------------------

    // PEGANDO O PAYMENTCODE E O VALOR DAS TRANSAÇÕES DO ADMIN
    const transactionsAdmin = data.transactionsAdmin
      .split(",")
      .map((val) => val.trim());

    const transactionsAdminValues = data.transactionsAdminValues
      .split(",")
      .map((val) => parseFloat(val.trim()));

    // Cria um array de objetos com transaction e value
    const objetoTransacoesAdminComRepeticao = transactionsAdmin.map(
      (transaction, index) => ({
        paymentCode: transaction,
        value: transactionsAdminValues[index] || 0,
      })
    );

    // Agrupa e soma os valores das transações repetidas
    const transacoesAdminAgrupadas = objetoTransacoesAdminComRepeticao.reduce(
      (acc, curr) => {
        if (acc[curr.paymentCode]) {
          acc[curr.paymentCode].value += curr.value; // Soma os valores se já existir o paymentCode
        } else {
          acc[curr.paymentCode] = { ...curr }; // Se não existir, adiciona como nova entrada
        }
        return acc;
      },
      {} as Record<string, { paymentCode: string; value: number }> // Inicializa como um objeto vazio
    );

    // Converte o objeto de agrupamento de volta para um array
    const objetoTransacoesAdminSemRepeticao = Object.values(
      transacoesAdminAgrupadas
    );

    // Agora vamos comparar os paymentCode e subtrair os valores
    const resultado = objetoTransacoesAdminSemRepeticao.map(
      (adminTransaction) => {
        // Encontrar a transação financeira correspondente
        const financeTransaction = objetoTransacoesFinanceiras.find(
          (finance) => finance.paymentCode === adminTransaction.paymentCode
        );

        // Se encontrar uma transação financeira, subtraímos o valor
        if (financeTransaction) {
          return {
            paymentCode: adminTransaction.paymentCode,
            value: adminTransaction.value - financeTransaction.value,
          };
        }

        // Se não encontrar, mantemos o valor original da transação administrativa - NÃO VAI ENTRAR AQUI DE JEITO NENHUM
        return {
          paymentCode: adminTransaction.paymentCode,
          value: adminTransaction.value,
        };
      }
    );

    const resultadoComValueDiferenteDeZero = resultado.filter(
      (item) => item.value !== 0
    );

    if (resultadoComValueDiferenteDeZero.length === 0) {
      setMensagem("Nenhuma divergência encontrada.");
      setTransacoesComValoresDivergentes([]);
      return;
    }

    console.log(resultadoComValueDiferenteDeZero); // Exibe o resultado final com os valores subtraídos
    setTransacoesComValoresDivergentes(resultadoComValueDiferenteDeZero);
    setMensagem("");
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
                    titulo: "Guia para calcular valores divergentes",
                    icon: () => null,
                    itens: [
                      <div className="space-y-2 w-full">
                        <p>
                          Às vezes pode acontecer de realizar um cancelamento
                          parcial no admin e no financeiro não, ou vice-versa.
                          Entre outros motivos.
                        </p>
                        <p>
                          Digite as transações financeiras e administrativas
                          (Gateways) com os seus respectivos valores que deseja
                          comparar. Separe cada transação e valor por vírgula. O
                          resultado mostrará as transações que têm divergência
                          de valores.
                        </p>
                        <p>
                          <span className="text-red-500 font-semibold">
                            Obs.
                          </span>{" "}
                          Os gateways e os valores devem estar na mesma
                          ordem/index. Por exemplo: se, no financeiro, uma
                          transação X tiver um valor de 10 reais e uma transação
                          Y tiver um valor de 20 reais, nos inputs terá que
                          ficar dessa forma: X, Y nos{" "}
                          <span className="font-semibold text-black">
                            GATEWAYS
                          </span>{" "}
                          e 10, 20 nos{" "}
                          <span className="font-semibold text-black">
                            VALORES
                          </span>
                          .
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
              <div className="grid grid-cols-1 gap-4 pb-6">
                <Card className="p-6">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-5 border-r pr-5">
                        {/* Transações Financeiras */}
                        <FormField
                          control={form.control}
                          name="transactionsFinance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Transações Financeiro - Gateways
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432', '99485781796'"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Digite as transações relacionadas ao financeiro
                                do evento.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="transactionsFinanceValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Transações Financeiro - Valores
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Exemplo: 150, 240, 320"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Digite os valores das transações relacionadas ao
                                financeiro do evento.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-5">
                        {/* Transações Administrativas */}
                        <FormField
                          control={form.control}
                          name="transactionsAdmin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transações Admin - Gateways</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Exemplo: '98027672261', 'EF8E01BC79CC43C4B5A89C81AEFEE432', '99485781796'"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Digite as transações relacionadas à
                                administração do evento.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="transactionsAdminValues"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transações Admin - Valores</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Exemplo: 150, 240, 320"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Digite os valores das transações relacionadas à
                                administração do evento.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Botão de submissão */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="bg-blue-500 text-wrap"
                        size="sm"
                      >
                        Encontrar Valores Divergentes
                      </Button>
                    </div>
                  </form>
                </Card>

                {mensagem === "" &&
                transacoesComValoresDivergentes.length === 0 ? (
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
                          titulo="Transações com Valores Divergentes"
                          itens={transacoesComValoresDivergentes.map((item) => {
                            const formatoBrl = new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            });

                            const divergencia =
                              item.value > 0
                                ? `Admin está maior em ${formatoBrl.format(item.value)}`
                                : `Financeiro está maior em ${formatoBrl.format(-item.value)}`;

                            return `Transação: ${item.paymentCode} - Divergência: ${divergencia}`;
                          })}
                        />
                      </CardContent>
                    </Card>
                    <Button
                      className="bg-red-500"
                      onClick={() => {
                        setTransacoesComValoresDivergentes([]);
                        setMensagem("");
                      }}
                    >
                      Limpar
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
