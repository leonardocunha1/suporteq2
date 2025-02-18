import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./features/home";
import { ValoresDivergentes } from "./features/divergencia/valores";
import { TransacoesDivergentes } from "./features/divergencia/transacoes";

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
        element: <TransacoesDivergentes />,
      },
      {
        path: "divergences/somase",
        element: <ValoresDivergentes />,
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
