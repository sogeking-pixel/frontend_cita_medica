import React, { useState, useRef } from "react";
import HeaderMedico from "../../layouts/HeaderMedico";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";


export default function Perfil() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const [nombres, setNombres] = useState("Juan Emilio");
    const [apellidos, setApellidos] = useState("Perez Tocto");
    const [celular, setCelular] = useState("948945821");

  // Manejar subida de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleClick = () => {
    fileInputRef.current.click(); // dispara el explorador
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] ">
      {/* Header */}
      <HeaderMedico />

      {/* Contenido */}
      <main className="flex-1 flex justify-center px-4 md:px-8 mt-28">
        <div className="w-full max-w-2xl mb-12 flex flex-col gap-6 ">
          {/* Columna única como card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 px-8 mt-9 font-['Outfit']">
            {/* Título con numeración */}
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-10 font-bold">
                P
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Mi Perfil
              </h2>
            </div>
            
            {/* Círculo Foto Perfil*/}
            <div className="flex justify-center mb-3">
              <div className="w-60 h-60 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Sin foto</span>
                )}
              </div>
            </div>

            {/* Botón file centrado debajo de la foto */}
            <div className="flex justify-center">
                {/* Input oculto */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {/* Botón que abre el input */}
              <Button
                type="button"
                onClick={handleClick}
                className="rounded-2xl bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 transition text-xs font-medium"
              >
                Editar Foto
              </Button>
            </div>
        

            {/* Formulario */}
            <form className="space-y-6 mt-10">
            
              <div className="flex gap-4">
                <div className="w-1/2">
                  <InputForm
                    label="Nombres"
                    id="nombres"
                    name="nombres"
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    className="text-sm bg-gray-100"
                   
                  />
                </div>
                <div className="w-1/2">
                  <InputForm
                    label="Apellidos"
                    id="Apellidos"
                    name="Apellidos"
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className="text-sm bg-gray-100"
                   
                  />
                </div>
              </div>

              <InputForm
                label="Nro° de Celular"
                id="Celular"
                name="Celular"
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="text-sm"
              />




              {/* Botón de guardar */}
              <Button type="submit" className="w-full mt-4">
                Guardar cambios
              </Button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}