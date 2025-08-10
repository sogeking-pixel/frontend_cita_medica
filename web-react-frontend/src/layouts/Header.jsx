import Logo from "../assets/logo.svg";
import NavItem from "../components/NavItem";
import NavItemSm from "../components/NavItemSm";
import PhotoPaciente from "../assets/paciente.svg";
import { getRoute } from "../routes/routesConfig";

export default function Header() {
  return (
     <nav className="bg-gradient-to-t from-[#9cb7c3ff] to-[#63a3a3ff] w-full h-25 shadow-xl z-50 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo + Título */}
        <a
          href={getRoute("Dashboard").path}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-16 " alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white leading-none">
            Cita 
            <br />
            Express
          </span>
        </a>

        {/* Menú de usuario con imagen */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm ring-2 ring-gray-300 rounded-full md:me-0 focus:ring-2 focus:ring-gray-400"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={PhotoPaciente}
              alt="user photo"
            />
          </button>

          {/* Dropdown */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <NavItemSm href={getRoute("Dashboard").path} children="Inicio" />
              <NavItemSm href={getRoute("Dashboard").path} children="Historial Médico" />
              <NavItemSm href={getRoute("Dashboard").path} children="Agendar Cita" />
            </ul>
          </div>

          {/* Botón hamburguesa (responsive) */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Lista de navegación */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
            <a
      href="/"
      className="block py-2 px-4 text-white hover:text-[#2affdbff] text-lg hover:bg-transparent"
    >
      Inicio
    </a>
  </li>
  <li>
    <a
      href="/"
      className="block py-2 px-4 text-white hover:text-[#2affdbff] text-lg  hover:bg-transparent"
    >
      Historial Médico
    </a>
  </li>
  <li>
    <a
      href="/"
      className="block py-2 px-4 text-white hover:text-[#2affdbff] text-lg hover:bg-transparent"
    >
      Agendar Cita
    </a>
  </li>
</ul>
        </div>
      </div>
    </nav>
  );
}

