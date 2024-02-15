import type { ReactNode } from "react";

export enum DefaultCategories {
  ALIMENTACION = "Alimentación",
  FARMACIA = "Farmacia",
  VIVIENDA = "Vivienda",
  GIMNASIO = "Gimnasio",
  SALUD = "Salud",
  SERVICIOS = "Servicios",
  ENTRETENCION = "Entretencion",
  COMBUSTIBLE = "Combustible",
  REGALOS = "Regalos",
  VIAJES = "Viajes",
  VACACIONES = "Vacaciones",
  VEHICULO = "Vehículo",
  AHORRO = "Ahorro",
  HERRAMIENTAS = "Herramientas",
  TRANSPORTE = "Transporte",
  ROPA = "Ropa",
}

export interface Category {
  name: string;
  //subcategory: string;
}

export function categoryColor(category?: Category): string {
  switch (category?.name) {
    case DefaultCategories.ALIMENTACION:
      return "bg-green-300 text-green-900";
    case DefaultCategories.FARMACIA:
      return "bg-blue-300 text-blue-900";
    case DefaultCategories.VIVIENDA:
      return "bg-orange-300 text-orange-900";
    case DefaultCategories.GIMNASIO:
      return "bg-purple-300 text-purple-900";
    case DefaultCategories.SALUD:
      return "bg-rose-300 text-rose-900";
    case DefaultCategories.SERVICIOS:
      return "bg-emerald-300 text-emerald-900";
    case DefaultCategories.ENTRETENCION:
      return "bg-cyan-300 text-cyan-900";
    case DefaultCategories.COMBUSTIBLE:
      return "bg-red-300 text-red-900";
    case DefaultCategories.REGALOS:
      return "bg-fuchsia-300 text-fuchsia-900";
    case DefaultCategories.VIAJES:
      return "bg-teal-300 text-teal-900";
    case DefaultCategories.VACACIONES:
      return "bg-lime-300 text-lime-900";
    case DefaultCategories.VEHICULO:
      return "bg-sky-300 text-sky-900";
    case DefaultCategories.AHORRO:
      return "bg-violet-300 text-violet-900";
    case DefaultCategories.HERRAMIENTAS:
      return "bg-yellow-300 text-yellow-900";
    case DefaultCategories.TRANSPORTE:
      return "bg-amber-300 text-amber-900";
    case DefaultCategories.ROPA:
      return "bg-pink-300 text-pink-900";
    default:
      return "bg-slate-300 text-slate-900";
  }
}
