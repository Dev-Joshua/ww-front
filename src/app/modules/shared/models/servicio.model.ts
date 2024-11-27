export interface Servicio {
  map(arg0: (service: any) => any): any[];
  id_servicio: number;
  nombre_servicio: string;
  descripcion: string;
}
