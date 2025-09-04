import React from "react";
import Lottie from "lottie-react";
import AnimationSec from "../assets/animations/AnimationSection1.json"
import AnimationSec2 from "../assets/animations/AnimationSection2.json"
import AnimationSec3 from "../assets/animations/AnimationSection3.json"
import AnimationSec4 from "../assets/animations/AnimationSection4.json"
import AnimationSec5 from "../assets/animations/AnimationSection5.json"
import AnimationSec6 from "../assets/animations/AnimationSection6.json"

export default function Infosection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-6 lg:px-12 py-12">

      {/* Columna izquierda - imágenes escalonadas */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 flex-1 w-full">
        {/* Columna 1 */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Primer cuadro con Lottie */}
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec} loop={true} className="w-full h-full object-contain" />
          </div>
         {/* Segundo cuadro con Lottie */}
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec2} loop={true} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Columna 2 con desplazamiento hacia abajo */}
       <div className="flex flex-col gap-4 md:gap-6 translate-y-4 md:translate-y-20">
          {/* Primer cuadro con Lottie */}
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec3} loop={true} className="w-full h-full object-contain" />
          </div>
            {/* Segundo cuadro con Lottie */}
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec4} loop={true} className="w-full h-full object-contain" />
          </div>
        </div>
        
        {/* Columna 3 con desplazamiento hacia abajo */}
        <div className="flex flex-col gap-4 md:gap-6 translate-y-8 md:translate-y-40">
             {/* Primer cuadro con Lottie */}
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec5} loop={true} className="w-full h-full object-contain" />
          </div>
          <div className="w-full h-40 sm:h-52 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Lottie animationData={AnimationSec6} loop={true} className="w-full h-full object-contain"/>
          </div>
        </div>
        
      </div>

      

      {/* Columna derecha - texto */}
      <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
        <h4 className="text-[#4db5ca] font-semibold mb-2 text-sm sm:text-base">
          Compromiso
        </h4>
         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#013030e1]  mb-4">
            Nuestros Valores
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
            En nuestra plataforma creemos que la salud debe ser accesible, segura y cercana. 
            Nos comprometemos a brindarte un servicio transparente, confiable y respaldado por 
            profesionales altamente calificados. Valoramos tu tiempo y tu bienestar, por eso hemos 
            creado un sistema de citas médicas que une tecnología moderna con una atención humana 
            y personalizada.
        </p>
        <button className="bg-[#63a3a3ff] text-white px-5 py-2 rounded-4xl hover:bg-[#4fb8f5] transition hover:text-[#d0fff7] text-sm sm:text-base">
          Conocenos
        </button>
      </div>
    </section>
  );
}
