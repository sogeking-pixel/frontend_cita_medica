import React, { useState } from "react";

const alertStyles = {
  success: {
    bg: "bg-green-50",
    text: "text-green-800",
    bg_hover: "hover:bg-green-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2 mt-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 
             2.836a.75.75 0 001.063.853l.041-.021M21 
             12a9 9 0 11-18 0 9 9 0 0118 
             0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
  },
  danger: {
    bg: "bg-red-50",
    text: "text-red-800",
    bg_hover: "hover:bg-red-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2 mt-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9.53 3.72l-7.5-13a1.125 1.125 
             0 00-1.96 0l-7.5 13A1.125 1.125 
             0 005.25 18h13.5a1.125 1.125 
             0 00.98-1.53z"
        />
      </svg>
    ),
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    bg_hover: "hover:bg-yellow-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2 mt-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9.53 3.72l-7.5-13a1.125 1.125 
             0 00-1.96 0l-7.5 13A1.125 1.125 
             0 005.25 18h13.5a1.125 1.125 
             0 00.98-1.53z"
        />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    bg_hover: "hover:bg-blue-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2 mt-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 
             2.836a.75.75 0 001.063.853l.041-.021M21 
             12a9 9 0 11-18 0 9 9 0 0118 
             0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
  },
};

export default function AlertMessage({ type = "info", title, children, show = true, onClose }) {
  if (!show) return null;

  const { bg, text, icon, bg_hover } = alertStyles[type] || alertStyles.info;

  return (
    <div
      role="alert"
      className={`mt-3 relative flex flex-col w-full fadeInUp p-3 text-sm ${text} ${bg} rounded-md`}
    >
      <p className="flex text-base">
        {icon}
        {title}
      </p>
      <p className="ml-4 p-3">{children}</p>
      <button
        onClick={onClose}
        aria-label="Cerrar alerta"
        className={`flex items-center justify-center transition-all w-8 h-8 rounded-md ${text}  ${bg_hover} active:bg-white/10 absolute top-1.5 right-1.5`}
        type="button"
      >
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
  );
}
