"use client"
import {useLenisAnchor} from "@/hooks/useLenisAnchor"

export default function LayoutInner({children}) {
    useLenisAnchor()
    return children
}