import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./components/home";
import { CalculoEstornoParcial } from "./features/calculo-estorno-parcial";
import { ValoresDivergentes } from "./features/utilitarios/valores";
import { PROCV } from "./features/utilitarios/procv";
import { CancelamentoMassa } from "./features/cancelamento-massa";

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
        element: <Home />,
      },
      {
        path: "divergences/procv",
        element: <PROCV />,
      },
      {
        path: "divergences/somase",
        element: <ValoresDivergentes />,
      },
      {
        path: "estorno-parcial",
        element: <CalculoEstornoParcial />,
      },
      {
        path: "cancelar-em-massa",
        element: <CancelamentoMassa />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
