
import React, { useState } from "react";
import AlertMessage from "../AlertMessage";
import useGetMedicoEspecialidades from "../../hooks/medico/useMedicoEspecialidad";

export default function SelectEspecialidad({ value, onChange, label = "Ver por especialidad:" }) {
  const {
    data: especialidades,
    loading,
    error,
    refetch,
  } = useGetMedicoEspecialidades();

  return (
    <div className="my-3 flex items-center gap-5">
      <label htmlFor="select-especialidad" className="text-gray-600">
        {label}
      </label>

      <select
        id="select-especialidad"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border px-3 py-1 bg-white"
        disabled={loading}
      >
        <option value="">Todas</option>
        {(especialidades?.results || []).map((s) => (
          <option key={s.id} value={s.id}>
            {s.nombre || "Sin nombre"}
          </option>
        ))}
      </select>

      {loading && (
        <span className="text-sm text-gray-500">Cargando...</span>
      )}

      {error && (
        <AlertMessage title="Error" type="warning">
          No se pudieron cargar las especialidades.{" "}
          <button onClick={refetch} className="underline">
            Reintentar
          </button>
        </AlertMessage>
      )}

      {value && (
        <span className="ml-2 inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
          Mostrando:{" "}
          {especialidades?.results?.find((e) => e.id === value)?.nombre ||
            "Seleccionada"}
        </span>
      )}
    </div>
  );
}