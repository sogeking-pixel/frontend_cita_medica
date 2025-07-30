import React, { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import Button from "../components/Button";
import Logo from "../assets/Logo.svg";
 
const ConfirmarCorreo = () => {
  const [estado, setEstado] = useState("verificando");

  useEffect(() => {
    const confirmarCorreo = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setEstado("error");
        return;
      }

      try {
        const response = await axiosPublic.post("/auth/verify-email/", {
          token,
        });
        if (response.status === 200) {
          setEstado("exito");
        } else {
          setEstado("error");
        }
      } catch (error) {
        console.error("Error al verificar el correo:", error);
        setEstado("error");
      }
    };

    confirmarCorreo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center content-center sm:h-auto sm:mx-auto ">
        <div className="relative px-10 py-10 bg-white content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-2xl font-bold mb-4">Confirmar Correo</h1>
              {estado === "verificando" && (
                <p className="text-gray-600 mb-6">
                  Verificando tu correo electrónico...
                </p>
              )}
              {estado === "exito" && (
                <>
                  <p className="text-gray-600 mb-6">
                    ✅ ¡Correo verificado con éxito! Ahora puedes iniciar
                    sesión.
                  </p>
                  <Button onClick={() => (window.location.href = "/")}>
                    Volver al Inicio
                  </Button>
                </>
              )}

              {estado === "error" && (
                <p className="text-gray-600 mb-6">
                  ❌ Error al verificar el correo. El token no es válido o ha
                  expirado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCorreo;
