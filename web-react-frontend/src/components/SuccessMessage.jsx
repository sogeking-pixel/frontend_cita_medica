import Lottie from "lottie-react";
import Button from "./Button";
import successAnimation from "../animations/success.json";
export default function SuccessMessage({
  title,
  message,
  onClose,
  buttonText = "Aceptar",
}) {
  return (
    <div className="relative px-4 py-10 bg-white content-center sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-10 text-center">
      <div className="flex justify-center mb-4">
        <Lottie
          animationData={successAnimation}
          style={{ height: 100 }}
          loop={false}
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-600">{title}</h1>
      <p className="mt-4 mb-8 text-gray-700">{message}</p>
      <Button onClick={onClose}>{buttonText}</Button>
    </div>
  );
}
