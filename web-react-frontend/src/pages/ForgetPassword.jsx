import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import Logo from "../assets/Logo.svg";
import EmailConfirmation from "../animations/EmailConfirmation.json";
import Lottie from 'lottie-react';
import { getRoute } from '../routes/routesConfig';

export default function PasswordOlvidada() {
  const [email, setEmail] = useState('');
  const [enlaceEnviado, setEnlaceEnviado] = useState(false);

  const handleRecuperar = () => {
    // Aquí iría la lógica para enviar el correo de recuperación
    alert(`Se enviará un enlace de recuperación a: ${email}`);
    setEnlaceEnviado(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center sm:h-auto sm:mx-auto">
        <div className="relative px-10 py-10 bg-white h-screen content-center sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
          <div className="max-w-md mx-auto">
            {/* Pantalla 1: Formulario */}
            {!enlaceEnviado ? (
              <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="Logo" className="w-18 h-24 mb-6" />
                <h1 className="text-3xl font-semibold mb-2">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-gray-500 text-[17px] font-outfit font-medium mb-10 mt-3">
                  Introduzca su cuenta de correo electrónico y nosotros
                  enviaremos un enlace para restablecer su contraseña.
                </p>

                <div className="w-full ">
                  <InputForm
                    label="Correo electrónico"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button
                    className="w-full mt-12 mb-5 text-lg  "
                    onClick={handleRecuperar}
                  >
                    Enviar enlace
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
            ) : (
              // Pantalla 2: Confirmación
              <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="Logo" className="w-18 h-24" />
                <h1 className="text-3xl font-semibold mb-2 mt-5">
                  ¡Listo! Revisa tu correo
                </h1>
                <p className="text-gray-500 text-[17px] font-outfit font-medium mb-4">
                  Hemos enviado un enlace a{" "}
                  <span className="font-semibold text-gray-700">{email}</span>{" "}
                  para restablecer tu contraseña.
                </p>
                <div>
                  <Lottie
                    animationData={EmailConfirmation}
                    style={{ height: 150 }}
                    loop={true}
                  />
                </div>

                <Button
                  className="w-full my-4 text-lg"
                  onClick={() =>
                    (window.location.href = getRoute("Login").path)
                  }
                >
                  Volver al inicio de sesión
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
