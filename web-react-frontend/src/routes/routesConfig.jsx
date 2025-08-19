import Home from "../pages/free/Home";
import Login from "../pages/medico/Login";
import Dashboard from "../pages/medico/Dashboard";
import ConfirmarCorreo from "../pages/auth/ConfirmarCorreo";
import Register from "../pages/medico/Register";
import ForgetPassword from "../pages/auth/ForgetPassword";
import CreateNewPassword from "../pages/auth/CreateNewPassword";
import CitaFinish from "../pages/paciente/CitaFinish";
import AccessDenied from "../pages/errors/AccessDenied";
import Agenda from "../pages/medico/Agenda";
import Cita from "../pages/medico/Cita";

export const freeRoutes = [
  {
    name: "Inicio",
    path: "/",
    element: <Home />,
  },

  {
    name: "CitaFinish",
    path: "/Citafinish",
    element: <CitaFinish />,
  },
  {
    name: "denegado",
    path: "/denegado",
    element: <AccessDenied />,
  },
];

export const publicRoutes = [
  {
    name: "Confirmar Correo",
    path: "/confirmar-correo",
    element: <ConfirmarCorreo />,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register />,
  },
  {
    name: "Forget Password",
    path: "/forgetpassword",
    element: <ForgetPassword />,
  },
  {
    name: "Create New Password",
    path: "/forgetpassword",
    element: <CreateNewPassword />,
  },
 
];

export const protectedRoutes = [
  {
    name: "Dashboard",
    path: "/medico/",
    element: <Dashboard />,
    roles: ["Medicos"],
  },
  {
    name: "Agenda",
    path: "/medico/agenda",
    element: <Agenda />,
    roles: ["Medicos"],
  },
  {
    name: "Cita",
    path: "/medico/cita",
    element: <Cita />,
    roles: ["Medicos"],
  },
];

export function getRoute(name) {
  const allRoutes = [...freeRoutes, ...publicRoutes, ...protectedRoutes];
  const route = allRoutes.find((r) => r.name === name);
  return route ? route : null;
}
