import NotFoundPageView from "@/components/pages/NotFoundPageView"
import { notFoundPage } from "@/content/site"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getLocalizedValue } from "@/lib/i18n"

export default async function NotFound() {
  const lang = await getCurrentLang()

  return (
    <NotFoundPageView
      content={getLocalizedValue(notFoundPage, lang)}
      lang={lang}
    />
  )
}
