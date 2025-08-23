import { useState, useEffect } from "react";
import { useRef } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import HeroBanner from "../../components/HeroBanner";
import InfoCards from "../../components/InfoCards";
import DoctorList from "../../components/DoctorList";
import CitaForm from "../../components/CitaForm";
import banner1 from "../../assets/images/banners/Home-Banner-1.png";
import banner2 from "../../assets/images/banners/Home-Banner-2.png";
import banner3 from "../../assets/images/banners/Home-Banner-3.png";
import useGetEspecialidades from "../../hooks/useEspecialidad";
import useGetEspecialidadAgenda from "../../hooks/useEspecialidadAgendas";
import getAgendaSlot from "../../hooks/useAgendaSlot";

const images = [banner1, banner2, banner3,];

export default function Home() {
  const CitaFormRef = useRef(null);
  const [doctoresDisponibles, setDoctoresDisponibles] = useState([]);

  const {
    data: especialidades,
    loading: loadingE,
    error: errE,
    refetch: refetchEspecialidades,
  } = useGetEspecialidades();

  const {
    data: especialidadAgendaData,
    loading: loadingEA,
    error: errEA,
    refetch: refetchEspecialidadAgenda,
  } = useGetEspecialidadAgenda({ autoFetch: false });

   const {
     data: especialidadSlot,
     loading: loadingS,
     error: errS,
     refetch: refetchSlot,
   } = getAgendaSlot({ autoFetch: false });

  // Esta función será llamada por CitaForm cuando se pulse "Buscar"
  const handleSearch = async (formData) => {
    console.log("handleSearch recibido:", formData);
    const result = await refetchEspecialidadAgenda({
      especialidad_id: formData.specialty,
      dia: formData.date,
    });
    setDoctoresDisponibles(result?.results || []);
    setSelectedDate(formData.date); // Guardar la fecha elegida
  };

  const [selectedDate, setSelectedDate] = useState(null);
    

  const handleChooseDoctor = async  (agenda) => {
    console.log("Elegiste la agenda:", agenda);
    const result = await refetchSlot({
      agenda_id: agenda.id,
    });

    return result?.results?.[0];

  };

  const scrollToForm = () => {
    if (CitaFormRef.current) {
      CitaFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen font-['Outfit'] bg-[#fbfbfb]">
      {/* NAVBAR */}


      <Header />

      {/* HERO con slideshow */}
      <div className="relative z-10">
        <HeroBanner
          images={images}
          title="Bienvenido"
          subtitle="¡Gestiona tus citas desde cualquier lugar, en cualquier momento!"
          buttonText="SEPARA TU CITA"
          onButtonClick={scrollToForm}
        />
      </div>

      {/* TARJETAS flotantes */}
      <div className="-mt-20 relative z-20 px-4">
        <InfoCards />
      </div>

      {/* FORMULARIO */}
      <div ref={CitaFormRef} className="mt-8 relative z-20">
        {loadingE ? (
          <div className="flex justify-center items-center py-6">
            <span className="loader"></span>
          </div>
        ) : (
          <CitaForm
            specialties={especialidades?.results || []}
            onSearch={handleSearch}
          />
        )}
      </div>

      {/* LISTA DE DOCTORES */}
      {doctoresDisponibles.length > 0 && (
        <div className="mt-8">
          <DoctorList
            doctores={doctoresDisponibles}
            selectedDate={selectedDate}
            onChoose={handleChooseDoctor}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}