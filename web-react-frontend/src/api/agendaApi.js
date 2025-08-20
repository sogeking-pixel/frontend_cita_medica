import axiosPublic from "./axiosPublic";
export const getPublicAgendaSlot = (agenda_id) => axiosPublic.get(`/agendas/${encodeURIComponent(agenda_id)}/slots/`);