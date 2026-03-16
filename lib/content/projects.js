import { projects as projectsConfig } from "@/content/site"
import { fallbackProjects } from "@/content/fallback/projects"
import { getLocalizedField, toArray } from "@/lib/content/localize"
import { getSupabaseServerClient } from "@/lib/supabase/server"

function getStatusLabel(statusKey, lang) {
  return getLocalizedField(projectsConfig.statusLabels?.[statusKey], lang) ?? statusKey
}

function mapProjectLink(link, lang) {
  return {
    label: getLocalizedField(link.label, lang) ?? link.href,
    href: link.href,
    kind: link.kind ?? "external",
  }
}

function mapProject(project, links, lang) {
  const statusKey = project.status ?? project.statusKey ?? "completed"

  return {
    slug: project.slug,
    featured: Boolean(project.featured),
    statusKey,
    name: getLocalizedField(project.title, lang) ?? project.slug,
    category: getLocalizedField(project.category, lang) ?? "",
    year: String(project.year ?? ""),
    status: getStatusLabel(statusKey, lang),
    summary: getLocalizedField(project.summary, lang) ?? "",
    deliverables: toArray(getLocalizedField(project.deliverables, lang)),
    stack: Array.isArray(project.stack) ? project.stack : [],
    links: links.map((link) => mapProjectLink(link, lang)),
  }
}

function getFallbackResult(lang, issue) {
  return {
    items: fallbackProjects.map((project) =>
      mapProject(project, project.links ?? [], lang),
    ),
    source: "fallback",
    issue,
  }
}

export async function getProjectsContent(lang) {
  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return getFallbackResult(lang, "missing_env")
  }

  try {
    const { data: projectRows, error: projectsError } = await supabase
      .from("projects")
      .select(
        "id, slug, title, category, summary, deliverables, stack, year, status, featured, published, sort_order",
      )
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false })

    if (projectsError) {
      throw projectsError
    }

    if (!projectRows?.length) {
      return {
        items: [],
        source: "database",
        issue: null,
      }
    }

    const projectIds = projectRows.map((project) => project.id)
    const { data: projectLinks, error: linksError } = await supabase
      .from("project_links")
      .select("project_id, label, href, kind, sort_order")
      .in("project_id", projectIds)
      .order("sort_order", { ascending: true })

    if (linksError) {
      throw linksError
    }

    const linksByProjectId = new Map()

    for (const link of projectLinks ?? []) {
      const currentLinks = linksByProjectId.get(link.project_id) ?? []
      currentLinks.push(link)
      linksByProjectId.set(link.project_id, currentLinks)
    }

    return {
      items: projectRows.map((project) =>
        mapProject(project, linksByProjectId.get(project.id) ?? [], lang),
      ),
      source: "database",
      issue: null,
    }
  } catch (error) {
    console.error("[content/projects]", error)
    return getFallbackResult(lang, "db_unavailable")
  }
}
