import { useNavigate } from "react-router-dom";
import Doctor1 from "../assets/images/Doctor1.jpg"
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";


const DoctorList = ({ doctores, date }) => {
  const navigate = useNavigate();

  const handleChooseDoctor = (doctor) => {
    navigate("/choose-time-doc", { state: { doctor, date } });
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
                <p className="text-base font-semibold text-gray-900">{doc.nombre}</p>
                {doc.experience !== undefined && (
                  <p className="text-sm text-gray-500 mr-9 ">
                    {doc.experience} {doc.experience === 1 ? "año" : "años"} de experiencia
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
