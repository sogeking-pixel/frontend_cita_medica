import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lupa from "../assets/icons/lupa.svg";
import { getRoute } from "../routes/routesConfig";

export default function CitaForm({
  title = "Agendar Cita Médica",
  step = 1,
  specialties = [],
  onSearch
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialty: "",
    type: "",
    date: ""
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

 const handleSubmit = () => {
    if (formData.specialty && formData.date) {
      // Paso 1: ejecutar búsqueda si es necesario
      onSearch?.(formData);
 
    } else {
      setTouched({ specialty: true, date: true });
    }
  };

  const isFormValid = formData.specialty && formData.date;


  return (
    <div className="flex justify-center items-start py-4 mt-35 mb-10">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-6xl">
        {/* Cabecera */}
        <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-4">
          <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9">
            {step}
          </div>
          <h2 className="text-2xl font-semibold text-[#62abaa]">{title}</h2>
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Especialidad */}
          <div className="md:col-span-2">
            <label className="block text-[#404040] text-xl mb-3">
              Especialidad
            </label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className={`w-full px-4 py-2  rounded-xl shadow-lg bg-zinc-100 transition duration-800 text-[#6a6a6a]
                ${
                  touched.specialty && !formData.specialty
                    ? "border-red-500"
                    : "border-gray-300"
                }
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
            >
              <option value="">Seleccione especialidad</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="md:col-span-2">
            <label className="block text-[#6a6a6a] text-xl mb-3 ">
              Elige fecha de asistencia
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl shadow-lg bg-zinc-100 transition duration-800 text-[#7b7b7b]
                ${
                  touched.date && !formData.date
                    ? "border-red-500"
                    : "border-gray-300"
                }
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-1 flex justify-end mt-9">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex items-center justify-center gap-2 px-6 py-2 rounded-2xl ml-auto transition-colors shadow-md
                ${
                  isFormValid
                    ? "bg-[#62abaa] text-white hover:bg-[#519999]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              <img
                src={lupa}
                alt="Buscar"
                className="w-6 h-5 rounded-full shadow-lg"
              />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}