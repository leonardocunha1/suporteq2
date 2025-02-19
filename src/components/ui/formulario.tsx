import { Path, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";

type BaseFormInput = {
  id: string;
  label?: string;
  description?: string;
  columns?:
    | "col-span-12"
    | "col-span-6"
    | "col-span-4"
    | "col-span-3"
    | "col-span-2"
    | "col-span-1";
};

type FormInput =
  | (BaseFormInput & {
      type: "text" | "number" | "textarea";
      placeholder?: string;
      disabled?: boolean;
    })
  | (BaseFormInput & {
      type: "checkbox";
    })
  | (BaseFormInput & {
      type: "select";
      options: { label: string; value: string }[];
    });

type FormularioProps<T extends z.ZodObject<z.ZodRawShape>> = {
  onSubmit: SubmitHandler<z.infer<T>>;
  formSchema: T;
  inputs: FormInput[];
  buttonName?: string;
  form: ReturnType<typeof useForm<z.infer<T>>>;
};

export function Formulario<T extends z.ZodObject<z.ZodRawShape>>({
  form,
  onSubmit,
  inputs,
  buttonName,
}: FormularioProps<T>) {
  return (
    <Form {...form}>
      <Card className="p-5">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid items-end grid-cols-12 gap-x-2 gap-y-4">
            {inputs.map((input, index) => (
              <div
                className={cn(
                  "flex flex-col gap-4 transition-all duration-300",
                  input.columns ? input.columns : "col-span-12"
                )}
                key={index}
              >
                <FormField
                  control={form.control}
                  name={input.id as Path<z.infer<T>>}
                  render={({ field }) => (
                    <FormItem>
                      {input.label && <FormLabel>{input.label}</FormLabel>}
                      <FormControl>
                        {input.type === "textarea" ? (
                          <Textarea
                            className="border rounded-md p-2 w-full"
                            placeholder={input.placeholder}
                            {...field}
                          />
                        ) : input.type === "checkbox" ? (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        ) : input.type === "select" ? (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="text-gray-500">
                              <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                              {input.options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type={input.type}
                            placeholder={input.placeholder}
                            disabled={input.disabled}
                            {...field}
                            onChange={(e) => {
                              if (input.type === "number") {
                                field.onChange(
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                                );
                              } else {
                                field.onChange(e.target.value);
                              }
                            }}
                            value={
                              input.type === "number" &&
                              field.value !== undefined
                                ? String(field.value)
                                : field.value
                            }
                          />
                        )}
                      </FormControl>
                      {input.description && (
                        <FormDescription>{input.description}</FormDescription>
                      )}
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
    </Form>
  );
}
