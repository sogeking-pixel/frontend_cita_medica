import axiosPublic from "./axiosPublic";
export const getPublicPaciente = (payload) =>
  axiosPublic.post(`/pacientes/email-info/`, payload);

export const getPublicPacienteCita = (payload) =>
  axiosPublic.post(`/pacientes/create-cita/`, payload);
