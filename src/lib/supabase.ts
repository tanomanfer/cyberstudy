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
  return { version: 2, dailyGoalMinutes: local.dailyGoalMinutes || cloud.dailyGoalMinutes, modules: unique(cloud.modules, local.modules), sections: unique(cloud.sections, local.sections), sessions: unique(cloud.sessions, local.sessions), frozenDays: frozen };
}
