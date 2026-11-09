// TODO: reemplazar por la API cuando exista. `at` sin zona horaria a propósito (evita desajustes de hidratación).
export type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  at: string; // yyyy-MM-ddTHH:mm
  files?: File[];
};

export type Chat = { appointmentId: string; title: string; unread: number; messages: Message[] };

export const CHATS: Chat[] = [
  {
    appointmentId: "2",
    title: "Firulais · Cita médica",
    unread: 1,
    messages: [
      { id: "a", from: "me", text: "Hola, Firulais lleva dos días sin comer bien.", at: "2026-11-03T09:12" },
      { id: "b", from: "them", text: "Hola, gracias por avisar. ¿Ha tenido vómito o diarrea?", at: "2026-11-03T09:40" },
      { id: "c", from: "them", text: "Si puedes, envíanos una foto de sus encías antes de la cita.", at: "2026-11-03T09:41" },
    ],
  },
  {
    appointmentId: "3",
    title: "Luna · Cita médica",
    unread: 0,
    messages: [
      { id: "d", from: "them", text: "Recuerda traer su cartilla de vacunación.", at: "2026-11-02T16:05" },
      { id: "e", from: "me", text: "Perfecto, ahí estaremos.", at: "2026-11-02T16:20" },
    ],
  },
  {
    appointmentId: "1",
    title: "Firulais · Cita para estética",
    unread: 0,
    messages: [],
  },
];
