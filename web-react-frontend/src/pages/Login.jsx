import Button from "../components/Button";
import InputForm from "../components/InputForm";
import axiosPublic from "../api/axiosPublic";
import Logo from "../assets/Logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [mensajes, setMensajes] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        setMensajes("Por favor, completa todos los campos.");
        setErrorVisible(true);
        return;
      }



      try {
        // Hacemos la llamada a la API a través de nuestra instancia `apiClient`
        setLoading(true);
        const response = await axiosPublic.post("/auth/login/", {
          email,
          password,
        });

        console.log("Login response:", response.data);

        if(response.status !== 200) {
          throw new Error("Error al iniciar sesión");
        }

        // La API debería devolver los tokens
        const { accessToken, refreshToken } = response.data;


        // Guardamos los tokens en el localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        if (error.response && error.response.data) {
          setMensajes(error.response.data.detail || "Error al iniciar sesión.");
        } else {
          setMensajes("Error de conexión. Por favor, inténtalo de nuevo.");
        }
        setErrorVisible(true);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-7xl h-screen justify-center sm:h-auto sm:mx-auto ">
          <div className="relative px-10 py-10 bg-white h-screen content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
            <div className="max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
                <h1 className="text-4xl font-semibold">Bienvenido!</h1>
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
                  <div className="relative"></div>
                  <div className="relative">
                    <InputForm
                      label="Correo Electronico"
                      id="email"
                      name="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <InputForm
                      label="Contraseña"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="text-gray-500 text-sm text-center">
                      <a
                        href="/Forgetpassword"
                        className="text-cyan-500 hover:text-cyan-700 font-semibold"
                      >
                        Olvide mi contraseña
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      className="w-full my-4 onClick={handleLogin}"
                      onClick={handleLogin}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2 justify-center">
                          <span className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></span>
                          <span>Creando...</span>
                        </div>
                      ) : (
                        "Ingresar"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="text-gray-500 text-sm">
                ¿No tienes una cuenta?{" "}
                <a
                  href="/register"
                  className="text-cyan-500 hover:text-cyan-700 font-semibold"
                >
                  Regístrate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}
export default Login;