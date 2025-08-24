import React, { useState } from "react";
import HeaderMedico from "../../layouts/HeaderMedico";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";

export default function CuentaConfig() {
  const [formData, setFormData] = useState({
    correo: "medico@gmail.com",
    dni: "75804731",
    password: "**********",
    oldPassword: "",
    newPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
    // Aquí luego se conecta al backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] ">
      {/* Header */}
      <HeaderMedico />

      {/* Contenido */}
      <main className="flex-1 flex justify-center px-4 md:px-8 mt-28">
        <div className="w-full max-w-xl mb-12  ">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5 px-8 mt-9 font-['Outfit']">
            {/* Título con numeración */}
            <div className="flex border-b-[2.5px] border-[#37373730] pb-3 mb-8">
              <div className="px-4 py-2 bg-[#62abaa] text-white rounded-full mr-3 text-xl flex items-center justify-center w-10 h-10 font-bold">
                C
              </div>
              <h2 className="text-2xl font-semibold text-[#62abaa]">
                Configuración de Cuenta
              </h2>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo DNI */}
              <InputForm
                label="DNI"
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="text-sm cursor-not-allowed bg-gray-100 text-gray-600"
                readOnly
                disabled
              />

              {/* Campo Correo */}
              <InputForm
                label="Correo electrónico"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="text-sm cursor-not-allowed bg-gray-100 text-gray-600"
                readOnly
                disabled
              />

              {/* Campo Contraseña */}
              <InputForm
                label="Contraseña"
                type="Password"
                name="contraseña"
                value={formData.password}
                onChange={handleChange}
                readOnly
                className="text-sm cursor-not-allowed bg-gray-100 text-gray-600"
              />
                              
                {/* Botón Cambiar Contraseña */}
                <div className="flex justify-end mt-1">
                  <span
                    className="text-[#29a3d4da] hover:underline text-sm cursor-pointer"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                  >
                    {showPasswordFields ? "Cancelar" : "Cambiar Contraseña"}
                  </span>
                </div>


              {/* Inputs de Cambiar COntraseña */}
              {showPasswordFields && (
                <>
                <div className="flex gap-4 mt-6">
                  <div className="w-1/2">
                    <InputForm
                      label="Contraseña Antigua"
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      placeholder="Ingrese Contraseña Antigua"
                      className="text-sm"
                    />
                  </div>
                  <div className="w-1/2">
                    <InputForm
                      label="Contraseña Nueva"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Ingrese Contraseña Nueva"
                      className="text-sm"
                    />
                  </div>
                </div>

              {/* Botón de guardar */}
              <Button type="submit" className="w-full mt-20">
                Guardar cambios
              </Button>
              </>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
