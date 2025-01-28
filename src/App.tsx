import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./features/home";
import { Procv } from "./features/divergencia/procv";

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
        element: <Procv />,
      },
      {
        path: "divergences/somase",
        element: <div>Valores Divergentes</div>,
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
