import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, checkAuth, isAuthenticated } = useAuthStore(); // Pegando a autenticação

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Se já estiver autenticado, redireciona para a página principal
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    const success = await login(data.email, data.password);
    if (success) navigate("/");
    else alert("Erro ao fazer login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-96 shadow-lg rounded-xl bg-white">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-blue-600">
              Q2 Ingressos
            </h2>
            <p className="text-center text-gray-500">
              Faça login para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                />
                {errors.password && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 transition-all text-white font-semibold"
              >
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
