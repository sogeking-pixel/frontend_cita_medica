import axiosPublic from "./axiosPublic";
export const getPublicMedicoEspecialidadDetails = (me_id) =>
  axiosPublic.get(`/medico-especialidades/${encodeURIComponent(me_id)}`);
export const getPublicMedicoEspecialidad = (medico_id, especialidad_id) =>
  axiosPublic.get(
    `/medico-especialidades/`, {
      params: {
        medico: medico_id,
        especialidad: especialidad_id,
      },
    }
  );
