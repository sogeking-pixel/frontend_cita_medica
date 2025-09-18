import axiosPublic from "./axiosPublic";
import apiClient from "./axiosPrivate";

export const getEstadoCitas = () => apiClient.get("/estado-citas/");

export const updateCita = (cita_id, playload) => apiClient.patch(`/citas/${encodeURI(cita_id)}/`, playload)
