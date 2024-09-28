export interface Task {
  nombreTarea: string;
  fechaLimite: string;
  personas: Array<{ nombre: string; edad: number; habilidades: string[] }>;
  completada: boolean;
}
