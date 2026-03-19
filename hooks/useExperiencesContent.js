"use client"

import { createRemoteContentHook } from "@/hooks/useRemoteContent"
import {
  getExperiencesContent,
  getExperiencesFallbackResult,
} from "@/lib/content/experiences"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

async function loadExperiencesContent(lang) {
  return getExperiencesContent(lang, getSupabaseBrowserClient())
}

export const useExperiencesContent = createRemoteContentHook({
  loadContent: loadExperiencesContent,
  getFallbackResult: getExperiencesFallbackResult,
  keepPreviousItems: true,
  debugLabel: "experiences",
})
