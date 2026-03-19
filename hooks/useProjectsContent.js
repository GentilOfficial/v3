"use client"

import { createRemoteContentHook } from "@/hooks/useRemoteContent"
import {
  getProjectsContent,
  getProjectsFallbackResult,
} from "@/lib/content/projects"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

async function loadProjectsContent(lang) {
  return getProjectsContent(lang, getSupabaseBrowserClient())
}

export const useProjectsContent = createRemoteContentHook({
  loadContent: loadProjectsContent,
  getFallbackResult: getProjectsFallbackResult,
  keepPreviousItems: true,
  debugLabel: "projects",
})
