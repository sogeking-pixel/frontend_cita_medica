import axiosPublic from "./axiosPublic";
import apiClient from "./axiosPrivate";
export const getPublicAgendaSlot = (agenda_id) => axiosPublic.get(`/agendas/${encodeURIComponent(agenda_id)}/slots/`);
export const getPublicAgenda = (agenda_id) =>
  axiosPublic.get(`/agendas/${encodeURIComponent(agenda_id)}`);
export const getAgendaCitas = (agenda_id) =>
  apiClient.get(`/agendas/${encodeURIComponent(agenda_id)}/citas/`);