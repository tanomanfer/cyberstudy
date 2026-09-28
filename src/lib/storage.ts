import type { CertificationPath, CyberStudyData, StudyModule, StudySection } from "../types";

const STORAGE_KEY = "cyberstudy:data:v3";
const BACKUP_KEY = "cyberstudy:data:v3:backup";
const V2_KEY = "cyberstudy:data:v2";
const LEGACY_KEY = "cyberstudy:data:v1";
const TIMER_KEY = "cyberstudy:timer:v1";

const juniorPath: CertificationPath = {
  id: "htb-junior-cybersecurity-analyst",
  title: "Junior Cybersecurity Analyst",
  certification: "CJCA",
  platform: "Hack The Box Academy",
  status: "En progreso",
  progress: 9.7,
  totalCourses: 20,
  notes: "Ruta de rol profesional de HTB Academy. Los cursos se ordenan como aparecen en la ruta oficial.",
  url: "https://academy.hackthebox.com/path/preview/junior-cybersecurity-analyst",
  createdAt: "2026-09-27T12:00:00.000Z",
};

export const emptyData: CyberStudyData = {
  version: 3,
  dailyGoalMinutes: 120,
  paths: [],
  modules: [],
  sections: [],
  sessions: [],
  frozenDays: [],
};

export function loadData(): CyberStudyData {
  for (const key of [STORAGE_KEY, BACKUP_KEY, V2_KEY, `${V2_KEY}:backup`, LEGACY_KEY, `${LEGACY_KEY}:backup`]) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = normalizeData(JSON.parse(raw));
      if (parsed) return parsed;
    } catch {
      // Si la copia principal está dañada, intentamos recuperar la secundaria.
    }
  }
  return structuredClone(emptyData);
}

export function saveData(data: CyberStudyData) {
  const serialized = JSON.stringify(data);
  const previous = localStorage.getItem(STORAGE_KEY);
  if (previous) localStorage.setItem(BACKUP_KEY, previous);
  localStorage.setItem(STORAGE_KEY, serialized);
  return new Date().toISOString();
}

export function exportData(data: CyberStudyData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `cyberstudy-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<CyberStudyData> {
  const parsed = normalizeData(JSON.parse(await file.text()));
  if (!parsed) throw new Error("El archivo no es un respaldo válido de CyberStudy.");
  return parsed;
}

export function normalizeData(value: unknown): CyberStudyData | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { version?: number; dailyGoalMinutes?: number; paths?: CertificationPath[]; modules?: StudyModule[]; sections?: StudySection[]; sessions?: CyberStudyData["sessions"]; frozenDays?: CyberStudyData["frozenDays"] };
  if (!Array.isArray(candidate.modules) || !Array.isArray(candidate.sessions) || !Array.isArray(candidate.frozenDays)) return null;
  if (candidate.version === 1) return migrateV1(candidate as { dailyGoalMinutes?: number; modules: StudyModule[]; sessions: CyberStudyData["sessions"]; frozenDays: CyberStudyData["frozenDays"] });
  if (candidate.version === 2 && Array.isArray(candidate.sections)) return migrateV2(candidate as { dailyGoalMinutes?: number; modules: StudyModule[]; sections: StudySection[]; sessions: CyberStudyData["sessions"]; frozenDays: CyberStudyData["frozenDays"] });
  if (candidate.version !== 3 || !Array.isArray(candidate.sections) || !Array.isArray(candidate.paths)) return null;
  return {
    version: 3,
    dailyGoalMinutes: Number(candidate.dailyGoalMinutes) || 120,
    paths: candidate.paths,
    modules: candidate.modules,
    sections: candidate.sections,
    sessions: candidate.sessions,
    frozenDays: candidate.frozenDays,
  };
}

function migrateV1(old: { dailyGoalMinutes?: number; modules: StudyModule[]; sessions: CyberStudyData["sessions"]; frozenDays: CyberStudyData["frozenDays"] }): CyberStudyData {
  const sections: StudySection[] = [];
  const modules: StudyModule[] = [];
  for (const item of old.modules) {
    const match = item.title.match(/^(\d+)\s+de\s+(\d+)\s*[—–-]\s*(.+)$/i);
    if (!match) { modules.push(item); continue; }
    const total = Number(match[2]) || 30;
    let parent = modules.find((module) => module.title.toLowerCase() === "linux fundamentals");
    if (!parent) {
      parent = {
        ...item,
        id: crypto.randomUUID(),
        title: "Linux Fundamentals",
        status: item.status === "Completado" && total > 1 ? "En progreso" : item.status,
        progress: item.status === "Completado" ? Math.round(100 / total) : 0,
        notes: "",
        learnings: "",
        questions: "",
      };
      modules.push(parent);
    }
    sections.push({
      id: item.id,
      moduleId: parent.id,
      number: Number(match[1]),
      total,
      title: match[3].trim(),
      status: item.status,
      progress: item.progress,
      notes: item.notes,
      learnings: item.learnings,
      questions: item.questions,
      createdAt: item.createdAt,
    });
  }
  return migrateV2({ dailyGoalMinutes: old.dailyGoalMinutes, modules, sections, sessions: old.sessions, frozenDays: old.frozenDays });
}

function migrateV2(old: { dailyGoalMinutes?: number; modules: StudyModule[]; sections: StudySection[]; sessions: CyberStudyData["sessions"]; frozenDays: CyberStudyData["frozenDays"] }): CyberStudyData {
  const hasLinuxFundamentals = old.modules.some((module) => module.title.trim().toLowerCase() === "linux fundamentals");
  const modules = old.modules.map((module) => module.title.trim().toLowerCase() === "linux fundamentals" ? { ...module, pathId: juniorPath.id, order: 4 } : module);
  return {
    version: 3,
    dailyGoalMinutes: Number(old.dailyGoalMinutes) || 120,
    paths: hasLinuxFundamentals ? [juniorPath] : [],
    modules,
    sections: old.sections,
    sessions: old.sessions,
    frozenDays: old.frozenDays,
  };
}

export function loadTimer() {
  try {
    const value = JSON.parse(localStorage.getItem(TIMER_KEY) ?? "null") as { seconds: number; running: boolean; savedAt: number } | null;
    if (!value || !Number.isFinite(value.seconds)) return { seconds: 0, running: false };
    const elapsed = value.running ? Math.max(0, Math.floor((Date.now() - value.savedAt) / 1000)) : 0;
    return { seconds: Math.max(0, value.seconds + elapsed), running: value.running };
  } catch { return { seconds: 0, running: false }; }
}

export function saveTimer(seconds: number, running: boolean) {
  if (!seconds && !running) localStorage.removeItem(TIMER_KEY);
  else localStorage.setItem(TIMER_KEY, JSON.stringify({ seconds, running, savedAt: Date.now() }));
}
