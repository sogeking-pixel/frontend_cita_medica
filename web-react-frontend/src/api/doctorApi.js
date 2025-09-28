import apiClient from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

export const getPrivateMedicoDashboard = () =>
  apiClient.get("/medicos/dashboard/");

export const getMedicoEspecialidades = () =>
  apiClient.get(`/medicos/me/especialidades/`);

export const createMedicoAgenda = (payload) =>
  apiClient.post(`agendas/`, payload);

export const getMedicoAgendas = (date_gte, date_lte) =>
  apiClient.get(`/medicos/me/agendas/`, {
    params: {
      date_gte,
      date_lte,
    },
  });

export const getMedicoEspecialidadAgendas = (especialidad_id) =>
  apiClient.get(
    `/medicos/me/agendas/?especialidad=${encodeURIComponent(especialidad_id)}`
  );

export const getMedicoAgendaCitas = (agenda_id) =>
  apiClient.get(`/medicos/me/citas/?agenda=${encodeURIComponent(agenda_id)}`);

export const getMedicoCitas = (params) =>
  apiClient.get(`/medicos/me/citas/`, {params});