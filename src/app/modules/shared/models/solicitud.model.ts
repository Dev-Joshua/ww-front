export interface Solicitud {
  id: number;
  fecha_solicitud: string;
  servicio: Servicio;
  mascota: Mascota;
  estado: EstadoSolicitud;
  usuario: Usuario;
  prestador: Usuario;
}

// Enum para el estado de la solicitud
export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  ACEPTADO = 'ACEPTADO',
  EN_CURSO = 'EN_CURSO',
  FINALIZADO = 'FINALIZADO',
}

export interface Servicio {
  id_servicio: number;
  nombre_servicio: string;
}

export interface Mascota {
  id_mascota: number;
  nombre: string;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  email: string;
}
