export interface Usuario {
  id_usuario: number;
  foto_usuario: string;
  nombre: string;
  apellidos: string;
  documento_identidad: string;
  ciudad: string;
  direccion: string;
  celular: string;
  email: string;
  contrasena?: string;
  rol: string;
}
