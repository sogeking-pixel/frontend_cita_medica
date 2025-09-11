import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
moment.locale("es");

const localizer = momentLocalizer(moment);

export default function CalendarPanel({
  onSelectAgendas,
  getMedicoAgenda,
  button,
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  const getAgendasLoad = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const firstDay = moment(date).startOf("month").format("YYYY-MM-DD");
      const lastDay = moment(date).endOf("month").format("YYYY-MM-DD");
      
      const response = await getMedicoAgenda(firstDay, lastDay);
      const formattedEvents = response.results;

      const groupedByDate = formattedEvents.reduce((acc, event) => {
        const dateKey = event.fecha;
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);
        return acc;
      }, {});

      const summarizedEvents = Object.keys(groupedByDate).map(
        (dateKey, index) => {
          const eventsOfDay = groupedByDate[dateKey];
          return {
            id: `summary-${index}`,
            title: `${eventsOfDay.length} agendas`,
            date: dateKey,
            allAgendas: eventsOfDay,
            start: new Date(dateKey),
            end: new Date(dateKey),
          };
        }
      );

      setEvents(summarizedEvents);
    } catch (error) {
      console.error(error)
      setError("No se pudieron cargar las agendas. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    getAgendasLoad(currentDate);
  }, [currentDate, getAgendasLoad]);

   const handleNavigate = (newDate, _, action) => {
    if (action === "DATE") return;
    setCurrentDate(newDate);
   };
  
  const handleShowAgendas = (event) => {
    const infoAgendas = {
      allAgendas: event?.allAgendas ?? [],
      date: event?.date ?? "",
    };
    onSelectAgendas(infoAgendas);
    console.log(infoAgendas);
  };


  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <h2 className="text-lg font-medium mb-3">Calendario</h2>
          <p className="text-sm text-gray-600 mb-3">
            Haz clic en un dia para ver disponibilidades.
          </p>
        </div>
        <div>{button}</div>
      </div>
      <div className="">
        <Calendar
          localizer={localizer}
          events={events} //lista de evento que mostrar el calendario :/
          startAccessor="start"
          endAccessor="end"
          style={{ height: 560 }}
          views={["month"]}
          onNavigate={handleNavigate}
          onSelectEvent={handleShowAgendas}
          selectable
          date={currentDate}
          popup={false}
          components={{
            event: ({ event }) => (
              <div className="flex items-center self gap-2 py-2">
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                  {event.allAgendas.length}
                </span>
                <span className="text-sm">Agendas</span>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
