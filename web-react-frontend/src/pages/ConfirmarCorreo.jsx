import React, { useEffect, useState, useRef } from "react";
import axiosPublic from "../api/axiosPublic";
import Logo from "../assets/Logo.svg";
import StatusEmail from "../components/StatusEmail";
import { getRoute } from "../routes/routesConfig";
import successAnimation from "../animations/success.json";
import errorAnimation from "../animations/error.json";
import loadingAnimation from "../animations/loading.json";
 
const ConfirmarCorreo = () => {
  const [estado, setEstado] = useState("verificando");
  const hasVerified = useRef(false);
  useEffect(() => {
    const solicitudConfirmarCorreo = async () => {
      if (hasVerified.current) return;
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setEstado("error");
        return;
      }

      try {
        hasVerified.current = true;
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

    solicitudConfirmarCorreo();
  }, []);

  const handleVolverInicio = () => {
    window.location.href = getRoute('Login').path;
  };

  const animations = {
    verificando: loadingAnimation,
    exito: successAnimation,
    error: errorAnimation,
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center content-center sm:h-auto sm:mx-auto ">
        <div className="relative px-10 py-10 bg-white content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-2xl font-bold mb-4">Confirmar Correo</h1>
              <StatusEmail
                estado={estado}
                onVolverInicio={handleVolverInicio}
                animations={animations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCorreo;
