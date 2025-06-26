import { create } from "zustand";

// export const reminderStore = create((set) => ({
//   reminders: {},
//   addReminder: (date, text) =>
//     set((state) => {
//       const existing = state.reminders[date] || [];
//       return {
//         ...state.reminders,
//         [dateKey]: [...existing, text],
//       };
//     }),
// }));

export const reminderStore = create((set) => ({
  reminders: {},
  addReminder: (date, reminderText) =>
    set((state) => {
      const exisitingReminder = state.reminders[date] || [];
      return {
        ...state.reminders,
        [date]: [...exisitingReminder, reminderText],
      };
    }),
}));
