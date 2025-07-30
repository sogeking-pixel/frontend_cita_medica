import React, { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
 
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
        const response = await axiosPublic.post("/auth/confirmar-correo/", {
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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {estado === "verificando" && <p>Verificando tu correo electrónico...</p>}
      {estado === "exito" && (
        <div>
          <h2>✅ ¡Correo verificado con éxito!</h2>
          <p>Ahora puedes iniciar sesión.</p>
          <a href="/login">Ir a iniciar sesión</a>
        </div>
      )}
      {estado === "error" && (
        <div>
          <h2>❌ Error al verificar el correo</h2>
          <p>El token no es válido o ha expirado.</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmarCorreo;
