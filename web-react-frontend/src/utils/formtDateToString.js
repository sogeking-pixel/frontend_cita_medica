
export const formatLocalDateString = (input) => {
  if (!input) return "";

  let date;
  if (input instanceof Date) date = input;
  else if (typeof input === "number") date = new Date(input);
  else if (typeof input === "string") {
    const ymd = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    date = ymd
      ? new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]))
      : new Date(input);
  } else return "";

  if (Number.isNaN(date.getTime())) return "";
  const formatted = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatFechaHora = (input) => {
  if (!input) return "";

  let date;
  if (input instanceof Date) date = input;
  else if (typeof input === "number") date = new Date(input);
  else if (typeof input === "string") date = new Date(input);
  else return "";

  if (Number.isNaN(date.getTime())) return "";

  const fecha = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short", // puedes poner 'long' o 'numeric'
    year: "numeric",
  });

  const hora = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${fecha} · ${hora}`;
};
