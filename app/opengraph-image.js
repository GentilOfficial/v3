import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    const DMSans = await readFile(join(process.cwd(), 'assets/DMSans.ttf'))

    const icon = await readFile(join(process.cwd(), 'public/icon.svg'))
    const iconBase64 = `data:image/svg+xml;base64,${icon.toString('base64')}`

    const bg = await readFile(join(process.cwd(), 'assets/og-background.png'))
    const bgBase64 = `data:image/png;base64,${bg.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 64,
                    backgroundImage: `url(${bgBase64})`,
                    backgroundSize: 'contain',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 72,
                    color: 'white',
                }}
            >
                <img src={iconBase64} style={{ width: '128px', height: '128px' }} alt="Logo" />
                <span style={{ fontSize: 72 }}>Federico Gentili</span>
                <span style={{
                    color: '#E27022',
                    textShadow: "4px 4px 8px #632F1A",
                }}>
                    Web Developer
                </span>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'DM Sans',
                    data: DMSans,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}