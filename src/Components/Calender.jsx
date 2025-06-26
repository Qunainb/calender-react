import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const MyCalendar = () => {
  const events = [
    {
      title: "Test event",
      start: new Date(2025, 5, 6),
      end: new Date(2025, 5, 6),
      allDay: true,
    },
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        toolbar={false}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};
