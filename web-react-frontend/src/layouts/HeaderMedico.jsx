import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import NavItemMedico from "../components/medico/NavItem";
import PhotoPaciente from "../assets/icons/paciente.svg";
import { getRoute } from "../routes/routesConfig";

export default function HeaderMedico() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // cierra el dropdown si haces click fuera
  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // items fijos del menú del médico
  const medicoMenu = [
    { label: "Mi Perfil", to: "/perfil" },
    { label: "Configurar Cuenta", to: "/configuracion" },
    { label: "Cerrar Sesión", to: "/logout" },
  ];

  return (
    <nav className="bg-white w-full h-25 shadow-xl z-50 fixed top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + Título (usa Link para SPA navigation) */}
        <Link
          to={getRoute("Dashboard").path}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-16" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap leading-none">
            Medico
            <br />
            Cita Express
          </span>
        </Link>

        {/* Menú de usuario (avatar + dropdown) */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation(); // evitar que el listener global cierre inmediatamente
              setOpen((s) => !s);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <span className="sr-only">Abrir menú médico</span>
            <img className="w-8 h-8 rounded-full" src={PhotoPaciente} alt="medico photo" />
          </button>

          {/* Dropdown: se renderiza / anima según `open` */}
          <div
            className={`absolute right-0 top-full mt-2 z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg transform origin-top-right transition
              ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
            role="menu"
            aria-hidden={!open}
          >
            {/* opcional: cabecera */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">Dr. Nombre</div>
              <div className="text-xs text-gray-500 truncate">medico@ejemplo.com</div>
            </div>

            <ul className="py-2">
              {medicoMenu.map((it, i) => (
                <li key={i}>
                  <Link
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    role="menuitem"
                  >
                    {/* círculo placeholder para ícono (reemplaza por tu SVG) */}
                    <span className="w-5 h-5 rounded-full bg-gray-300 shrink-0" />
                    <span>{it.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón hamburguesa (responsive) */}
          <button
            data-collapse-toggle="navbar-medico"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-medico"
            aria-expanded="false"
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Lista de navegación */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-medico">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <NavItemMedico href={getRoute("Dashboard").path}>Inicio</NavItemMedico>
            <NavItemMedico href={getRoute("Agenda").path}>Agenda</NavItemMedico>
            <NavItemMedico href={getRoute("Cita").path}>Citas</NavItemMedico>
          </ul>
        </div>
      </div>
    </nav>
  );
}
