import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { reminderStore } from "../store";
import { useState } from "react";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [remindertext, setReminderText] = useState("");

  const reminders = reminderStore((state) => state.reminders);
  const addReminder = reminderStore((state) => state.addReminder);

  function handleClick(slot) {
    setSelectedDate(slot.start);
  }

  const reminderEvents = Object.entries(reminders).flatMap(
    ([dateKey, reminderText]) =>
      reminderText.map((text) => ({
        title: text,
        start: new Date(dateKey),
        end: new Date(dateKey),
        allDay: true,
      }))
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={reminderEvents}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        toolbar={false}
        selectable={true}
        popup={true}
        onSelectSlot={handleClick}
        style={{ height: 500, margin: "50px" }}
      />

      {selectedDate && (
        <div>
          <input
            type="text"
            value={remindertext}
            onChange={(e) => setReminderText(e.target.value)}
          />
          <button
            onClick={() => {
              if (!selectedDate || !remindertext) return;

              const formattedDate = format(selectedDate, "yyyy-MM-dd");
              addReminder(formattedDate, remindertext);
              setReminderText("");
              setSelectedDate(null);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
