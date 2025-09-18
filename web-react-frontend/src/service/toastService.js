// notificationService.js
import { toast } from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import React from "react";

const defaultStyle = {
  style: {
    padding: "20px",
    color: "#713200",
  },
  iconTheme: {
    primary: "#713200",
    secondary: "#FFFAEE",
  },
};

export const notifySuccess = (message) => {
  toast.success(message, {
    style: {
      ...defaultStyle.style,
      background: "#63a3a3ff",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#63a3a3ff",
    },
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    style: {
      ...defaultStyle.style,
      background: "#e75b4e",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#e75b4e",
    },
  });
};

export const notifyInfo = (message) => {
  toast(message, {
    icon: React.createElement(FiInfo),
    style: {
      ...defaultStyle.style,
      background: "#4db5ca",
      color: "#fff",
    },
  });
};
