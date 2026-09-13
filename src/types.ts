export type ModuleStatus = "Pendiente" | "En progreso" | "Completado" | "Repasar";

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
}

export interface StudySection {
  id: string;
  moduleId: string;
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

export interface CyberStudyData {
  version: 2;
  dailyGoalMinutes: number;
  modules: StudyModule[];
  sections: StudySection[];
  sessions: StudySession[];
  frozenDays: FreezeDay[];
}
