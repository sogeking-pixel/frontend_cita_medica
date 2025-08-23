import { useNavigate } from "react-router-dom";
import Doctor1 from "../assets/images/Doctor1.jpg"
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";

const DoctorList = ({ doctores, selectedDate, onChoose }) => { // onChoose añadido por si lo usas
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

//  Función parseDate 
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    if (dateStr.includes("-")) return new Date(`${dateStr}T00:00:00`);
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

   useEffect(() => {
    setCurrentDate(parseDate(selectedDate));
  }, [selectedDate]);

  // ✅ Confirmar cita
  const handleConfirmClick = () => {
    if (!selectedDoctor || !selectedTime || !selectedAgenda) return;

    navigate(getRoute("CitaFinish").path, {
      state: {
        doctor: {
          ...selectedDoctor,
          foto: selectedDoctor.imagen || Doctor1, // fallback
        },
        specialty: selectedDoctor.especialidad,
        date: selectedDate,
        agenda: selectedAgenda,
        time: selectedTime,
      },
    });
  };

   //  Generar horarios
  const generateTimeSlots = (start, end, timespace, slots_ocupados = []) => {
    const slots = [];
    if (!start || !end || !timespace) return slots;

    const normalize = (t) => {
      if (!t) return t;
      const parts = t.split(":");
      return parts
        .slice(0, 2)
        .map((p) => p.padStart(2, "0"))
        .join(":");
    };

    // Normalizamos los ocupados y creamos un Set para búsquedas rápidas
    const occupiedSet = new Set(
      (slots_ocupados || []).map((s) => normalize(s))
    );

    const [startHour, startMinute] = start.split(":").slice(0, 2).map(Number);
    const [endHour, endMinute] = end.split(":").slice(0, 2).map(Number);

    let currentTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const step = Number(timespace);

    while (currentTime < endTime) {
      const hours = Math.floor(currentTime / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (currentTime % 60).toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      slots.push({
        time,
        occupied: occupiedSet.has(time),
      });
      currentTime += step;
    }

    return slots;
  };

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const handleSelectAgenda = async (agenda) => {
    setSelectedDoctor(agenda.medico);
    const { conMedico, ...sinMedico } = agenda;
    setSelectedAgenda(sinMedico);
    setSelectedTime(null);

    setLoadingSlots(true);
    let occupiedResp = [];

    try {
      // onChoose es la función que dispara la petición (handleChooseDoctor en el padre)
      const resp = await onChoose?.(agenda);

      // Intentamos extraer un array de slots ocupados de varias formas posibles
      if (!resp) {
        occupiedResp = [];
      } else if (Array.isArray(resp)) {
        occupiedResp = resp;
      } else if (Array.isArray(resp?.results)) {
        occupiedResp = resp.results;
      } else if (Array.isArray(resp?.slots)) {
        occupiedResp = resp.slots;
      } else if (Array.isArray(resp?.occupied_slots)) {
        occupiedResp = resp.occupied_slots;
      } else if (Array.isArray(resp?.horarios_ocupados)) {
        occupiedResp = resp.horarios_ocupados;
      } else if (Array.isArray(resp?.time_slots)) {
        occupiedResp = resp.time_slots;
      } else {
        // Si la estructura es otra, intenta detectar campos con strings dentro
        // (fallback: buscar cualquier array dentro del objeto)
        const arrays = Object.values(resp).filter((v) => Array.isArray(v));
        occupiedResp = arrays.length ? arrays[0] : [];
      }
    } catch (err) {
      console.error("Error al obtener slots ocupados:", err);
      occupiedResp = [];
    }

    const slots = generateTimeSlots(
      agenda.hora_inicio,
      agenda.hora_fin,
      agenda.time_slot_minutes,
      occupiedResp
    );

    setTimeSlots(slots);
    setLoadingSlots(false);
  };

  return (
    <div className="pb-60 px-3 bg-gradient-to-t from-[#e4f5f8c8]">
  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-[1500px] mx-auto">
    {/* Cabecera */}
    <div className="flex items-center border-b-[3px] border-gray-200 pb-3 mb-4">
      <div className="flex items-center justify-center w-10 h-9 rounded-full bg-[#62abaa] text-white text-lg font-medium mr-3">
        2
      </div>
      <h3 className="text-2xl font-semibold text-[#62abaa]">Elegir Doctor</h3>
    </div>

      {/* Lista de doctores */}
      <div className="space-y-3">
        {doctores.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-4 p-4 bg-[#fbf9f9] rounded-2xl shadow-md border border-gray-200 transition"
          >
            {/* Avatar */}
            <img
              src={doc.foto || Doctor1}
              alt={doc.nombre}
              className="w-20 h-20 rounded-full object-cover"
            />

                {/* Info */}
                <div className="flex-1">
                  {/* Nombre + experiencia */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-base font-semibold text-gray-900">
                      {doc.medico.usuario.nombre_completo || "hola"}
                    </p>
                    {doc.experience !== undefined && (
                      <p className="text-sm text-gray-500 mr-9 ">
                        {doc.experience} {doc.experience === 1 ? "año" : "años"}{" "}
                        de experiencia
                      </p>
                    )}
                  </div>

                  {/* Especialidad */}
                  <p className="text-sm  text-gray-700">
                    {doc.especialidad || "Especialidad"}
                  </p>
                </div>

            {/* Botón Elegir */}
            <button
              onClick={() => handleChooseDoctor(doc)}
              className="bg-[#62abaa] hover:bg-[#4f9b95] text-white px-4 py-2 rounded-xl"
            >
              Elegir
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default DoctorList;
