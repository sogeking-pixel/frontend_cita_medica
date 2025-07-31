import Lottie from "lottie-react";
import error404 from "../animations/404.json";


function NotFound() {
  return (
    <div className="min-h-screen flex flex-col px-2">
      <Lottie animationData={error404} style={{ height: 400 }} loop={true} />
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">Página No Encontrada</h1>
        <p className="text-gray-700 mb-6 text-xl">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
      </div>
    </div>
  );
}
export default NotFound;
