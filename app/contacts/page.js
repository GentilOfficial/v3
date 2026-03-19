import ContactsPageView from "@/components/pages/ContactsPageView"
import { contact, contactEmail, contactSocials } from "@/content/site"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getLocalizedValue } from "@/lib/i18n"

export default async function ContactsPage() {
  const lang = await getCurrentLang()

  return (
    <ContactsPageView
      content={getLocalizedValue(contact, lang)}
      emailAddress={contactEmail}
      socials={contactSocials}
    />
  )
}
