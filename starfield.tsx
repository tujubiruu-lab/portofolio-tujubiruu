"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  drift: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let stars: Star[] = []
    let animationId = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const buildStars = () => {
      const count = Math.floor((width * height) / 6000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.004,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.06 + 0.01,
      }))
    }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    let t = 0
    const render = () => {
      t += 1
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.4
        const a = Math.max(0, Math.min(1, alpha))
        // gold-ish and white stars
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 232, 210, ${a})`
        ctx.shadowBlur = s.r * 4
        ctx.shadowColor = `rgba(230, 200, 140, ${a * 0.7})`
        ctx.fill()

        s.y += s.drift
        if (s.y > height) {
          s.y = 0
          s.x = Math.random() * width
        }
      }
      ctx.shadowBlur = 0
      animationId = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient: night sky with deep purple glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.28_0.09_300_/_45%),_transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.24_0.07_260_/_40%),_transparent_60%)]" />
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  )
}
