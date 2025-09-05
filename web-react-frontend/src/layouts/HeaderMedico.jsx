import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.svg";
import NavItemMedico from "../components/medico/NavItem";
import PhotoPaciente from "../assets/icons/paciente.svg";
import { getRoute } from "../routes/routesConfig";
import Flecha from "../assets/icons/Go-to.svg";

export default function HeaderMedico() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // cierra el dropdown si haces click fuera
  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // items fijos del menú del médico
  const medicoMenu = [
    { label: "Mi Perfil", to: "/medico/Perfil" },
    { label: "Configurar Cuenta", to: "/medico/CuentaConfig" },
    { label: "Cerrar Sesión", to: "/login" },
  ];

  return (
    <nav className="bg-white w-full h-25 shadow-xl z-50 fixed top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + Título */}
        <Link
          to={getRoute("Dashboard").path}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-16" alt="Logo" />
          <span className="self-center text-2xl text-[#62b1b1] font-semibold whitespace-nowrap leading-none">
            Medico
            <br />
            Cita Express
          </span>
        </Link>

        {/* Menú de usuario */}
        <div
          className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
          ref={menuRef}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenUserMenu((s) => !s);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <span className="sr-only">Abrir menú médico</span>
            <img
              className="w-8 h-8 rounded-full"
              src={PhotoPaciente}
              alt="medico photo"
            />
          </button>

          {/* Dropdown usuario */}
          <div
            className={`absolute right-0 top-full mt-2 z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg transform origin-top-right transition
              ${
                openUserMenu
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">Dr. Nombre</div>
              <div className="text-xs text-gray-500 truncate">
                medico@ejemplo.com
              </div>
            </div>

            <ul className="py-2">
              {medicoMenu.map((it, i) => (
                <li key={i}>
                  <Link
                    to={it.to}
                    onClick={() => setOpenUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span className="w-5 h-5 rounded-full bg-gray-300 shrink-0" />
                    <span>{it.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none"
            onClick={() => setOpenMobileMenu(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Lista navegación escritorio */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <NavItemMedico href={getRoute("Dashboard").path}>Inicio</NavItemMedico>
            <NavItemMedico href={getRoute("Agenda").path}>Agenda</NavItemMedico>
            <NavItemMedico href={getRoute("Cita").path}>Citas</NavItemMedico>
          </ul>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out
          ${openMobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header menú móvil */}
        <div className="flex items-center justify-between p-4 border-b-2 border-b-gray-200">
          <img src={Logo} className="h-15" alt="Logo" />
          <button
            onClick={() => setOpenMobileMenu(false)}
            className="p-2 rounded-md focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Opciones navegación */}
        <div className="flex flex-col p-6 px-0  space-y-6 text-xl  font-['Outfit'] font-medium uppercase ">
          <Link to={getRoute("Dashboard").path} onClick={() => setOpenMobileMenu(false)} className="flex justify-between items-center border-b-1 border-gray-200 mb-0 py-5 px-6">
            Inicio <img src={Flecha} alt="Ir a inicio" className="w-7 h-7" />
          </Link>
          <Link to={getRoute("Agenda").path} onClick={() => setOpenMobileMenu(false)} className="flex justify-between items-center border-b-1 border-gray-200   mb-0 py-5 px-6">
            Agenda <img src={Flecha} alt="Ir a Agenda" className="w-7 h-7" />
          </Link>
          <Link to={getRoute("Cita").path} onClick={() => setOpenMobileMenu(false)} className="flex justify-between items-center border-b-1 border-gray-200  mb-0 py-5 px-6">
            Citas <img src={Flecha} alt="Ir a Citas" className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
}