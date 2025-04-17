import * as z from "zod";

export const appointmentFormSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string().min(10, {
    message: "Пожалуйста, введите корректный номер телефона",
  }),
  date: z.date({
    required_error: "Пожалуйста, выберите дату",
  }),
  time: z.string({
    required_error: "Пожалуйста, выберите время",
  }),
  service: z.string({
    required_error: "Пожалуйста, выберите услугу",
  }),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export const availableTimes = [
  "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00"
];

export const serviceOptions = [
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
  { value: "gel-polish", label: "Гель-лак" },
  { value: "nail-extension", label: "Наращивание" },
  { value: "nail-repair", label: "Ремонт ногтей" }
];
