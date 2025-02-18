import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

type FormInput =
  | { type: "text" | "number" | "textarea"; id: string; label?: string; placeholder?: string; description?: string; columns?: number }
  | { type: "checkbox"; id: string; label?: string; description?: string; columns?: number }
  | { type: "select"; id: string; label?: string; options: { label: string; value: string }[]; description?: string; columns?: number };

type FormularioProps<T extends z.ZodObject<any>> = {
  onSubmit: SubmitHandler<z.infer<T>>;
  formSchema: T;
  inputs: FormInput[];
  buttonName?: string;
};

export function Formulario<T extends z.ZodObject<any>>({
  formSchema,
  onSubmit,
  inputs,
  buttonName,
}: FormularioProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 gap-4 pb-6">
        <Card className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
           
              <div className="grid grid-cols-12">
                {inputs.map((input) => (
                    <div className={cn(
                        "flex flex-col gap-4 transition-all duration-300",
                        input.columns ? input.columns : "col-span-12"
                      )} key={input.id}>
                        <FormField
                          control={form.control}
                          name={input.id as string}
                          render={({ field }) => (
                            <FormItem>
                              {input.label && <FormLabel>{input.label}</FormLabel>}
                              <FormControl>
                                {input.type === "textarea" ? (
                                  <textarea className="border rounded-md p-2 w-full" placeholder={input.placeholder} {...field} />
                                ) : input.type === "checkbox" ? (
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="mt-1"
                                  />
                                ) : input.type === "select" ? (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione uma opção" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {input.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input type={input.type} placeholder={input.placeholder} {...field} />
                                )}
                              </FormControl>
                              {input.description && <FormDescription>{input.description}</FormDescription>}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                ))}
              </div>

              <div className="pt-4">
                <Button type="submit" className="bg-blue-500 text-wrap" size="sm">
                  {buttonName || "Enviar"}
                </Button>
              </div>
          </form>
        </Card>
      </div>
    </Form>
  );
}
