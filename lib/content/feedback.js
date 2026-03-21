import { feedback } from "@/content/site"
import { getLocalizedValue } from "@/lib/i18n"

export function getIssueNotice(issue, lang) {
  if (!issue) return null

  const localizedFeedback = getLocalizedValue(feedback, lang)
  return localizedFeedback.issues?.[issue] ?? null
}

export function getEmptyStateCopy(collection, lang, showFeaturedCopy = false) {
  const localizedFeedback = getLocalizedValue(feedback, lang)
  const emptyState = localizedFeedback.emptyStates?.[collection] ?? null

  if (!emptyState) return null
  if (showFeaturedCopy && emptyState.featured) {
    return emptyState.featured
  }

  return {
    title: emptyState.title,
    description: emptyState.description,
  }
}
