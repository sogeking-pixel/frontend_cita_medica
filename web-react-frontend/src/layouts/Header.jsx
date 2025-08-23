import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; 
import Logo from "../assets/icons/logo.svg";
import PhotoPaciente from "../assets/icons/paciente.svg";
import { getRoute } from "../routes/routesConfig";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  
  // Rutas donde se mostrará el menú de usuario
  const showUserMenuRoutes = [
    getRoute("Dashboard").path,
    getRoute("Cita").path,
    getRoute("Agenda").path,
  ];

  // Usa startsWith por si hay subrutas (/dashboard/lo-que-sea)
  const shouldShowUserMenu = showUserMenuRoutes.some(r =>
    location.pathname.startsWith(r)
  );

  // Cerrar menú si se hace click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Menú fijo de usuario
  const userMenuItems = [
    { label: "Mi Perfil", href: "/perfil" },
    { label: "Configurar Cuenta", href: "/configuracion" },
    { label: "Cerrar Sesión", href: "/logout" },
  ];

  return (
    <nav className="bg-gradient-to-t from-[#9cb7c3ff] to-[#63a3a3ff] w-full h-25 shadow-xl z-50 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + Título */}
        <Link
          to={getRoute("Dashboard").path}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-16" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white leading-none">
            Cita <br />
            Express
          </span>
        </Link>

        {/* Menú de usuario con imagen (solo en Dashboard, Cita, Agenda) */}
        {shouldShowUserMenu && (
          <div ref={menuRef} className="relative flex items-center md:order-2">
            {/* Botón Avatar */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();             // evita que el listener global lo cierre
                setIsOpen((prev) => !prev);
              }}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-400"
            >
              <span className="sr-only">Abrir menú de usuario</span>
              <img className="w-9 h-9 rounded-full" src={PhotoPaciente} alt="user photo" />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-3 z-[999] w-56 bg-white border border-gray-200 rounded-lg shadow-lg
              transition transform origin-top-right
              ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              role="menu"
            >
              <ul className="py-2">
                {userMenuItems.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {/* 🔘 Placeholder para tus SVGs */}
                      <span className="w-5 h-5 rounded-full bg-gray-300 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Lista de navegación */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link to="/" className="block py-2 px-4 text-white hover:text-[#20ebc9] text-lg">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/" className="block py-2 px-4 text-white hover:text-[#2affdbff] text-lg">
                Agendar Cita
              </Link>
            </li>
            <li>
              <Link to="/" className="block py-2 px-4 text-white hover:text-[#2affdbff] text-lg">
                ¿Quienes Somos?
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}