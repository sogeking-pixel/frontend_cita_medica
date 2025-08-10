const infoCards = [
  {
    title: 'Citas en línea',
    description:
      'Ahora puedes agendar tus citas y realizar tus pagos en línea desde cualquier dispositivo.',
  },
  {
    title: 'Especialidades',
    description:
      'Nos preocupamos por el bienestar y economía de nuestros pacientes, precio de consultas médicas desde 40 soles.',
  },
  {
    title: 'Laboratorio Clínico',
    description:
      'Tenemos convenio con el prestigioso laboratorio Synlab, reconocido a nivel mundial.',
  },
  {
    title: 'Emergencias 24/7',
    description:
      'Atención médica de urgencia durante las 24 horas del día los 7 días de la semana.',
  },
];

export default function InfoCards() {
  return (
    <div className="relative z-20 -mt-20 flex flex-wrap justify-center gap-16 px-4 md:px-8 ">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="w-full max-w-xs rounded-xl bg-white px-6 py-10 shadow-lg transition hover:shadow-xl"
        >
          {/* Div circular  imagen de fondo */}
          <div className="mx-auto mb-6 h-22 w-22 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('/ruta/de/tu/imagen-${index + 1}.jpg')` }}>
            {/* También puedes dejarlo vacío si luego usarás solo CSS */}
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
