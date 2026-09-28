import { createClient } from "@supabase/supabase-js";
import type { CyberStudyData } from "../types";
import { normalizeData } from "./storage";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(url && anonKey);
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

export async function loadCloudData(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("app_state").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data?.data ? normalizeData(data.data) : null;
}

export async function saveCloudData(userId: string, data: CyberStudyData) {
  if (!supabase) return;
  const { error } = await supabase.from("app_state").upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export function mergeData(local: CyberStudyData, cloud: CyberStudyData): CyberStudyData {
  const unique = <T extends { id: string }>(first: T[], second: T[]) => [...new Map([...first, ...second].map((item) => [item.id, item])).values()];
  const frozen = [...new Map([...cloud.frozenDays, ...local.frozenDays].map((day) => [day.date, day])).values()];
  // Lo borrado en cualquier dispositivo gana sobre la unión, para que no reaparezca.
  const deletedIds = [...new Set([...(cloud.deletedIds ?? []), ...(local.deletedIds ?? [])])];
  const deleted = new Set(deletedIds);
  const alive = <T extends { id: string }>(first: T[], second: T[]) => unique(first, second).filter((item) => !deleted.has(item.id));
  return { version: 3, dailyGoalMinutes: local.dailyGoalMinutes || cloud.dailyGoalMinutes, paths: alive(cloud.paths, local.paths), modules: alive(cloud.modules, local.modules), sections: alive(cloud.sections, local.sections), sessions: alive(cloud.sessions, local.sessions), frozenDays: frozen, deletedIds };
}
