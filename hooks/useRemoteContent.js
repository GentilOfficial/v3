"use client"

import { useEffect, useState } from "react"

const EMPTY_REMOTE_CONTENT = {
  items: [],
  source: null,
  issue: null,
}

export function useRemoteContent({
  lang,
  loadContent,
  getFallbackResult,
  keepPreviousItems = false,
  debugLabel = "content",
  enabled = true,
}) {
  const [resolvedState, setResolvedState] = useState({
    ...EMPTY_REMOTE_CONTENT,
    lang: null,
  })

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    let cancelled = false

    async function syncContent() {
      try {
        const nextState = await loadContent(lang)

        if (cancelled) return

        setResolvedState({
          ...nextState,
          lang,
        })
      } catch (error) {
        console.error(`[content/${debugLabel}]`, error)

        if (cancelled) return

        setResolvedState({
          ...getFallbackResult(lang, "db_unavailable"),
          lang,
        })
      }
    }

    syncContent()

    return () => {
      cancelled = true
    }
  }, [debugLabel, enabled, getFallbackResult, lang, loadContent])

  const isLoading = enabled && resolvedState.lang !== lang
  const hasResolvedForLang = resolvedState.lang === lang

  return {
    items:
      isLoading && !keepPreviousItems
        ? []
        : hasResolvedForLang || keepPreviousItems
          ? resolvedState.items
          : [],
    source:
      isLoading && !keepPreviousItems
        ? null
        : hasResolvedForLang || keepPreviousItems
          ? resolvedState.source
          : null,
    issue: isLoading || !hasResolvedForLang ? null : resolvedState.issue,
    isLoading,
    isEnabled: enabled,
    hasResolvedForLang,
  }
}

export function createRemoteContentHook({
  loadContent,
  getFallbackResult,
  keepPreviousItems = false,
  debugLabel,
}) {
  return function useContent(lang, options = {}) {
    return useRemoteContent({
      lang,
      loadContent,
      getFallbackResult,
      keepPreviousItems,
      debugLabel,
      ...options,
    })
  }
}
