import axiosPublic from "./axiosPublic";

export const getPublicEspecialidades = () =>
  axiosPublic.get("/especialidades/")

export const getPublicEspecialidadAgenda = (especialidad_id) =>
  axiosPublic.get(`/especialidades/${encodeURIComponent(especialidad_id)}/agendas/`);