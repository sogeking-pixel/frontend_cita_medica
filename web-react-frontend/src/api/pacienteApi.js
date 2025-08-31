import axiosPublic from "./axiosPublic";
export const getPublicPaciente = (payload) =>
  axiosPublic.post(`/pacientes/email-info/`, payload);

export const postPublicPacienteCitaSinRegistrar = (payload) =>
  axiosPublic.post(`/citas/iniciar-proceso/`, payload);

export const postPublicPacienteCitaRegistrado = (payload) =>
  axiosPublic.post(`/pacientes/create-cita/`, payload);