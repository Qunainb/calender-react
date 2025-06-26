import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { reminderStore } from "../store";
import { useEffect, useState } from "react";

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

  const [weather, setWeather] = useState();

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

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "http://api.weatherstack.com/current?access_key=36944985d0b512bd4003a131d4346fab&query=Srinagar"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather");
      }

      const data = await response.json();

      setWeather(data);
    }

    if (
      selectedDate &&
      format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    ) {
      fetchWeather();
    } else {
      setWeather(null);
    }
  }, [selectedDate]);

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
      <div>
        {weather ? (
          <div>
            <p>🌤️ Temperature: {weather.current.temperature}°C</p>
            <p>☁️ Condition: {weather.current.weather_descriptions[0]}</p>
          </div>
        ) : (
          <p>No weather data for this date.</p>
        )}
      </div>
    </div>
  );
};
