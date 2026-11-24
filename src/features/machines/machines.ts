import type { HelpLevel, Machine, MachineStatus, RepeatConfidence, WriteupVisibility } from "../../types";
import { normalizeWriteup } from "./writeup";

/**
 * Catálogos sugeridos. Son extensibles: los campos aceptan texto libre y
 * los valores nuevos que cargues se suman a las sugerencias automáticamente.
 */
export const catalogs = {
  platforms: ["Hack The Box", "TryHackMe", "DockerLabs", "VulnHub", "Proving Grounds"],
  os: ["Linux", "Windows", "FreeBSD", "Otro", "Desconocido"],
  difficulties: ["Starting Point", "Very Easy", "Easy", "Medium", "Hard", "Insane"],
  certifications: ["eJPT", "eCPPT", "CPTS", "CWES", "CDSA", "OSCP", "PNPT"],
  techniques: ["Enumeración de servicios", "Fuerza bruta", "SQL injection", "LFI", "RCE", "Credenciales por defecto", "FTP anónimo", "SMB", "Escalada por SUID", "Escalada por sudo", "Reverse shell"],
  tools: ["nmap", "gobuster", "ffuf", "curl", "netcat", "smbclient", "ftp", "sqlmap", "hydra", "john", "Burp Suite", "Metasploit", "linpeas"],
  aiAssistants: ["ChatGPT", "Codex", "Claude"],
};

export const machineStatuses: MachineStatus[] = ["Pendiente", "En progreso", "Resuelta", "Abandonada"];
export const helpLevels: HelpLevel[] = ["Sin ayuda", "Pista", "IA", "Walkthrough parcial", "Walkthrough completo"];
export const repeatOptions: RepeatConfidence[] = ["Sí", "Con dudas", "No"];
export const visibilities: WriteupVisibility[] = ["Privado", "Publicable"];

const difficultyRank: Record<string, number> = { "starting point": 0, "very easy": 1, easy: 2, medium: 3, hard: 4, insane: 5 };

export const LIMITS = { name: 120, short: 200, url: 2048, notes: 50_000, tag: 60, tags: 40 };

export function emptyMachine(): Omit<Machine, "id" | "createdAt" | "updatedAt"> {
  return {
    name: "", platform: "Hack The Box", url: "", os: "Linux", difficulty: "Easy", startingPointTier: null,
    status: "Pendiente", startedAt: "", completedAt: "", minutes: 0, labIp: "",
    certifications: [], techniques: [], tools: [], notes: "", writeupUrl: "", writeupVisibility: "Privado",
    helpLevel: "Sin ayuda", aiAssistants: [], personalDifficulty: 3, learnedConcept: "", reviewConcept: "",
    canRepeatAlone: "Con dudas", relatedModuleIds: [], relatedSectionIds: [],
  };
}

