"use client"

import { useEffect } from "react"

export default function ConsoleSignature({ signature }) {
  useEffect(() => {
    console.log(
      `%c${signature}`,
      "background:#1f1f1f;color:#f1f1f1;padding:2px 6px;border-radius:6px",
    )
  }, [signature])

  return null
}
