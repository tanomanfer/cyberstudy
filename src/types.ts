export type ModuleStatus = "Pendiente" | "En progreso" | "Completado" | "Repasar";

export interface CertificationPath {
  id: string;
  title: string;
  certification: string;
  platform: string;
  status: ModuleStatus;
  progress: number;
  totalCourses: number;
  notes: string;
  url: string;
  createdAt: string;
}

export interface StudyModule {
  id: string;
  title: string;
  platform: string;
  category: string;
  difficulty: string;
  status: ModuleStatus;
  progress: number;
  startedAt: string;
  completedAt: string;
  url: string;
  notes: string;
  learnings: string;
  questions: string;
  createdAt: string;
  pathId?: string;
  order?: number;
}

export interface StudySection {
  id: string;
  moduleId: string;
  /** Entrada especial del Cuaderno que resume el curso completo y no cuenta para el progreso. */
  kind?: "module-summary";
  number: number;
  total: number;
  title: string;
  status: ModuleStatus;
  progress: number;
  notes: string;
  learnings: string;
  questions: string;
  createdAt: string;
}

export interface StudySession {
  id: string;
  date: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  topic: string;
  category: string;
  platform: string;
  learned: string;
  difficulties: string;
  questions: string;
  comprehension: number;
  tags: string[];
  createdAt: string;
}

export interface FreezeDay {
  date: string;
  reason: string;
}

export type MachineStatus = "Pendiente" | "En progreso" | "Resuelta" | "Abandonada";
export type HelpLevel = "Sin ayuda" | "Pista" | "IA" | "Walkthrough parcial" | "Walkthrough completo";
export type RepeatConfidence = "Sí" | "Con dudas" | "No";
export type WriteupVisibility = "Privado" | "Publicable";

/** Máquina CTF (HTB, TryHackMe, etc.). Su progreso es independiente del de los cursos. */
export interface Machine {
  id: string;
  name: string;
  platform: string;
  url: string;
  os: string;
  difficulty: string;
  /** Solo para Starting Point de HTB: 0, 1 o 2. */
  startingPointTier: number | null;
  status: MachineStatus;
  startedAt: string;
  completedAt: string;
  minutes: number;
  labIp: string;
  certifications: string[];
  techniques: string[];
  tools: string[];
  notes: string;
  writeupUrl: string;
  writeupVisibility: WriteupVisibility;
  helpLevel: HelpLevel;
  /** Asistentes de IA usados (ChatGPT, Codex, Claude…). */
  aiAssistants: string[];
  personalDifficulty: number;
  learnedConcept: string;
  reviewConcept: string;
  canRepeatAlone: RepeatConfidence;
  relatedModuleIds: string[];
  relatedSectionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CyberStudyData {
  version: 3;
  dailyGoalMinutes: number;
  paths: CertificationPath[];
  modules: StudyModule[];
  sections: StudySection[];
  sessions: StudySession[];
  frozenDays: FreezeDay[];
  /** Laboratorio de máquinas CTF. Opcional: los respaldos de estudio sin este campo siguen siendo válidos. */
  machines?: Machine[];
  /** IDs borrados; evita que la sincronización con la nube los resucite. */
  deletedIds?: string[];
}
