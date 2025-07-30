import Button from "../components/Button";
import Logo from "../assets/Logo.svg";

function ConfirmarCorreo() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl h-screen justify-center content-center sm:h-auto sm:mx-auto ">
        <div className="relative px-10 py-10 bg-white content-center  sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-2xl font-bold mb-4">Confirmar Correo</h1>
              <p className="text-gray-600 mb-6">
                Por favor, verifica tu correo electrónico para completar el
                registro.
              </p>
              <Button
                onClick={() => (window.location.href = "/")}                          >
                Volver al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarCorreo;
