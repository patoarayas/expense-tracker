import type { ReactNode } from "react";

export enum DefaultCategories {
  ALIMENTACION = "Alimentación",
  VIVIENDA = "Vivienda",
  SALUD = "Salud",
  SERVICIOS = "Servicios",
  ENTRETENCION = "Entretencion",
  OTROS_GASTOS = "Otros gastos",
  VACACIONES = "Vacaciones",
  AHORRO = "Ahorro",
  PASATIEMPOS = "Pasatiempos",
  TRANSPORTE = "Transporte",
  RETAIL = "Retail",
  EDUCACION = "Educación",
  SIN_CATEGORIZAR = "Sin categorizar",
}

export interface Category {
  name: string;
  subcategory?: string;
}

export function categoryColor(category?: Category): string {
  switch (category?.name) {
    case DefaultCategories.ALIMENTACION:
      return "lime"; //"bg-lime-300 text-lime-900 fill-lime-300";
    case DefaultCategories.VIVIENDA:
      return "emerald"; //"bg-emerald-300 text-emerald-900 fill-emerald-300";
    case DefaultCategories.SALUD:
      return "rose"; //"bg-rose-300 text-rose-900 fill-rose-300";
    case DefaultCategories.SERVICIOS:
      return "fuchsia"; //"bg-fuchsia-300 text-fuchsia-900 fill-fuchsia-300";
    case DefaultCategories.ENTRETENCION:
      return "cyan"; //"bg-cyan-300 text-cyan-900 fill-cyan-300";
    case DefaultCategories.VACACIONES:
      return "teal"; //"bg-teal-300 text-teal-900 fill-teal-300";
    case DefaultCategories.TRANSPORTE:
      return "red"; //"bg-red-300 text-red-900 fill-red-300";
    case DefaultCategories.AHORRO:
      return "violet"; //"bg-violet-300 text-violet-900 fill-violet-300";
    case DefaultCategories.PASATIEMPOS:
      return "amber"; //"bg-amber-300 text-amber-900 fill-amber-300";
    case DefaultCategories.RETAIL:
      return "pink"; //"bg-pink-300 text-pink-900 fill-pink-300";
    case DefaultCategories.OTROS_GASTOS:
      return "slate"; //"bg-slate-300 text-slate-900 fill-slate-300";
    case DefaultCategories.EDUCACION:
      return "blue"; //"bg-blue-300 text-blue-900 fill-blue-300";
    case DefaultCategories.SIN_CATEGORIZAR:
      return "neutral"; //"bg-neutral-300 text-neutral-900 fill-neutral-300";
    default:
      return "neutral"; //"bg-neutral-300 text-neutral-900 fill-neutral-300";
  }
}
