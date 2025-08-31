import axiosPublic from "./axiosPublic";
export const getPublicMedicoEspecialidad = (me_id) =>
  axiosPublic.get(`/medico-especialidades/${encodeURIComponent(me_id)}`);
