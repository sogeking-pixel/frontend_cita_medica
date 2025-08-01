import Button from "../components/Button";
import InputForm from "../components/InputForm";
import Logo from "../assets/Logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import AlertMessage from "../components/AlertMessage";
import SuccessMessage from "../components/SuccessMessage";

function Register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  
  const [mensajes, setMensajes] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);


  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    

    if (
      !email ||
      !password ||
      !passwordConfirm ||
      !nombres ||
      !apellidos ||
      !dni ||
      !fechaNacimiento
    ) {
      setMensajes("Por favor, completa todos los campos.");
      setErrorVisible(true);
      return;
    }
    if (password !== passwordConfirm) {
      setMensajes("Las contraseñas no coinciden.");
      setErrorVisible(true);
      return;
    }
    
    
    try {
      // Hacemos la llamada a la API a través de nuestra instancia `apiClient`
      setLoading(true);
      const response = await axiosPublic.post("/auth/register-paciente/", {
        usuario: {
          email,
          nombres,
          apellidos,
          dni,
          password,
        },
        fecha_nacimiento: fechaNacimiento,
      });
      if (response.status !== 201) {
        setMensajes("Error al registrar usuario. Por favor, intente nuevamente.");
        setErrorVisible(true);
        return;
      }
      setSuccess(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensajes("Error al registrar usuario. Por favor, intente nuevamente.");
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center sm:h-auto sm:mx-auto ">
        {success ? (
          <SuccessMessage
            title="¡Cuenta creada correctamente!"
            message="Hemos enviado un correo de confirmación. Por favor revisa tu bandeja de entrada."
            onClose={() => (window.location.href = "/")}
            buttonText="Ir al inicio"
          />
        ) : (
          <div className="relative px-10 py-10 bg-white min-h-screen content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
            <div className="max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
                <h1 className="text-2xl font-semibold">
                  Registar Nuevo Usuario!
                </h1>
                <p className="text-sm py-2">
                  Llene el siguiente formulario con sus datos personales. Crear
                  una contrasena y registra una cuenta de correo electronico
                </p>
              </div>
              <AlertMessage
                type="danger"
                title="Error"
                show={errorVisible}
                onClose={() => setErrorVisible(false)}
              >
                {mensajes}
              </AlertMessage>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <InputForm
                      label="Nombres Completos"
                      id="firstName"
                      name="firstName"
                      placeholder="Nombres Completos"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Apellidos Completos"
                      id="lastName"
                      name="lastName"
                      placeholder="Apellidos Completos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="DNI"
                      id="dni"
                      name="dni"
                      placeholder="DNI"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Fecha de Nacimiento"
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      placeholder="Fecha de Nacimiento"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Email Address"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Confirmar Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmar Password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Button className="w-full my-4" onClick={handleRegister}>
                      {loading ? (
                        <div className="flex items-center space-x-2 justify-center">
                          <span className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></span>
                          <span>Creando...</span>
                        </div>
                      ) : (
                        "Crear"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Register;
