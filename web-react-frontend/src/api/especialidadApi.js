import apiClient from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

export const getPublicEspecialidades = () =>
  axiosPublic.get("/especialidades/").then(res => res.data);

export const getPublicEspecialidadAgenda = (especialidad_id) =>
  axiosPublic.get(`/especialidades/${encodeURIComponent(especialidad_id)}/agendas/`);