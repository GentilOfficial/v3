import { feedback } from "@/content/site"
import { getLocalizedValue } from "@/lib/i18n"

export function getIssueNotice(issue, lang) {
  if (!issue) return null

  const localizedFeedback = getLocalizedValue(feedback, lang)
  return localizedFeedback.issues?.[issue] ?? null
}

export function getEmptyStateCopy(collection, lang) {
  const localizedFeedback = getLocalizedValue(feedback, lang)
  return localizedFeedback.emptyStates?.[collection] ?? null
}
