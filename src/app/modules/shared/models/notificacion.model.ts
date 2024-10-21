export interface Notificacion {
  id: number;
  mensaje: string;
  fechaNotificacion: string;
  leido: boolean;
  solicitudId: number; // Referencia a la solicitud
}
