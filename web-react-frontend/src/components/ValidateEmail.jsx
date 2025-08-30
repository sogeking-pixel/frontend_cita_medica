import React from "react";
import Logo from "../assets/icons/Logo.svg";
import Lottie from "lottie-react";
import Emailvalid from "../assets/animations/Emailvalid.json"
import Button from "./Button";

const ValidateEmail = ({
  onContinue,
  message,
  title,
  buttonContent = "Volver",
  className
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center  relative px-4 py-10 bg-white content-center sm:h-auto shadow-lg sm:rounded-3xl sm:w-100 sm:p-10 text-center ${className}`}
    >
      <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-6 shadow-lg">
        <img src={Logo} alt="Logo" className="w-18 h-24 " />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

      <p className="text-gray-600 max-w-sm mb-8">{message}</p>
      <div className="mb-12">
        <Lottie
          animationData={Emailvalid}
          style={{ height: 150 }}
          loop={true}
        />
      </div>
      <Button onClick={onContinue} className={"px-8"}>
        {buttonContent}
      </Button>
    </div>
  );
};

export default ValidateEmail;