import React, { useState, useEffect } from "react";

function Modal({
  children,
  onClose,
  show = true,
  buttonAccept,
  title = "Hola",
  titleClose = "Cancelar"
}) {
  
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    if (show) {
      setAnimationClass("modal-appear");
    }
  }, [show]);
  const handleClose = () => {
    setAnimationClass("modal-disappear");
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={handleClose}
      ></div>
      <div
        className={`bg-white rounded-xl shadow-lg z-60 w-full max-w-2xl p-8 ${animationClass}`}
      >
        <div className="flex items-center justify-between mb-8 border-b border-gray-400 pb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={handleClose} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {children}

        <div className="flex gap-3 justify-end mt-8">
          <button onClick={handleClose} className="px-4 py-2 border rounded">
            {titleClose}
          </button>
          {buttonAccept}
        </div>
      </div>
    </div>
  );
}
export default Modal;
