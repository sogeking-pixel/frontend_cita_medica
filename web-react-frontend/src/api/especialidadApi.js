import axiosPublic from "./axiosPublic";

export const getPublicEspecialidades = () =>
  axiosPublic.get("/especialidades/")

export const getPublicEspecialidadAgenda = (especialidad_id, dia = new Date().toISOString().split('T')[0]) =>
  axiosPublic.get(`/especialidades/${encodeURIComponent(especialidad_id)}/agendas/`, {
    params: { date: dia }
  });