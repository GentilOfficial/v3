"use client"

import { createRemoteContentHook } from "@/hooks/useRemoteContent"
import {
  getCertificationsContent,
  getCertificationsFallbackResult,
} from "@/lib/content/certifications"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

async function loadCertificationsContent(lang) {
  return getCertificationsContent(lang, getSupabaseBrowserClient())
}

export const useCertificationsContent = createRemoteContentHook({
  loadContent: loadCertificationsContent,
  getFallbackResult: getCertificationsFallbackResult,
  keepPreviousItems: true,
  debugLabel: "certifications",
})
