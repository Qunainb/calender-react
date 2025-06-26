import { create } from "zustand";

export const reminderStore = create((set) => ({
  reminders: {},
  addReminder: (date, reminderText) =>
    set((state) => {
      const exisitingReminder = state.reminders[date] || [];
      return {
        reminders: {
          ...state.reminders,
          [date]: [...exisitingReminder, reminderText],
        },
      };
    }),
}));
