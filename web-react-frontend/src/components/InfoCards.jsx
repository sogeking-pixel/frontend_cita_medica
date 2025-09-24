import citaonline from "../assets/icons/cita-online.png";
import equipomedico from "../assets/icons/equipo-medico.png";
import puntualidad from "../assets/icons/puntualidad.png";
import especialidad from "../assets/icons/especialidad.png"


const infoCards = [
  {
    title: 'Citas en línea',
    description:
      'Ahora puedes agendar tus citas y realizar tus pagos en línea desde cualquier dispositivo.',
    image: citaonline,
  },
  {
    title: 'Especialidades',
    description:
      '¡Tu salud es nuestra prioridad! Atención médica especializada enfocada en tu bienestar y cuidado integral.',
      image: especialidad,
  },
  {
    title: 'Equipo Médico',
    description:
      'Profesionales calificados y comprometidos en ofrecer atención médica cercana, de calidad y centrada en ti.',
      image: equipomedico,
  },
  {
    title: 'Atención Puntual',
    description:
      'Valoramos tu tiempo. Usamos agenda previa y protocolos para ofrecer atención puntual y eficiente.',
    image: puntualidad,
  },
  
];

export default function InfoCards() {
  return (
    <div className="relative z-20 -mt-20 flex flex-wrap justify-center gap-15 md:gap-22 px-6 md:px-8 card-appear bg">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className=" group w-full max-w-xs rounded-[60px] bg-white px-6 py-7  shadow-lg transition hover:shadow-2xl"
        >
          {/* Icono imagen de fondo */}
          <div className="mx-auto mb-4 h-22 w-22 transition-all duration-300 group-hover:scale-125 ">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="text-center text-xl font-semibold text-[#48d7bf] transition-all duration-300 group-hover:scale-110">
            {card.title}
          </h3>
          <p className="mt-3 text-center text-base text-gray-600  transition-all duration-300 group-hover:scale-105">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
