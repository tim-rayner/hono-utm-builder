import type { SupabaseClient } from "@supabase/supabase-js";

// Create Link Service
export const createLink = async (supabase: SupabaseClient, url: string) => {
  const { data: link, error } = await supabase
    .from("links")
    .insert({
      full_url: url,
      base_url: process.env.BASE_URL || "http://localhost:3000",
      code: crypto.randomUUID().slice(0, 6),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: link.id,
    code: link.code,
    baseUrl: link.base_url,
    utmSource: link.utm_source,
    utmMedium: link.utm_medium,
    utmCampaign: link.utm_campaign,
    utmTerm: link.utm_term,
    utmContent: link.utm_content,
    fullUrl: link.full_url,
    createdAt: link.created_at,
  };
};

// Get all Links Service
export const getAll = async (supabase: SupabaseClient) => {
  const { data: links, error } = await supabase
    .from("links")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return links;
};

// Delete Link Service
export const deleteLink = async (supabase: SupabaseClient, code: string) => {
  const { data: link, error } = await supabase
    .from("links")
    .delete()
    .eq("code", code);
  if (error) {
    throw error;
  }
  return link;
};
