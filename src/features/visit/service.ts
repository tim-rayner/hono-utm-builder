// createVisit
// getVisits
// getStats

import { SupabaseClient } from "@supabase/supabase-js";

// Create Visit Service
export const createVisit = async (
  supabase: SupabaseClient,
  code: string,
  meta: {
    ip: string | null;
    userAgent: string | null;
    referrer: string | null;
  },
) => {
  const { error: visitError } = await supabase.from("visits").insert({
    link_code: code,
    ip: meta.ip,
    user_agent: meta.userAgent,
    referrer: meta.referrer,
  });

  if (visitError) {
    throw visitError;
  }

  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("full_url")
    .eq("code", code)
    .single();

  if (linkError) {
    throw linkError;
  }

  return {
    redirectUrl: link.full_url,
  };
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