const text = (value: unknown, max: number) => (typeof value === "string" ? value : "").trim().slice(0, max);
const list = (value: unknown) => {
  const items = Array.isArray(value) ? value : typeof value === "string" ? value.split(/[,;|]/) : [];
  const clean = items.map((item) => text(item, LIMITS.tag)).filter(Boolean);
  return [...new Map(clean.map((item) => [item.toLowerCase(), item])).values()].slice(0, LIMITS.tags);
};
const oneOf = <T extends string>(value: unknown, options: readonly T[], fallback: T): T => options.find((option) => option.toLowerCase() === String(value ?? "").trim().toLowerCase()) ?? fallback;
const isoDate = (value: unknown) => { const v = text(value, 10); return /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00`)) ? v : ""; };

/** Solo http(s): bloquea javascript:, data: y otros esquemas peligrosos en enlaces. */
export function safeUrl(value: unknown) {
  const v = text(value, LIMITS.url);
  if (!v) return "";
  try { const url = new URL(v); return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : ""; } catch { return ""; }
}

/** IPv4 o IPv6 simple; cualquier otra cosa se descarta. */
export function safeIp(value: unknown) {
  const v = text(value, 45);
  if (/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(v)) return v;
  if (/^[0-9a-f:]+$/i.test(v) && v.includes(":")) return v;
  return "";
}

/** Normaliza y valida una máquina venga de donde venga (formulario, respaldo, nube o CSV). */
export function normalizeMachine(value: unknown): Machine | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const name = text(raw.name, LIMITS.name);
  if (!name) return null;
  const now = new Date().toISOString();
  const status = oneOf(raw.status, machineStatuses, "Pendiente");
  const tier = Number(raw.startingPointTier);
  const difficulty = text(raw.difficulty, 40) || "Desconocida";
  const startedAt = isoDate(raw.startedAt);
  let completedAt = isoDate(raw.completedAt);
  if (completedAt && startedAt && completedAt < startedAt) completedAt = startedAt;
  return {
    id: text(raw.id, 80) || crypto.randomUUID(),
    name,
    platform: text(raw.platform, 60) || "Otra",
    url: safeUrl(raw.url),
    os: text(raw.os, 40) || "Desconocido",
    difficulty,
    startingPointTier: difficulty.toLowerCase() === "starting point" && [0, 1, 2].includes(tier) && raw.startingPointTier !== null && raw.startingPointTier !== "" ? tier : null,
    status,
    startedAt,
    completedAt,
    minutes: Math.min(100_000, Math.max(0, Math.round(Number(raw.minutes) || 0))),
    labIp: safeIp(raw.labIp),
    certifications: list(raw.certifications),
    techniques: list(raw.techniques),
    tools: list(raw.tools),
    notes: text(raw.notes, LIMITS.notes),
    writeupUrl: safeUrl(raw.writeupUrl),
    writeupVisibility: oneOf(raw.writeupVisibility, visibilities, "Privado"),
    helpLevel: oneOf(raw.helpLevel, helpLevels, "Sin ayuda"),
    aiAssistants: list(raw.aiAssistants),
    personalDifficulty: Math.min(5, Math.max(1, Math.round(Number(raw.personalDifficulty) || 3))),
    learnedConcept: text(raw.learnedConcept, 1000),
    reviewConcept: text(raw.reviewConcept, 1000),
    canRepeatAlone: oneOf(raw.canRepeatAlone, repeatOptions, "Con dudas"),
    relatedModuleIds: list(raw.relatedModuleIds),
    relatedSectionIds: list(raw.relatedSectionIds),
    writeup: normalizeWriteup(raw.writeup),
    createdAt: text(raw.createdAt, 40) || now,
    updatedAt: text(raw.updatedAt, 40) || now,
  };
}

export function normalizeMachines(value: unknown): Machine[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.map(normalizeMachine).filter((machine): machine is Machine => Boolean(machine));
}

/** Clave para detectar duplicados: plataforma + nombre, sin importar mayúsculas. */
export const machineKey = (machine: Pick<Machine, "platform" | "name">) => `${machine.platform.trim().toLowerCase()}::${machine.name.trim().toLowerCase()}`;

/**
 * Indicador de aprendizaje (0–100), separado del estado de resolución:
 * mide autonomía (ayuda recibida) y si podrías repetirla solo.
 */
export function learningScore(machine: Machine) {
  if (machine.status === "Pendiente") return null;
  const help: Record<HelpLevel, number> = { "Sin ayuda": 60, Pista: 45, IA: 30, "Walkthrough parcial": 20, "Walkthrough completo": 5 };
  const repeat: Record<RepeatConfidence, number> = { "Sí": 40, "Con dudas": 20, No: 0 };
  return help[machine.helpLevel] + repeat[machine.canRepeatAlone];
}

export function learningLabel(score: number | null) {
  if (score === null) return "Sin empezar";
  if (score >= 80) return "Dominada";
  if (score >= 50) return "En consolidación";
  return "Repasar";
}

export interface MachineFilters {
  query: string;
  platform: string;
  difficulty: string;
  os: string;
  status: string;
  certification: string;
  technique: string;
  from: string;
  to: string;
  sort: "name" | "difficulty" | "completedAt" | "minutes";
  direction: "asc" | "desc";
  layout: "cards" | "table";
}

export const defaultFilters: MachineFilters = { query: "", platform: "", difficulty: "", os: "", status: "", certification: "", technique: "", from: "", to: "", sort: "completedAt", direction: "desc", layout: "cards" };

const includesTag = (tags: string[], tag: string) => tags.some((item) => item.toLowerCase() === tag.toLowerCase());

/** Todos los filtros se combinan (AND). El rango de fechas usa la fecha de resolución o, si no hay, la de inicio. */
export function filterMachines(machines: Machine[], filters: MachineFilters) {
  const query = filters.query.trim().toLowerCase();
  const result = machines.filter((machine) => {
    const date = machine.completedAt || machine.startedAt;
    return (!query || machine.name.toLowerCase().includes(query))
      && (!filters.platform || machine.platform === filters.platform)
      && (!filters.difficulty || machine.difficulty === filters.difficulty)
      && (!filters.os || machine.os === filters.os)
      && (!filters.status || machine.status === filters.status)
      && (!filters.certification || includesTag(machine.certifications, filters.certification))
      && (!filters.technique || includesTag(machine.techniques, filters.technique))
      && (!filters.from || (date !== "" && date >= filters.from))
      && (!filters.to || (date !== "" && date <= filters.to));
  });
  const factor = filters.direction === "asc" ? 1 : -1;
  const rank = (machine: Machine) => difficultyRank[machine.difficulty.toLowerCase()] ?? 99;
  return result.sort((a, b) => {
    let diff = 0;
    if (filters.sort === "name") diff = a.name.localeCompare(b.name, "es");
    else if (filters.sort === "difficulty") diff = rank(a) - rank(b);
    else if (filters.sort === "minutes") diff = a.minutes - b.minutes;
    else diff = (a.completedAt || "").localeCompare(b.completedAt || "");
    return diff * factor || a.name.localeCompare(b.name, "es");
  });
}

const countBy = (values: string[]) => {
  const map = new Map<string, number>();
  for (const value of values) if (value) map.set(value, (map.get(value) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
};

export function machineStats(machines: Machine[]) {
  const by = (status: MachineStatus) => machines.filter((machine) => machine.status === status).length;
  const solved = by("Resuelta");
  const scores = machines.map(learningScore).filter((score): score is number => score !== null);
  return {
    total: machines.length,
    pending: by("Pendiente"),
    inProgress: by("En progreso"),
    solved,
    abandoned: by("Abandonada"),
    completion: machines.length ? Math.round((solved / machines.length) * 100) : 0,
    minutes: machines.reduce((sum, machine) => sum + machine.minutes, 0),
    learning: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    byDifficulty: countBy(machines.map((machine) => machine.difficulty)),
    byOs: countBy(machines.map((machine) => machine.os)),
    topTechniques: countBy(machines.flatMap((machine) => machine.techniques)).slice(0, 8),
  };
}

/** Sugerencias = catálogo base + todo lo que ya cargaste. */
export function suggestions(machines: Machine[]) {
  const merge = (base: string[], extra: string[]) => [...new Map([...base, ...extra].filter(Boolean).map((item) => [item.toLowerCase(), item])).values()];
  return {
    platforms: merge(catalogs.platforms, machines.map((m) => m.platform)),
    os: merge(catalogs.os, machines.map((m) => m.os)),
    difficulties: merge(catalogs.difficulties, machines.map((m) => m.difficulty)),
    certifications: merge(catalogs.certifications, machines.flatMap((m) => m.certifications)),
    techniques: merge(catalogs.techniques, machines.flatMap((m) => m.techniques)),
    tools: merge(catalogs.tools, machines.flatMap((m) => m.tools)),
    aiAssistants: merge(catalogs.aiAssistants, machines.flatMap((m) => m.aiAssistants)),
  };
}

const FILTERS_KEY = "cyberstudy:machines:filters:v1";

export function loadFilters(): MachineFilters {
  try {
    const saved = JSON.parse(localStorage.getItem(FILTERS_KEY) ?? "null") as Partial<MachineFilters> | null;
    if (!saved || typeof saved !== "object") return defaultFilters;
    const merged = { ...defaultFilters };
    for (const key of Object.keys(defaultFilters) as (keyof MachineFilters)[]) if (typeof saved[key] === "string") (merged as Record<string, string>)[key] = saved[key] as string;
    return merged;
  } catch { return defaultFilters; }
}

export function saveFilters(filters: MachineFilters) {
  try { localStorage.setItem(FILTERS_KEY, JSON.stringify(filters)); } catch { /* Preferencia opcional. */ }
}
