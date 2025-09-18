import React, { useEffect, useState} from "react";
import Modal from "../Modal";
import { notifySuccess, notifyError, notifyInfo} from "../../service/toastService";
import { FiUser, FiCalendar,FiTag } from "react-icons/fi";
import LoadingContent from "../LoadingContent";


export default function ShowCitaModal({
  open,
  onClose,
  cita,
  onLoadEstadoCita,
  estadoCita,
  onChangeAtendido,
  onChangeAtendiendo
}) {
  const [observaciones, setObservaciones] = useState(cita.observaciones || "");
  const [diagnostico, setDiagnostico] = useState(cita.diagnostico || "");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [estadosCita, setEstadosCita] = useState("");

  const getEstadoByName = (name) => {
    return estadosCita.find((e) => e.nombre == name) ?? null;
  }
  const getEstadoById = (id) => {
    return estadosCita.find((e) => e.id == id) ?? null;
  };
  

  const nowISO = () => new Date().toISOString();

  const handleAtender = async () => {
    setIsSubmitting(true);
    try {
      const id_estado = getEstadoByName("realizandose")?.id || null;
      if (!id_estado) Error('Error en cargar ;(');
      const playload = {
        estado: id_estado,
        fecha_hora_atendida: nowISO(),
      };
      const citaResult = await onChangeAtendiendo(cita.id, playload);
      setStatus(getEstadoById(citaResult.estado));
      notifyInfo("Atendiendo al cliente");
    } catch (error) {
      console.error(error);
      notifyError("Error al atender :(");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTerminar = async () => {
    setIsSubmitting(true);
    try {
      if (!diagnostico) {
        setFormError(
          "Debe ingresar un diagnóstico para poder terminar la cita."
        );
        return
      }
      const id_estado = getEstadoByName("realizada")?.id || null;
      if (!id_estado) Error("Error en cargar ;(");

      const playload = {
        estado: id_estado,
        fecha_hora_terminada: nowISO(),
        diagnostico,
        observaciones,
      };
      const citaResult = await onChangeAtendido(cita.id, playload);
      setStatus(getEstadoById(citaResult.estado));
      notifySuccess("Se atendio correctamente");
      setFormError("");
    } catch (error) {
      console.error(error);
      notifyError("Error al atender :(");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    setStatus(cita.estado)
    if (estadoCita) {
      setEstadosCita(estadoCita)
      return;
    }
    const result = onLoadEstadoCita();
    setEstadosCita(result.results);
   
  }, [cita]);

  const buttonsByStatus = {
    confirmada: (
      <button
        onClick={handleAtender}
        className="px-4 py-2  bg-[#4db5ca] text-white rounded hover:bg-[#3a96a8]"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingContent /> : "Atender Cita"}
      </button>
    ),
    realizandose: (
      <button
        onClick={handleTerminar}
        className="px-4 py-2 bg-[#62b1b1] text-white rounded hover:bg-[#459797]"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingContent /> : "Terminar Cita"}
      </button>
    ),
  };


  if (!open || !cita) return null;

  return (
    <Modal
      title={`Detalles de la Cita #${cita.cod_cita ?? "ni codigo :("}`}
      onClose={() => { onClose(); setFormError("");}}
      buttonAccept={ buttonsByStatus[status?.nombre] || null }
    >
      <div className="p-5 bg-gray-50 rounded-lg border border-slate-200 mb-6">
        <div className="flex items-center pb-4 mb-4 border-b border-slate-200">
          <FiUser className="text-2xl text-slate-500 w-6 h-6" />
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-slate-800">
              {cita.paciente.usuario.nombre_completo}
            </h3>
            <p className="text-sm text-slate-500">
              DNI: {cita.paciente.usuario.dni}
            </p>
            <p className="text-sm text-slate-500">
              Correo: {cita.paciente.usuario.email}
            </p>
            <p className="text-sm text-slate-500">
              Telefono: {cita.paciente.usuario.telefonos[0].numero}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-start">
            <FiCalendar className="text-xl text-gray-500 mt-1" />
            <div className="ml-3">
              <p className="font-semibold text-slate-700">Fecha Programada</p>
              <p className="text-slate-600">
                {new Date(cita.fecha_hora_establecida).toLocaleString("es-ES", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FiTag className="text-xl text-gray-500 mt-1" />
            <div className="ml-3">
              <p className="font-semibold text-slate-700">Estado Actual</p>
              <div className="flex items-center">
                {/* Ejemplo de lógica para el color del estado */}
                <span
                  className={`h-3 w-3 rounded-full mr-2 ${
                    status?.nombre === "pendiente"
                      ? "bg-yellow-500"
                      : status?.nombre === "cancelada"
                      ? "bg-red-500"
                      : status?.nombre === "confirmada"
                      ? "bg-blue-600"
                      : status?.nombre === "realizada"
                      ? "bg-green-500"
                      : status?.nombre === "reprogramada"
                      ? "bg-amber-500"
                      : status?.nombre === "realizandose"
                      ? "bg-indigo-500"
                      : "bg-gray-500"
                  }`}
                ></span>
                <span className="font-semibold capitalize text-slate-600">
                  {status?.nombre || "No definido"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formError && <p className="text-red-600 mb-1">{formError}</p>}

      {(status?.nombre === "realizandose" ||
        status?.nombre === "realizada") && (
        <>
          <label className="block mb-2 font-semibold text-gray-700">
            Diagnóstico:
            <textarea
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              disabled={status?.nombre === "realizada"}
              className="w-full mt-1 p-2 border border-gray-300 rounded disabled:bg-gray-100"
              rows="4"
            />
          </label>
          <label className="block mb-3 font-semibold text-gray-700">
            Observaciones:
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              disabled={status?.nombre === "realizada"}
              className="w-full mt-1 p-2 border border-gray-300 rounded disabled:bg-gray-100"
              rows="3"
            />
          </label>
        </>
      )}
    </Modal>
  );
}
