import type { ComponentProps } from "react";
import type { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Theme } from "@/styles/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

/** Chave das cores em `theme.colors.discipline` */
export type DisciplineKey = keyof Theme["colors"]["discipline"];

export interface DisciplineInfo {
  key: DisciplineKey;
  label: string;
  icon: IconName;
}

/**
 * Normaliza um nome de disciplina para uso como chave:
 * minúsculas, sem acento, sem pontuação, espaços colapsados.
 */
export function normalizeDiscipline(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

interface RawDiscipline extends DisciplineInfo {
  /** nomes alternativos que também devem casar com esta disciplina */
  aliases?: string[];
}

// Mesma lista e aliases do web; as cores ficam no tema (theme.colors.discipline)
const RAW: RawDiscipline[] = [
  { key: "biologia", label: "Biologia", icon: "leaf" },
  { key: "fisica", label: "Física", icon: "atom" },
  { key: "matematica", label: "Matemática", icon: "calculator-variant" },
  { key: "quimica", label: "Química", icon: "flask" },
  { key: "geografia", label: "Geografia", icon: "earth" },
  { key: "historia", label: "História", icon: "bank" },
  { key: "portugues", label: "Português", icon: "book-open-variant", aliases: ["lingua portuguesa"] },
  { key: "artes", label: "Artes", icon: "palette", aliases: ["arte"] },
  { key: "edfisica", label: "Ed. Física", icon: "soccer", aliases: ["ed fisica", "educacao fisica", "educ fisica"] },
  { key: "filosofia", label: "Filosofia", icon: "brain" },
];

export const DISCIPLINE_LIST: DisciplineInfo[] = RAW;

const DISCIPLINES: Record<string, DisciplineInfo> = RAW.reduce(
  (acc, { aliases = [], ...d }) => {
    acc[normalizeDiscipline(d.label)] = d;
    for (const alias of aliases) acc[normalizeDiscipline(alias)] = d;
    return acc;
  },
  {} as Record<string, DisciplineInfo>,
);

export const NEUTRAL_DISCIPLINE: DisciplineInfo = {
  key: "geral",
  label: "Geral",
  icon: "book-outline",
};

/**
 * Resolve a disciplina a partir do texto livre de `post.discipline`.
 * Faz match por nome normalizado; cai para NEUTRAL_DISCIPLINE se não reconhecer.
 */
export function getDiscipline(value?: string | null): DisciplineInfo {
  if (!value) return NEUTRAL_DISCIPLINE;
  return DISCIPLINES[normalizeDiscipline(value)] ?? NEUTRAL_DISCIPLINE;
}
