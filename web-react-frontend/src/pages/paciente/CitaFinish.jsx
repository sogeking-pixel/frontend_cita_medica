import React, { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom"; //hice cambios aca
import { getRoute } from "../../routes/routesConfig";
import InputForm from "../../components/InputForm"; 
import Button from "../../components/Button";
import ValidateEmail from "../../components/ValidateEmail";
import CitaDetails from "../../components/CitaDetails";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";



function CitaFinish() {
  const [motivo, setMotivo] = useState("");
  const [correoPrimerForm, setCorreoPrimerForm] = useState("");
  const [mostrarValidacion, setMostrarValidacion] = useState(false); 
  const [mostrarPersonalForm, setMostrarPersonalForm] = useState(false);

  // Estados para segundo formulario
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");

  const navigate = useNavigate();

  //  leer los datos enviados desde DoctorList.jsx
  const location = useLocation(); // ⬅ nuevo
  const { doctor, specialty, date, time } = location.state || {}; // ⬅ nuevo

   // ---- Manejo del 1er formulario ----
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo || !correoPrimerForm) return;
    setMostrarPersonalForm(true);
  };

  // ---- Manejo del 2do formulario ----
  const handleFinalizar = () => {
    // Aquí podrías llamar a tu API para crear la cita antes de validar
    console.log({
      motivo,
      correoPrimerForm,
      dni,
      nombres,
      apellidos,
      fechaNacimiento,
      telefono
    });

    // Mostrar la pantalla de validación en vez de ir directo al inicio
    setMostrarValidacion(true);
  };

  // ---- Cuando el usuario confirma validación ----
  const handleValidacionContinuar = () => {
    navigate(getRoute("Inicio").path);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col items-center px-4 bg-[#fcfcfc] font-['Outfit']">
        {mostrarValidacion ? (
           // Pantalla de validación al final del flujo
          <ValidateEmail onContinue={handleValidacionContinuar} />
         ) : !mostrarPersonalForm ? (
          // PRIMER FORMULARIO
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-8">
            {/* Cabecera */}
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Finalizar Cita
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Motivo de la cita */}
              <div>
                <label className="block text-gray-700 text-base font-medium mb-3">
                  Motivo de la cita
                </label>

                <div className="relative">
                  <textarea
                    name="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    maxLength={180}
                    rows={7}
                    className="rounded-xl px-4 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-teal-400 bg-zinc-100 shadow-lg text-sm text-gray-700 resize-none"
                    placeholder="Escribe el motivo de tu cita aquí..."
                  ></textarea>

                  {/* Contador de caracteres restantes */}
                  <div className="absolute bottom-2 right-4 text-[10px] text-gray-500">
                      {180 - motivo.length} caracteres restantes
                  </div>
                </div>

                <div className="text-center mt-2">
                    <button
                      type="button"
                      onClick={() => setMotivo("Quiero una revisión general")}
                      className="mt-2 text-cyan-500 underline text-sm"
                    >
                      Quiero una revisión general
                    </button>
                </div>
              </div>

              {/* Correo electrónico */}
              <InputForm
              className="text-gray-700"
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
        ) : mostrarValidacion ? (
          // PANTALLA DE VALIDACIÓN
          <ValidateEmail  onContinue={handleValidacionContinuar} />
        ) : (
          // SEGUNDO FORMULARIO + RESUMEN (derecha)
          <div className="w-full max-w-4xl mt-8 mb-8 flex flex-col md:flex-row gap-6">
             {/* Columna izquierda: formulario */}
            <div className="order-2 md:order-1 flex-1 bg-white rounded-2xl shadow-lg p-5 px-8">
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
                className="bg-gray-100 text-gray-700  cursor-not-allowed text-sm"
                label="Correo electrónico"
                id="correo2"
                name="correo2"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={correoPrimerForm}
                readOnly
                disabled
              />
              
              <InputForm
                label="DNI"
                id="dni"
                name="dni"
                type="text"
                placeholder="Ingrese DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                pattern="\d{8}"
                required
                className="text-sm"
              />

            <div className="flex gap-4">
              <div className="w-1/2">
                <InputForm
                  className="text-sm"
                  label="Nombres"
                  id="nombres"
                  name="nombres"
                  type="text"
                  placeholder="Escribe tus nombres"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  />
              </div>

              <div className="w-1/2">
                <InputForm
                  className="text-sm"
                  label="Apellidos"
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  placeholder="Escribe tus apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
                </div>
            </div>

              <InputForm
                className="text-sm"
                label="Fecha de nacimiento"
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
              
              <InputForm
                className="text-sm"
                label="Número de contacto"
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Ej: 987654321"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

 {/* Párrafo nuevo */}
              <p className="text-sm text-gray-700">
                Al realizar tu primera reserva, crearemos una cuenta para ti automáticamente.
              </p>

              {/* Checkbox de términos */}
              <label className="flex items-start space-x-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#62abaa] focus:ring-[#62abaa]"
                />
                <span>
                  Al reservar una cita, aceptas nuestros{" "}
                  <a href="#" className="text-[#62abaa] hover:underline">
                    términos y condiciones
                  </a>.
                </span>
              </label>

              <Button 
                type="button" 
                className="w-full mt-4"
                onClick={handleFinalizar}
              >
                Agendar
              </Button>
            </form>
            </div>
        
        {/* Columna derecha: resumen de la cita */}
            <div className="order-1 md:order-2 w-full md:flex-none md:w-auto bg-transparent rounded-lg p-0">
              <CitaDetails 
              doctor={doctor}
              specialty={specialty}
              date={date}
              time={time}
              />
            </div>
          </div>
    )}  
      </div>
      
      <Footer />
    </>
  );
}

export default CitaFinish;