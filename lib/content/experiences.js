import { fallbackExperiences } from "@/content/fallback/experiences"
import { getLocalizedField } from "@/lib/content/localize"
import { getSupabaseServerClient, getSupabasePublicUrl } from "@/lib/supabase/server"

function getFallbackResult(lang, issue) {
  return {
    items: fallbackExperiences[lang] ?? fallbackExperiences.en,
    source: "fallback",
    issue,
  }
}

function mapExperience(experience, lang) {
  return {
    slug: experience.slug,
    company: experience.company ?? "",
    location: getLocalizedField(experience.location, lang) ?? "",
    title: getLocalizedField(experience.title, lang) ?? "",
    description: getLocalizedField(experience.description, lang) ?? "",
    companyIconUrl: getSupabasePublicUrl(
      experience.company_logo_bucket,
      experience.company_logo_path,
    ),
    startedAt: experience.started_at,
    endedAt: experience.ended_at,
  }
}

export async function getExperiencesContent(lang) {
  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return getFallbackResult(lang, "missing_env")
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
      items: data.map((experience) => mapExperience(experience, lang)),
      source: "database",
      issue: null,
    }
  } catch (error) {
    console.error("[content/experiences]", error)
    return getFallbackResult(lang, "db_unavailable")
  }
}
