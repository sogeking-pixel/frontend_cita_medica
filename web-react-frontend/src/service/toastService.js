// notificationService.js
import { toast } from "react-hot-toast";

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
    icon: "ℹ️",
    style: {
      ...defaultStyle.style,
      background: "#4CAFFF",
      color: "#fff",
    },
  });
};
