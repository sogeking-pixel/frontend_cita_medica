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
    <div className="relative z-20 -mt-20 flex flex-wrap justify-center gap-14 px-4 md:px-8 card-appear">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="w-full max-w-xs rounded-xl bg-white px-6 py-8 shadow-lg transition hover:shadow-2xl"
        >
          {/* Div circular  imagen de fondo */}
          <div className="mx-auto mb-3 h-22 w-22 ">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="text-center text-xl font-semibold text-[#48d7bf]">
            {card.title}
          </h3>
          <p className="mt-3 text-center text-base text-gray-600">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
