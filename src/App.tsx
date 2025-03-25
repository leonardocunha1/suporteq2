import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./components/home";
import { CalculoEstornoParcial } from "./features/calculo-estorno-parcial";
import { ValoresDivergentes } from "./features/utilitarios/valores";
import { PROCV } from "./features/utilitarios/procv";
import { CancelamentoMassa } from "./features/cancelamento-massa";
import LoginPage from "./features/login";
import { useMemo } from "react";
import { useAuthStore } from "./stores/auth-store";

// Componente para proteger rotas privadas
const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();

  const isAuth = useMemo(() => isAuthenticated, [isAuthenticated]);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

// Definição das rotas
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="home" />,
      },
      {
        path: "home",
        element: <PrivateRoute />, // Aplica proteção
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: "divergences",
        element: <PrivateRoute />, // Aplica proteção
        children: [
          { path: "procv", element: <PROCV /> },
          { path: "somase", element: <ValoresDivergentes /> },
        ],
      },
      {
        path: "estorno-parcial",
        element: <PrivateRoute />, // Aplica proteção
        children: [{ index: true, element: <CalculoEstornoParcial /> }],
      },
      {
        path: "cancelar-em-massa",
        element: <PrivateRoute />, // Aplica proteção
        children: [{ index: true, element: <CancelamentoMassa /> }],
      },
    ],
  },
  {
    element: <LoginPage />,
    path: "login",
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
