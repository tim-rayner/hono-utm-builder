// createVisit
// getVisits
// getStats

import { SupabaseClient } from "@supabase/supabase-js";

// Create Visit Service
export const createVisit = async (supabase: SupabaseClient, code: string) => {
  try {
    await supabase
      .from("visits")
      .insert({
        link_code: code,
      })
      .select()
      .single();
  } catch (error) {
    throw error;
  }
};

// Get Visits Service
export const listVisits = async (supabase: SupabaseClient, code: string) => {
  const { data: visits, error } = await supabase
    .from("visits")
    .select()
    .eq("link_code", code);
  if (error) {
    throw error;
  }
  return visits;
};

// Get Stats Service
export const listStats = async (supabase: SupabaseClient, code: string) => {
  const { data: stats, error } = await supabase
    .from("visits")
    .select("*")
    .eq("link_code", code);
};
