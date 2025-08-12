import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import Logo from "../../assets/icons/Logo.svg";
import NewPassIcon from "../../assets/images/NewPassIcon.svg";
import PasswordConfirmation from "../../assets/animations/PasswordConfirmation.json";
import Lottie from "lottie-react";
import { getRoute } from "../../routes/routesConfig";

export default function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCreated, setPasswordCreated] = useState(false);

  const handleCreatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aquí iría la lógica para guardar la nueva contraseña
    setPasswordCreated(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center sm:h-auto sm:mx-auto">
        <div className="relative px-10 py-10 bg-white h-screen content-center sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <img src={Logo} alt="Logo" className="w-18 h-24 mb-4" />

              {passwordCreated ? (
                <>
                  <h1 className="text-3xl font-semibold mb-2">
                    ¡Contraseña creada!
                  </h1>
                  <p className="text-gray-500 text-[17px] font-outfit font-medium mb-4">
                    Ahora puedes iniciar sesión con tu nueva contraseña.
                  </p>
                  <div>
                    <Lottie
                      animationData={PasswordConfirmation}
                      style={{ height: 150 }}
                      loop={false}
                    />
                  </div>

                  <Link
                    to="/"
                    className="text-cyan-500 hover:text-cyan-700 font-semibold text-sm"
                  >
                    Volver al inicio de sesión
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-semibold mb-2">
                    Crea una nueva contraseña
                  </h1>
                  <p className="text-gray-500 text-[17px] font-outfit font-medium mb-4">
                    Introduzca su nueva contraseña para acceder a su cuenta.
                  </p>
                  <img
                    src={NewPassIcon}
                    alt="NuevaContraseñaIcon"
                    className="my-5"
                  />

                  <div className="divide-y divide-gray-200 w-full">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <InputForm
                        label="Nueva contraseña"
                        id="new-password"
                        name="new-password"
                        type="password"
                        placeholder="Ingrese nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <InputForm
                        label="Confirmar contraseña"
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        placeholder="Confirme nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      <Button
                        className="w-full my-4 mt-8 mb-5"
                        onClick={handleCreatePassword}
                      >
                        Crear
                      </Button>

                      <div className="text-center">
                        <Link
                          to={getRoute("Login").path}
                          className="text-cyan-500 hover:text-cyan-700 font-semibold text-sm"
                        >
                          Volver al inicio de sesión
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
