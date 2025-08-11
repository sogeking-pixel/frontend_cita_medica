import { useState, useEffect } from "react";

export default function HeroBanner({
  images = [],
  title = "Título principal",
  subtitle = "Subtítulo opcional",
  buttonText = "Acción",
  onButtonClick = () => {},
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-[70vh] flex flex-col md:flex-row overflow-hidden relative">
      {/* Columna izquierda: texto + botón */}
      <div className="w-full md:w-2/5 h-1/2 md:h-full bg-[#fbfbfb] flex flex-col justify-center items-center md:items-start text-center mx md:text-left px-6 md:px-10 z-10">
      <div className="max-w-[550px] ml-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#013030e1] mb-4">{title}</h1>
        <p className="text-xl sm:text-2xl text-black mb-6">{subtitle}</p>
        <button
          onClick={onButtonClick}
          className="px-6 py-3 bg-gradient-to-b from-[#9cb7c3ff] to-[#63a3a3ff] hover:bg-cyan-600 text-white hover:text-[#1effda]   font-bold rounded-3xl w-fit" 
        >
          {buttonText}
        </button>
      </div>
       
      </div>

      {/* Columna derecha: imágenes rotativas con animación zoom */}
      <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-8000 ease-in-out -z-10 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              zIndex: index === currentImage ? 10 : 0,
              transform: index === currentImage ? "scale(1.10)" : "scale(1)",
              transition:
                "opacity 2s ease-in-out, transform 8s ease-in-out",
            }}
          />
        ))}

        {/* Degradado sobre la imagen */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to left, transparent 45%, rgba(251, 251, 251, 0.7) 60%, #fbfbfb 95%)",
          }}
        />
      </div>
    </div>
  );
}
