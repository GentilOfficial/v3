"use client"
import NavigationScrollToTop from "@/components/layout/NavigationScrollToTop"
import { useLenisAnchor } from "@/hooks/useLenisAnchor"

export default function LayoutInner({ children }) {
  useLenisAnchor()

  return (
    <>
      <NavigationScrollToTop />
      {children}
    </>
  )
}
