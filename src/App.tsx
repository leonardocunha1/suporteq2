import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./features/home";


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
        path: "divergences",
        element: <div>Divergences</div>,
      }
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
