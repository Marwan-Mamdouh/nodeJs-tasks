import { createBrowserRouter } from "react-router";
import RegisterForm from "./pages/registerForm";
import LoginFrom from "./pages/loginForm";
import Layout from "./components/layout";
import About from "./pages/about";
import Books from "./pages/books";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <LoginFrom /> },
      { path: "register", element: <RegisterForm /> },
      {
        path: "books",
        children: [{ index: true, element: <Books /> }],
      },
      // { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
