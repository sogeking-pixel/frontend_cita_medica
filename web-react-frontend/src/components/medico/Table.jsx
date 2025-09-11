import React from "react";

export default function Table({
  columns = [],
  data = [],
  keyField = "id",
  className = "",
  emptyMessage = "No hay datos.",
  title = "Por default",
  loading = false
}) {
  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-6 ${className}`}
    >
      <h2 className="text-xl font-bold text-[#045858e1] mb-4 ">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, ri) => (
                <tr key={ri} className="border-b">
                  {columns.map((_, ci) => (
                    <td key={ci} className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, ri) => (
                <tr
                  key={row[keyField] ?? ri}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, ci) => {
                    const content = col.render
                      ? col.render(row)
                      : row[col.accessor];
                    return (
                      <td
                        key={ci}
                        className={`px-6 py-4 ${col.className || ""}`}
                      >
                        {content ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
