import Lottie from "lottie-react";
import error404 from "../animations/Error404NF.json";

function NotFound() {
  return (
    
    <div className="min-h-screen flex flex-col px-6 [background:radial-gradient(200%_150%_at_50%_0%,#ffffff_0%,#3A6A6B_100%)]" >
      <Lottie animationData={error404} style={{ height: 450 }} loop={true} />
      <div className="flex flex-col items-center justify-center text-center sm:mt-8">
        <h1 className="text-5xl text-green font-bold mb-4">!ERROR 404!</h1>
        <h1 className="text-3xl text-green font-bold mb-4">Página No Encontrada</h1>
        <p className="text-gray-700 mb-6 text-green text-xl">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
      </div>
    </div>
    
  );
}
export default NotFound;
