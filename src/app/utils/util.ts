// Function that generate random string of length n
export function randomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Some pro tips!
export const PRO_TIPS = [
  "Haz doble click en las tareas para editarlas!",
  "Presiona Enter en tu teclado para guardar las tareas!",
  "Presiona Esc para cancelar la edición de tus tareas!",
  "Recuerda siempre tomar agüita 🚰",
  "Completa tus tareas, evita la procrastinación!",
];
