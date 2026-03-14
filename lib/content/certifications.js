import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"

import { fallbackCertifications } from "@/content/fallback/certifications"
import { getLocalizedField } from "@/lib/content/localize"
import { getSupabaseServerClient, getSupabasePublicUrl } from "@/lib/supabase/server"

function getFallbackResult(lang, issue) {
  return {
    items: fallbackCertifications[lang] ?? fallbackCertifications.en,
    source: "fallback",
    issue,
  }
}

function formatIssuedDate(date, lang) {
  if (!date) return ""
  return dayjs(date).locale(lang).format("YYYY")
}

function mapCertification(certification, lang) {
  return {
    slug: certification.slug,
    title: getLocalizedField(certification.title, lang) ?? certification.slug,
    issuer: certification.issuer ?? "",
    issued: formatIssuedDate(certification.issued_at, lang),
    badgeUrl: getSupabasePublicUrl(
      certification.badge_bucket,
      certification.badge_path,
    ),
    badgeAlt:
      getLocalizedField(certification.badge_alt, lang) ??
      `${getLocalizedField(certification.title, lang) ?? certification.slug} badge`,
    credentialUrl: certification.credential_url ?? null,
  }
}

export async function getCertificationsContent(lang) {
  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return getFallbackResult(lang, "missing_env")
  }

  try {
    const { data, error } = await supabase
      .from("certifications")
      .select(
        "slug, title, issuer, issued_at, badge_bucket, badge_path, badge_alt, credential_url, published, sort_order",
      )
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("issued_at", { ascending: false })

    if (error) {
      throw error
    }

    if (!data?.length) {
      return {
        items: [],
        source: "database",
        issue: null,
      }
    }

    return {
      items: data.map((certification) => mapCertification(certification, lang)),
      source: "database",
      issue: null,
    }
  } catch (error) {
    console.error("[content/certifications]", error)
    return getFallbackResult(lang, "db_unavailable")
  }
}
