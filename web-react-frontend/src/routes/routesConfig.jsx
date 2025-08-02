import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ConfirmarCorreo from "../pages/ConfirmarCorreo";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import CreateNewPassword from "../pages/CreateNewPassword";



export const freeRoutes = [
  {
    name: "Inicio",
    path: "/",
    element: <Home />,
  },
];


export const publicRoutes = [
  {
    name: "Confirmar Correo",
    path: "/confirmar-correo",
    element: <ConfirmarCorreo/>,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register/>,
  },
  {
    name: "Forget Password",
    path: "/forgetpassword",
    element: <ForgetPassword/>,
    },
    {
        name: "Create New Password",
        path: "/forgetpassword",
        element: <CreateNewPassword/>,
    },
];


export const protectedRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard-medico",
    element: <Dashboard/>,
  },
];

export function getRoute(name) {
  const allRoutes = [...freeRoutes,...publicRoutes, ...protectedRoutes];
  const route = allRoutes.find((r) => r.name === name);
  return route ? route : null;
}

