import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../routes/routesConfig";
import InputForm from "../components/InputForm"; 
import Button from "../components/Button";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";


function CitaFinish() {
  const [motivo, setMotivo] = useState("");
  const [correoPrimerForm, setCorreoPrimerForm] = useState("");
  const [correoSegundoForm, setCorreoSegundoForm] = useState("");
  const [mostrarPersonalForm, setMostrarPersonalForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo || !correoPrimerForm) return;
    setMostrarPersonalForm(true);
  };

  const handleFinalizar = () => {
    // Aquí puedes manejar el envío final de la cita
    console.log({
      motivo,
      correoPrimerForm,
      correoSegundoForm
    });
    // Ejemplo: navegar a otra página
    // navigate("/confirmacion");
     navigate(getRoute("Inicio").path);
  };


  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col items-center px-4 bg-[#fcfcfc] font-['Outfit']">
        {!mostrarPersonalForm ? (
          // PRIMER FORMULARIO
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-8">
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Finalizar Cita
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-base font-medium mb-3">
                  Motivo de la cita
                </label>
                <textarea
                  name="motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  maxLength={180}
                  rows={4}
                  className="rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 bg-zinc-100 shadow-lg resize-none"
                  placeholder="Escribe el motivo de tu cita aquí..."
                ></textarea>

                <button
                  type="button"
                  onClick={() => setMotivo("Quiero una revisión general")}
                  className="mt-2 text-cyan-500 underline"
                >
                  Quiero una revisión general
                </button>
              </div>

              <InputForm
                label="Correo electrónico"
                id="correo1"
                name="correo1"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={correoPrimerForm}
                onChange={(e) => setCorreoPrimerForm(e.target.value)}
              />

              <Button type="submit" className="w-full mt-4">
                Continuar
              </Button>
            </form>
          </div>
        ) : (
          // SEGUNDO FORMULARIO
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 mt-8">
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                4
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Información Personal
              </h2>
            </div>

            <form className="space-y-6">
              <InputForm
                label="Nombres"
                id="nombres"
                name="nombres"
                type="text"
                placeholder="Escribe tus nombres"
              />

              <InputForm
                label="Apellidos"
                id="apellidos"
                name="apellidos"
                type="text"
                placeholder="Escribe tus apellidos"
              />

              <InputForm
                label="DNI"
                id="dni"
                name="dni"
                type="text"
                placeholder="Ingrese DNI"
                pattern="\d{8}"
                required
              />

              <InputForm
                label="Fecha de nacimiento"
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
              />

              <InputForm
                label="Número de contacto"
                id="telefono"
                name="telefono"
                type="text"
                placeholder="Ej: 987654321"
              />

              <InputForm
                label="Correo electrónico"
                id="correo2"
                name="correo2"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={correoSegundoForm}
                onChange={(e) => setCorreoSegundoForm(e.target.value)}
              />

              <p className="text-sm text-gray-500">
                Al reservar una cita, aceptas nuestros términos y condiciones...
              </p>

              <Button 
                type="button" 
                className="w-full mt-4"
                onClick={handleFinalizar}
              >
                Finalizar
              </Button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CitaFinish;