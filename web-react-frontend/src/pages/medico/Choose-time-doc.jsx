import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Timetable from "../../components/Timetable";
import PerfilDoc from "../../components/PerfilDoc";
import Footer from "../../layouts/Footer";
import { getRoute } from "../../routes/routesConfig";
import useGetAgenda from "../../hooks/useAgenda";
import useGetMedicoEspecialidad from "../../hooks/useMedicoEspecialidad";
import { formatLocalDateString } from "../../utils/formtDateToString"
import Lottie from "lottie-react";
import Load from "../../assets/animations/Loading2.json";
import Loader from "../../assets/animations/ItemLoad.json";


export default function ChooseTimeDoc() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const agendaId = searchParams.get("agenda");

  const {
    data: dataAgenda,
    getAgenda,
    loading: loadingA,
    error: errorA,
  } = useGetAgenda();
  
  const {
    data: dataMedicoEspecialidad,
    getMedicoEspecialidad,
    loading: loadingM,
    error: errorM,
  } = useGetMedicoEspecialidad();


  useEffect(() => {
    if (agendaId) {
      getAgenda(agendaId).catch((err) => {
        console.error("Error al obtener la agenda, redirigiendo:", err);
        navigate(getRoute("Inicio").path);
      });
    } else {
      navigate(getRoute("Inicio").path);
    }
  }, [agendaId, getAgenda, navigate]);


  useEffect(() => {

    if (dataAgenda?.medico_especialidad) {
      getMedicoEspecialidad(dataAgenda.medico_especialidad).catch((err) => {
        console.error("Error al obtener el médico/especialidad:", err);
      });
    }
  }, [dataAgenda, getMedicoEspecialidad]);


  const capitalizedDate = formatLocalDateString(dataAgenda?.fecha);


  return (
    <div className="min-h-screen bg-gray-50 font-['Outfit']">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 mt-7 mb-15">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 text-center md:text-left card-appear">
          {loadingA || loadingM ? (
            // Loader centrado dentro del box "Contenido principal"
            <div className="flex items-center justify-center max-h-[80px]">
              <Lottie animationData={Load} style={{ height: 120 }} loop />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2 text-gray-600">
                Selecciona un horario con{" "}
                <span className="text-[#3e7c88]">
                  {dataMedicoEspecialidad?.medico?.usuario?.nombre_completo ?? ""}
                </span>
              </h1>

              <p className="text-gray-600 mb-1">
                Fecha seleccionada:{" "}
                <span className="font-medium">{capitalizedDate ?? ""}</span>
              </p>
            </>
          )}
        </div>

        {/* Sección con PerfilDoc (izquierda) y Timetable (derecha) */}
        <div className="grid grid-cols-1 md:grid-cols-7 sm:gap-15">
          {/* Perfil del doctor (1/3 del ancho) */}
          <div className="col-span-3">
            <PerfilDoc
              doctor={dataMedicoEspecialidad?.medico ?? null}
              especialidad={dataMedicoEspecialidad?.especialidad?.nombre ?? ""}
            />
          </div>

          {/* Horarios disponibles */}
          <div className="card-appear col-span-4 bg-white shadow-lg rounded-2xl">
            <div className="py-6 text-center shadow-md mb-5">
              <h2 className="text-xl font-medium text-gray-600">
                Horarios Disponibles
              </h2>
            </div>

            {loadingA || loadingM ? (
              <div className="flex justify-center items-center py-16">
                <Lottie animationData={Loader} style={{ height: 400 }} loop />
              </div>
            ) : dataAgenda ? (
              <Timetable
                doctor={dataMedicoEspecialidad?.medico ?? null}
                especialidad={dataMedicoEspecialidad?.especialidad ?? null}
                agenda={dataAgenda}
              />
            ) : (
              <div className="text-center p-10">
                No se pudo cargar la agenda.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
