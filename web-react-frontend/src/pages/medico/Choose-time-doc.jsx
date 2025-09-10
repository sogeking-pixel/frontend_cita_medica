import React, { useEffect, useRef } from "react";
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
  const alreadyCalled = useRef(false);
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
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;
    if (!agendaId) {
      navigate(getRoute("Inicio").path); return;
    }
    
    const getAgendaFuntion = async () => {
      try {
        console.log(agendaId)

        const resultData = await getAgenda(agendaId);
        console.log("Respuesta getAgenda:", resultData);

        if (!resultData || !resultData.medico_especialidad)
          throw new Error("Agenda no encontrada");
        await getMedicoEspecialidad(resultData.medico_especialidad);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        navigate(getRoute("Inicio").path);
      }
    };

    getAgendaFuntion();
  }, [agendaId, navigate]);


  const capitalizedDate = formatLocalDateString(dataAgenda?.fecha);


  return (
    <div className="min-h-screen bg-gray-50 font-['Outfit']">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 mt-7 mb-15">
        <div className={`bg-white shadow-lg rounded-2xl p-6 mb-10 text-center md:text-left ${!(loadingA || loadingM) && "card-appear"
            }`}>
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
                  {dataMedicoEspecialidad?.medico?.usuario?.nombre_completo ??
                    ""}
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
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 sm:gap-15">
          {/* Perfil del doctor (1/3 del ancho en desktop, full en móvil) */}
          <div className="col-span-full md:col-span-3">
            <PerfilDoc
              doctor={dataMedicoEspecialidad?.medico ?? null}
              especialidad={dataMedicoEspecialidad?.especialidad?.nombre ?? ""}
            />
          </div>

          {/* Horarios disponibles (4/7 en desktop, full en móvil) */}
          <div
            className={`${
              !(loadingA || loadingM) && "card-appear"
            } col-span-full md:col-span-4 bg-white shadow-lg rounded-2xl`}
          >
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
