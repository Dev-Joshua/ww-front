export interface Mascota {
  id_mascota: number;
  tipo_mascota?: string;
  nombre: string;
  edad: string;
  raza: string;
  peso: string;
  tamano: string;
  sexo?: string;
  esterilizado?: string;
  descripcion_mascota: string;
  info_cuidado: string;
  foto_mascota: string;
  usuario_id: number;
}
