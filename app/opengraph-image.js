/* eslint-disable @next/next/no-img-element */

import { layout } from "@/content/site"
import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { DEFAULT_LOCALE } from "@/config/i18n.config"
import { getLocalizedValue } from "@/lib/i18n"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  const DMSans = await readFile(join(process.cwd(), "fonts", "DMSans.ttf"))
  const localizedOpenGraph = getLocalizedValue(layout.opengraph, DEFAULT_LOCALE)

  const icon = await readFile(join(process.cwd(), "public/logo.png"))
  const iconBase64 = `data:image/png;base64,${icon.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 72,
        color: "white",
      }}
    >
      <img
        src={iconBase64}
        style={{ width: "128px", height: "128px" }}
        alt={localizedOpenGraph.logoAlt}
      />
      <span style={{ fontSize: 72 }}>{layout.opengraph.title}</span>
      <span
        style={{
          color: "#fe3908",
          textShadow: "4px 4px 18px rgba(254, 138, 0, 0.25)",
        }}
      >
        {localizedOpenGraph.subtitle}
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "DM Sans",
          data: DMSans,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
