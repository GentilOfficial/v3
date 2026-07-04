'use client'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOCALE } from '@/config/i18n.config'
import { getLocaleFromPathname, localizePath } from '@/lib/i18n'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLang = getLocaleFromPathname(pathname ?? '/') ?? DEFAULT_LOCALE
  const [isPending, startTransition] = useTransition()
  const nextLang = currentLang === 'en' ? 'it' : 'en'

  const handleSwitch = () => {
    const localizedPath = localizePath(pathname ?? '/', nextLang)
    const query = searchParams.toString()
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const nextUrl = `${localizedPath}${query ? `?${query}` : ''}${hash}`

    startTransition(() => {
      router.push(nextUrl)
      router.refresh()
    })
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleSwitch}
      disabled={isPending}
      aria-busy={isPending}
      className="hover:cursor-pointer"
    >
      {nextLang.toUpperCase()}
    </Button>
  )
}
