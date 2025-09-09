import { useState, useRef, useEffect } from "react";
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
import Infosection from "../../components/InfoSection";

const images = [banner1, banner2, banner3,];

export default function Home() {
  const CitaFormRef = useRef(null);
  const [agendasDisponibles, setAgendasDisponibles] = useState([]);

  const { //para el input de especialidades especialidades
    data: especialidades,
    loading: loadingE,
    error: errE,
    refetch: refetchEspecialidades,
  } = useGetEspecialidades();

  const { //para DoctorList ( lista de doctores)
    data: especialidadAgendaData,
    loading: loadingEA,
    error: errEA,
    refetch: refetchEspecialidadAgenda,
  } = useGetEspecialidadAgenda({ autoFetch: false });

  
  const [selectedSpeciality, setselectedSpeciality] = useState(null);


  // Esta función será llamada por CitaForm cuando se pulse "Buscar"
  const handleSearch = async (formData) => {
    console.log("handleSearch recibido:", formData);
    const result = await refetchEspecialidadAgenda({
      especialidad_id: formData.specialty,
      dia: formData.date,
    });
    setAgendasDisponibles(result?.results || []);
    setSelectedDate(formData.date);
    setselectedSpeciality(
      especialidades.results.find((s) => s.id == formData.specialty)
        ?.nombre
    );// Guardar la fecha elegida
  };

  const [selectedDate, setSelectedDate] = useState(null);

    

  const handleChooseDoctor = async  (agenda) => {
    console.log("Elegiste la agenda:", agenda, agenda.id);
  //todo hacer que se reenvie eso como parametro a choose-time, ademas que el manejo del slot debe estar en la page choose-time, mas no el doctorlist, y devolver el localtion a citafisch, de lo se haga en sumitn en doctor list, replicar el sumibt en choose-time 

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

      {/* INFO SECTION  */}
      <div className=" my-10 md:my-40 relative z-20 px-4 md:px-55 bg-[#a2e2f230] md:bg-transparent">
        <Infosection />
      </div>


      {/* FORMULARIO */}
      <div ref={CitaFormRef} className="md:mt-70 relative z-20">
        <CitaForm
          specialties={especialidades?.results || []}
          onSearch={handleSearch}
          loading={loadingE}   //  pasamos el loading al CitaForm
        />
      </div>

      {/* LISTA DE DOCTORES */}
        <div className="mt-4">
          <DoctorList
            agendas={agendasDisponibles}
            selectedDate={selectedDate}
            specialty={selectedSpeciality}
            loading= {loadingEA}
          />
        </div>
      <Footer />
    </div>
  );
}