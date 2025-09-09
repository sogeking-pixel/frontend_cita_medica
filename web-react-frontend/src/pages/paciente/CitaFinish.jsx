import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoute } from "../../routes/routesConfig";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import ValidateEmail from "../../components/ValidateEmail";
import SuccessMessage from "../../components/SuccessMessage";
import CitaDetails from "../../components/CitaDetails";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import useVerifyPaciente from "../../hooks/useVerifyPaciente";
import useNewUserCita from "../../hooks/useNewUserCita";
import AlertMessage from "../../components/AlertMessage";

function CitaFinish() {

  const [motivo, setMotivo] = useState("");
  const [correoPrimerForm, setCorreoPrimerForm] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev<3? prev + 1: prev);

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");


  //  Función reutilizable para inputs numéricos y limitar caracteres y usar solo numero
  const handleNumericInput = (setter, maxLength) => (e) => {
    const value = e.target.value;
    if (new RegExp(`^\\d{0,${maxLength}}$`).test(value)) {
      setter(value);
    }
  };


  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, especialidad, date, agenda, time } = location.state || {};

  const {
    data: pacienteData,
    verifyPaciente: verifyPaciente,
    loading: loadingP,
    error: errP,
  } = useVerifyPaciente();

  const {
    data: citaData,
    crearCita: crearCita,
    loading: loadingC,
    error: errC,
  } = useNewUserCita();

  useEffect(() => {
    if (pacienteData?.exists) {
      setDni(pacienteData.paciente.usuario.dni ?? "");
      setNombres(pacienteData.paciente.usuario.nombres ?? "");
      setApellidos(pacienteData.paciente.usuario.apellidos ?? "");
      setFechaNacimiento(pacienteData.paciente.fecha_nacimiento ?? "");
      setTelefono(pacienteData.paciente.usuario.telefonos[0].numero ?? "");
    } else {
      setDni("");
      setNombres("");
      setApellidos("");
      setFechaNacimiento("");
      setTelefono("");
    }
  }, [pacienteData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!motivo || !correoPrimerForm) return;
    try {
      await verifyPaciente(correoPrimerForm);
      nextStep();
    } catch (error) {
      setErrorVisible(true);
      setMensajeError("Error al verificar el correo");
    }
    
  };

  const handleFinalizar = async (e) => {
    e.preventDefault();
    if (!dni || !nombres || !apellidos || !fechaNacimiento || !telefono) return;

    const payload = pacienteData?.exists
      ? {
          email: correoPrimerForm,
          agenda_id: agenda.id,
          fecha_hora_establecida: new Date(`${date}T${time}:00.000Z`).toISOString(),
          motivo,
        }
      : {
          email: correoPrimerForm,
          nombres,
          apellidos,
          dni,
          fecha_nacimiento: fechaNacimiento,
          telefono,
          agenda_id: agenda.id,
          fecha_hora_establecida: new Date(`${date}T${time}:00.000Z`).toISOString(),
          motivo,
        };

    try {
      await crearCita(payload);
      nextStep();
    } catch (error) {
      setErrorVisible(true);
      console.error(error);
      setMensajeError("Error en los datos del paciente");
    }
  };

  const handleValidacionContinuar = (e) => {
    e.preventDefault();
    navigate(getRoute("Inicio").path);
  };

// arriba del return de tu componente
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// deshabilitamos desde ayer hacia adelante (máximo permitido es "antier")
const maxBirthdate = yesterday.toISOString().split("T")[0];

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center px-4 bg-[#fcfcfc] font-['Outfit']">
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-16 card-appear">
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-3">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                3
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Registrar Cita
              </h2>
            </div>
            {errP && (
              <AlertMessage
                type="danger"
                title="Error"
                show={errorVisible}
                onClose={() => setErrorVisible(false)}
              >
                {mensajeError}
              </AlertMessage>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Motivo */}
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
                {loadingP ? (
                  <div className="flex items-center space-x-2 justify-center">
                    <span className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></span>
                    <span>Verificando...</span>
                  </div>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-4xl mt-8 mb-8 flex flex-col md:flex-row gap-6">
            {/* 2 Formulario */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 px-8 card-appear">
              <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
                <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9 font-bold">
                  4
                </div>
                <h2 className="text-2xl font-semibold text-[#62abaa]">
                  Información Personal
                </h2>
              </div>

              {errC && (
                <AlertMessage
                  type="danger"
                  title="Error"
                  show={errorVisible}
                  onClose={() => setErrorVisible(false)}
                >
                  {mensajeError}
                </AlertMessage>
              )}

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
                  inputMode="numeric"
                  maxLength={8}
                  onChange={handleNumericInput(setDni, 8)} //  solo 8 dígitos como max
                  required
                  disabled={pacienteData?.exists || loadingC}
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
                      disabled={pacienteData?.exists || loadingC} //  Se bloquea en proceso al enviar form
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
                      disabled={pacienteData?.exists || loadingC} //  Se bloquea en proceso al enviar form
                    />
                  </div>
                </div>

                <InputForm
                  label="Fecha de nacimiento"
                  id="fechaNacimiento"
                  type={pacienteData?.exists ? "text" : "date"}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  disabled={pacienteData?.exists || loadingC} // Se bloquea en proceso al enviar form
                  max={maxBirthdate} //  deshabilita hoy y ayer automáticamente
                  min="1900-01-01"
                />

                <InputForm
                  label="Número de contacto"
                  id="telefono"
                  type="text"
                  placeholder="Ej: 987654321"
                  value={telefono}
                  onChange={handleNumericInput(setTelefono, 9)} // solo 9 dígitos como max
                  inputMode="numeric"
                  maxLength={9}
                  required
                  disabled={pacienteData?.exists || loadingC}
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
                  disabled={loadingC} //  se dehabilita el boton para no volver a reenviar
                >
                  {loadingC ? (
                    <div className="flex items-center space-x-2 justify-center">
                      <span className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></span>
                      <span>Creando Cita...</span>
                    </div>
                  ) : (
                    "Agendar"
                  )}
                </Button>
              </form>
            </div>

            {/* Resumen */}
            <div className="md:w-auto">
              <CitaDetails
                doctor={doctor}
                specialty={especialidad.nombre ?? null}
                date={date}
                time={time}
              />
            </div>
          </div>
        )}
        {/* ADDED HANDLER FOR ERROR WHEN BACKEND IS DESCONECT */}
        {step === 3 &&
          (citaData?.verificate ? (
            <SuccessMessage
              onClose={handleValidacionContinuar}
              message={
                <>
                  Su cita se separó correctamente. Se le envió un correo a{" "}
                  <strong>{correoPrimerForm}</strong> con el resumen de la cita.
                </>
              }
              title="Cita registrada con éxito"
              buttonText="Volver al inicio"
              className={"mt-18"}
            />
          ) : (
            <ValidateEmail
              onContinue={handleValidacionContinuar}
              message={
                "Este usuario todavía no se encuentra registrado, se le enviará un correo para validar su identidad y confirmar su cita."
              }
              title={"Verificando Correo!"}
              buttonContent={"Volver al inicio"}
              className={"mt-18"}
            />
          ))}
      </div>
      <Footer />
    </>
  );
}

export default CitaFinish;
