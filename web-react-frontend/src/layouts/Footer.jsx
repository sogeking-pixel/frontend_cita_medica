import React from "react";
import Logo from "../assets/Logo.svg"
import facebook from "../assets/facebook-Icon.svg"
import twitter from "../assets/twitterx.svg"
import instagram from "../assets/instagram.svg"


export default function Footer() {
  return (

    <footer className="bg-gradient-to-b from-[#778e97] to-[#306466] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo y descripción */}
        <div className="flex flex-col items-start ">
          {/* Aquí logo */}
          <div className="mb-4 flex space-x-3  ">
            <img src={Logo} className="h-16 " alt="Logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white leading-none">
            Cita 
            <br />
            Express
          </span>
          </div>
        </div>
        

        {/* Contacto */}
        <div>
          <h3 className="font-bold mb-3 text-xl text-[#2affdbff]">CONTACTO</h3>
          <p>
            <strong className="font-medium">UBICANOS:</strong> <br />
            Calle. Juan Pablo de Piérola 622
          </p>
          <p className="mt-2">
            <strong className="font-medium">CELULAR:</strong> <br />
            958753455
          </p>
          <p className="mt-2">
            <strong className="font-medium">EMAIL:</strong> <br />
            info@citaExpress.com.pe
          </p>

          {/* Íconos sociales */}
          <div className="flex gap-3 mt-4">
            {/* Cada ícono en un círculo */}
            <div className=" flex items-center justify-center  rounded-full">
              <img src={facebook} alt="Facebook" className="w-8 h-8" />
            </div>
            <div className=" flex items-center justify-center rounded-full">
                <img src={twitter} alt="Twitter" className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-center rounded-full">
              <img src={instagram} alt="Instagram" className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Servicios médicos */}
        <div>
          <h3 className="font-bold mb-3 text-xl text-[#2affdbff]">SERVICIOS MÉDICOS</h3>
          <ul className="space-y-1">
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Especialidades</li>
            <li>Laboratorio</li>
          </ul>
        </div>

        {/* Horario */}
        <div>
          <h3 className="font-bold mb-3 text-xl text-[#2affdbff]">HORARIO DE ATENCIÓN</h3>
          <ul className="space-y-2">
            <li>Lunes a sábado 7:00 am a 8:00 pm</li>
            <li>Domingos 8:00 am a 1:00 pm</li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="container mx-auto mt-10 text-center text-sm border-t-3 border-white/30">
        <div className=" px-6 text-center  ">
            Cita Express. © 2025. Todos los derechos Reservados
        </div>
      </div>
    </footer>
  );
}
