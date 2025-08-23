import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../../routes/routesConfig";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import ValidateEmail from "../../components/ValidateEmail";
import CitaDetails from "../../components/CitaDetails";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import useVerifyPaciente from "../../hooks/useVerifyPaciente";

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
  const location = useLocation();
  const { doctor, specialty, date, time } = location.state || {};

  const {
    data: pacienteData,
    loading: loadingP,
    error: errP,
    refetch: refetchVerifyPaciente,
  } = useVerifyPaciente({ autoFetch: false });

  // --- Cuando recibimos datos del paciente ---
  useEffect(() => {
    if (pacienteData?.exists) {
      // Rellenar con los datos del backend (enmascarados o no)
      setDni(pacienteData.paciente.usuario.dni ?? "");
      setNombres(pacienteData.paciente.usuario.nombres ?? "");
      setApellidos(pacienteData.paciente.usuario.apellidos ?? "");
      setFechaNacimiento(pacienteData.paciente.fecha_nacimiento ?? "");
      setTelefono(pacienteData.paciente.usuario.apellidos ?? "");
    } else {
      // Si no existe, limpiar campos para que el user los llene
      setDni("");
      setNombres("");
      setApellidos("");
      setFechaNacimiento("");
      setTelefono("");
    }
  }, [pacienteData]);

  // ---- Manejo del 1er formulario ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!motivo || !correoPrimerForm) return;

    try {
      await refetchVerifyPaciente({ email: correoPrimerForm });
      setMostrarPersonalForm(true);
    } catch (err) {
      console.error("Error verificando paciente", err);
    }
  };

  // ---- Manejo del 2do formulario ----
  const handleFinalizar = () => {
    console.log({
      motivo,
      correoPrimerForm,
      dni,
      nombres,
      apellidos,
      fechaNacimiento,
      telefono,
    });

    setMostrarValidacion(true);
  };

  // ---- Validación final ----
  const handleValidacionContinuar = () => {
    navigate(getRoute("Inicio").path);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center px-4 bg-[#fcfcfc] font-['Outfit']">
        {mostrarValidacion ? (
          <ValidateEmail onContinue={handleValidacionContinuar} />
        ) : !mostrarPersonalForm ? (
          // PRIMER FORMULARIO
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-8">
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Registrar Cita
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Motivo */}
              <div>
                <label className="block text-gray-700 text-base font-medium mb-3">
                  Motivo de la cita
                </label>
                <textarea
                  name="motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  maxLength={180}
                  rows={7}
                  className="rounded-xl px-4 py-2 w-full bg-zinc-100 shadow-lg text-sm text-gray-700 resize-none"
                  placeholder="Escribe el motivo de tu cita aquí..."
                />
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

              {/* Correo */}
              <InputForm
                label="Correo electrónico"
                id="correo1"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={correoPrimerForm}
                onChange={(e) => setCorreoPrimerForm(e.target.value)}
              />

              <Button type="submit" className="w-full mt-4">
                {loadingP ? "Verificando..." : "Continuar"}
              </Button>
            </form>
          </div>
        ) : (
          // SEGUNDO FORMULARIO + RESUMEN
          <div className="w-full max-w-4xl mt-8 mb-8 flex flex-col md:flex-row gap-6">
            {/* Formulario */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 px-8">
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
                  label="Correo electrónico"
                  id="correo2"
                  type="email"
                  value={correoPrimerForm}
                  readOnly
                  disabled
                />

                <InputForm
                  label="DNI"
                  id="dni"
                  type="text"
                  placeholder="Ingrese DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  pattern="\d{8}"
                  required
                  disabled={pacienteData?.exists}
                />

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <InputForm
                      className="text-sm"
                      label="Nombres"
                      name="nombres"
                      id="nombres"
                      type="text"
                      placeholder="Escribe tus nombres"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      disabled={pacienteData?.exists}
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
                      disabled={pacienteData?.exists}
                    />
                  </div>
                </div>

                <InputForm
                  label="Fecha de nacimiento"
                  id="fechaNacimiento"
                  type={pacienteData?.exists ? "text" : "date"}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  disabled={pacienteData?.exists}
                />

                <InputForm
                  label="Número de contacto"
                  id="telefono"
                  type="tel"
                  placeholder="Ej: 987654321"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={pacienteData?.exists}
                />

                <p className="text-sm text-gray-700">
                  Al realizar tu primera reserva, crearemos una cuenta para ti
                  automáticamente.
                </p>

                <label className="flex items-start space-x-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" required className="mt-1 h-4 w-4" />
                  <span>
                    Al reservar una cita, aceptas nuestros{" "}
                    <a href="#" className="text-[#62abaa] hover:underline">
                      términos y condiciones
                    </a>
                    .
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

            {/* Resumen */}
            <div className="md:w-auto">
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
