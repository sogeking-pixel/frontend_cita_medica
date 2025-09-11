import React from "react";
import Doctor1 from "../assets/images/Doctor1.jpg";
import Lottie from "lottie-react";
import Load from "../assets/animations/ItemLoad.json";
import Mail from "../assets/icons/Mail.svg"
import Phone from "../assets/icons/Phone.svg"


export default function PerfilDoc({ doctor, especialidad }) {
  if (!doctor) {
    return (
      <div className="bg-white rounded-2xl shadow-xl flex items-center justify-center h-140">
        <Lottie animationData={Load} style={{ height: 250 }} loop />
      </div>
    );
  }


  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto card-appear">
    
    {/* Imagen con gradiente y nombre */}
      <div className="bg-white rounded-2xl  max-w-2xl mx-auto flex flex-col sm:flex-row items-center sm:items-center gap-6 p-4 sm:p-0">
        {/* Imagen */}
        <div className="relative w-70 h-70 sm:w-52 sm:h-70 rounded-xl shadow-lg overflow-hidden flex-shrink-0">
          <img
            src={doctor.imagen ?? Doctor1}
            alt={doctor.usuario.nombre_completo}
            className="w-full h-full object-cover"
          />
          {/* Gradiente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent"></div>
          {/* Nombre sobre la imagen */}
          <div className="absolute bottom-2  w-full">
            <h2 className=" sm:text-base font-bold text-white drop-shadow text-center">
              Dr. {doctor.usuario.nombre_completo}
            </h2>
          </div>
        </div>

        {/* Info del doctor */}
        <div className="text-center sm:text-left flex-1 flex flex-col justify-center">
          <p className="text-gray-700 font-medium">
            {especialidad || "Especialidad no especificada"}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            {doctor.anios_experiencia || "10"} años de experiencia
          </p>
          
        </div>
      </div>

    

      {/* Acerca */}
      <div className="mt-6 border-t-2 border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-xl">Acerca de</h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Dr. {doctor.usuario.apellidos} Especialista con más de 10 años de experiencia en{" "}
          {especialidad || "su especialidad"}. Se dedica a brindar un cuidado personalizado y
          apoyo constante a sus pacientes durante todo su tratamiento.
        </p>
      </div>

     

      {/* Contacto */}
      <div className="mt-6 border-t-2 border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="p-3 border border-gray-300 rounded-2xl flex items-center gap-3">
          <img src={Phone} alt="Telefono" className="w-5 h-5" />
          <span className="text-gray-700 text-sm">
              {doctor.usuario.telefonos?.length > 0 
              ? doctor.usuario.telefonos[0] 
              : "Teléfono no registrado"}
          </span>
        </div>
        <div className="p-3 border border-gray-300 rounded-2xl flex items-center gap-3">
          <img src={Mail} alt="Correo" className="w-5 h-5" />
          <span className="text-gray-700 text-sm break-words overflow-hidden ">
            {doctor.usuario.email ?? "Correo no disponible"}
          </span>
        </div>
      </div>
    </div>
  );
}
