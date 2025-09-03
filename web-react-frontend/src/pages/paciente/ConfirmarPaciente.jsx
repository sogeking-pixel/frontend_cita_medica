import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import StatusEmail from "../../components/StatusEmail";
import { getRoute } from "../../routes/routesConfig";
import successAnimation from "../../assets/animations/success.json";
import errorAnimation from "../../assets/animations/error.json";
import loadingAnimation from "../../assets/animations/loading.json";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import useConfirmPaciente from "../../hooks/useConfirmPaciente";
 
const ConfirmarPaciente = () => {
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [estado, setEstado] = useState("verificando");
  const {data, confirmPaciente, loading, error} = useConfirmPaciente();
  const alreadyCalled = useRef(false);
  useEffect(() => {
    
    if (alreadyCalled.current) return;
    alreadyCalled.current = true;
    const verificarToken = async () => {
      const token = searchParams.get("token");
        if (!token) {
          setEstado("error");
          return;
        }
        try {
          await confirmPaciente(token);
          setEstado("exito");
        } catch (error) {
          if (error.name === "AbortError") return;
          console.error("Error al confirmar paciente:", error);
          setEstado("error");
        };
      }
    verificarToken();
  }, [searchParams, confirmPaciente]);

  const handleVolverInicio = () => {
      navigate(getRoute("Inicio").path);
  };

  const animations = {
    verificando: loadingAnimation,
    exito: successAnimation,
    error: errorAnimation,
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center sm:py-30">
        <div className="relative py-3 sm:max-w-7xl h-screen justify-center content-center sm:h-auto sm:mx-auto ">
          <div className="relative px-10 py-10 bg-white content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
            <div className="max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
                <h1 className="text-2xl font-bold mb-4">Confirmar Paciente</h1>
                <StatusEmail
                  estado={estado}
                  onVolverInicio={handleVolverInicio}
                  animations={animations}
                  message={data?.detail ?? null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmarPaciente;
