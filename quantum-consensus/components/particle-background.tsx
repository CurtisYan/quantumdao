"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置canvas尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 粒子类
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      fadeDirection: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1

        // 随机选择颜色
        const colors = [
          "rgba(6, 182, 212, 1)", // cyan
          "rgba(168, 85, 247, 1)", // purple
          "rgba(59, 130, 246, 1)", // blue
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // 淡入淡出效果
        this.opacity += 0.005 * this.fadeDirection
        if (this.opacity >= 0.7 || this.opacity <= 0.2) {
          this.fadeDirection *= -1
        }

        // 边界检查
        if (this.x < 0 || (canvas && this.x > canvas.width)) this.speedX *= -1
        if (this.y < 0 || (canvas && this.y > canvas.height)) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color.replace("1)", `${this.opacity})`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 创建粒子数组
    const particlesArray: Particle[] = []
    const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 20000))

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * (canvas?.width || window.innerWidth)
      const y = Math.random() * (canvas?.height || window.innerHeight)
      particlesArray.push(new Particle(x, y))
    }

    // 连接粒子
    function connectParticles() {
      if (!ctx) return

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 1 - distance / 100
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
}

