import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"

import { certifications as certificationsConfig } from "@/content/site"
import { fallbackCertifications } from "@/content/fallback/certifications"
import { getLocalizedField } from "@/lib/content/localize"
import { getSupabasePublicUrl } from "@/lib/supabase/public-url"

function getBadgeAltSuffix(lang) {
  return (
    getLocalizedField(certificationsConfig.labels?.badgeAltSuffix, lang) ??
    "badge"
  )
}

function formatIssuedDate(date, lang) {
  if (!date) return ""
  return dayjs(date).locale(lang).format("MMM YYYY")
}

function mapCertification(certification, lang, supabase) {
  const title = getLocalizedField(certification.title, lang) ?? certification.slug

  return {
    slug: certification.slug,
    featured: Boolean(certification.featured),
    title,
    issuer: certification.issuer ?? "",
    issued: formatIssuedDate(certification.issued_at, lang),
    badgeUrl: getSupabasePublicUrl(
      supabase,
      certification.badge_bucket,
      certification.badge_path,
    ),
    badgeAlt:
      getLocalizedField(certification.badge_alt, lang) ??
      `${title} ${getBadgeAltSuffix(lang)}`,
    credentialUrl: certification.credential_url ?? null,
  }
}

export function getCertificationsFallbackResult(lang, issue) {
  return {
    items: fallbackCertifications.map((certification) =>
      mapCertification(certification, lang, null),
    ),
    source: "fallback",
    issue,
  }
}

export async function getCertificationsContent(lang, supabase) {
  if (!supabase) {
    return getCertificationsFallbackResult(lang, "missing_env")
  }

  try {
    const { data, error } = await supabase
      .from("certifications")
      .select(
        "slug, title, issuer, issued_at, badge_bucket, badge_path, badge_alt, credential_url, featured, published, sort_order",
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
      items: data.map((certification) =>
        mapCertification(certification, lang, supabase),
      ),
      source: "database",
      issue: null,
    }
  } catch (error) {
    console.error("[content/certifications]", error)
    return getCertificationsFallbackResult(lang, "db_unavailable")
  }
}

