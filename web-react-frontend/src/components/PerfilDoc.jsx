import React from "react";
import Button from "../components/Button";
import  Check from "../assets/icons/Check.svg"




export default function PerfilDoc({ doctor }) {

   if (!doctor){
     return <div>No hay datos del doctor</div>;
   } // seguridad por si no llega la prop

  return (
 <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col ">
      {/* Imagen con overlay */}
      <div className="relative">
        {/* Imagen del doctor  */}
        <div className="w-full  flex items-center justify-center text-gray-500 text-sm ">
         {doctor.foto ? (
            <img
              src={doctor.foto}
              alt={doctor.nombre}
              className="w-full h-48 object-cover "
            />
          ) : (
            "Imagen"
          )}
        </div>

        {/* Overlay con nombre y especialidad */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-700/70 to-transparent px-4 py-2 ">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white ">
            {doctor.nombre}
          </h2>
          <p className="text-gray-200 text-sm">{doctor.especialidad || "Especialidad no especificada"}</p>
          </div>
        </div>
      </div>

      {/* Información / lista */}
      <div className="p-4 flex-1 bg">
        <ul className="space-y-5 text-gray-700 text-lg ">
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8 mt-1" />
            <span>Médico Cirujano con formación universitaria completa</span>
          </li>
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8  mt-1" />
            <span>Especialista en Gastroenterología con estudios de postgrado</span>
          </li>
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8  mt-1" />
            <span>Entrenamiento en endoscopía diagnóstica y terapéutica</span>
          </li>
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8  mt-1" />
            <span>Certificación en colocación de balón intragástrico</span>
          </li>
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8  mt-1" />
            <span>Diplomado internacional en Microbiota y Disbiosis Intestinal</span>
          </li>
          <li className="flex items-start gap-2">
            <img src={Check} alt="check icon" className="w-8 h-8  mt-1" />
            <span>Más de 10 años de experiencia en el manejo integral de enfermedades digestivas</span>
          </li>
        </ul>
      </div>

      {/* Botón centrado */}
      <div className="p-3 mflex justify-center">
        <button className="w-full border-2 border-[#3e7c88] text-[#3e7c88] py-1 rounded-xl hover:bg-[#3e7c88] hover:text-white hover:rounded-4xl transition-all duration-600">
          Ver detalles
        </button>
      </div>
  </div>
  );
}
