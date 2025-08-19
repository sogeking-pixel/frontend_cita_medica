import apiClient from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

export const getPrivateMedicoDashboard = () =>
  apiClient.get("/medicos/dashboard/");

export const getMedicoEspecialidades = () =>
  apiClient.get(`/medicos/me/especialidades/`);

export const createMedicoAgenda = (payload) =>
  apiClient.post(`/medicos/me/agendas/`, payload);

export const getMedicoAgendas = () =>
  apiClient.get(
    `/medicos/me/agendas/`
  );

export const getMedicoEspecialidadAgendas = (especialidad_id) =>
  apiClient.get(
    `/medicos/me/agendas/?especialidad=${encodeURIComponent(especialidad_id)}`
  );

export const getMedicoAgendaCitas = (agenda_id) =>
  apiClient.get(`/medicos/me/citas/?agenda=${encodeURIComponent(agenda_id)}`);

export const getMedicoCitas = () =>
  apiClient.get(`/medicos/me/citas/`);