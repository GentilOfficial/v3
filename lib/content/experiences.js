import { fallbackExperiences } from "@/content/fallback/experiences"
import { getLocalizedField } from "@/lib/content/localize"
import { getSupabasePublicUrl } from "@/lib/supabase/public-url"

function mapExperience(experience, lang, supabase) {
  return {
    slug: experience.slug,
    company: experience.company ?? "",
    location: getLocalizedField(experience.location, lang) ?? "",
    title: getLocalizedField(experience.title, lang) ?? "",
    description: getLocalizedField(experience.description, lang) ?? "",
    companyIconUrl: getSupabasePublicUrl(
      supabase,
      experience.company_logo_bucket,
      experience.company_logo_path,
    ),
    startedAt: experience.started_at ?? experience.startedAt,
    endedAt: experience.ended_at ?? experience.endedAt,
  }
}

export function getExperiencesFallbackResult(lang, issue) {
  return {
    items: fallbackExperiences.map((experience) =>
      mapExperience(experience, lang, null),
    ),
    source: "fallback",
    issue,
  }
}

export async function getExperiencesContent(lang, supabase) {
  if (!supabase) {
    return getExperiencesFallbackResult(lang, "missing_env")
  }

  try {
    const { data, error } = await supabase
      .from("experiences")
      .select(
        "slug, company, location, title, description, company_logo_bucket, company_logo_path, started_at, ended_at, published, sort_order",
      )
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("started_at", { ascending: false })

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
      items: data.map((experience) => mapExperience(experience, lang, supabase)),
      source: "database",
      issue: null,
    }
  } catch (error) {
    console.error("[content/experiences]", error)
    return getExperiencesFallbackResult(lang, "db_unavailable")
  }
}
