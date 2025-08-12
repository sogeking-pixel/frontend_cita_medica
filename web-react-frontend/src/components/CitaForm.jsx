import React, { useState } from "react";
import Search from "../assets/icons/Search.png";


export default function CitaForm({
  title = "Agendar Cita Médica",
  step = 1,
  specialties = [],
  onSearch
}) {
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
      onSearch?.(formData);
    } else {
      // Mark all fields as touched to show validation
      setTouched({ specialty: true, date: true });
    }
  };

  const isFormValid = formData.specialty && formData.date;


  return (
     <div className="flex justify-center items-start py-4 mt-35 mb-2">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-6xl">
        
        {/* Cabecera */}
        <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-4">
          <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-9">
            {step}
          </div>
          <h2 className="text-2xl font-semibold text-[#62abaa]">{title}</h2>
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Especialidad */}
          <div>
            <label className="block text-gray-700 text-xl mb-4">Especialidad</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl shadow-sm bg-zinc-100 transition duration-200
                ${touched.specialty && !formData.specialty ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
            >
              <option value="">Seleccione especialidad</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-gray-700 text-xl mb-4">Elige Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl shadow-sm bg-zinc-100 transition duration-200
                ${touched.date && !formData.date ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
            />
          </div>

          {/* Botón */}
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex items-center justify-center gap-2 px-6 py-2 rounded-3xl ml-auto transition-colors shadow-md
                ${isFormValid ? "bg-[#62abaa] text-white hover:bg-[#519999]" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
              <img src={Search} alt="Buscar" className="w-6 h-5 rounded-full shadow-lg" />
              Buscar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}