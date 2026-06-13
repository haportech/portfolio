export function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let w, h, particles = []
  const COUNT = 80

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  class Particle {
    constructor() { this.reset() }
    reset() {
      this.x = Math.random() * w
      this.y = Math.random() * h
      this.size = 1 + Math.random() * 2
      this.speedY = -0.2 - Math.random() * 0.4
      this.speedX = (Math.random() - 0.5) * 0.15
      this.opacity = 0.2 + Math.random() * 0.4
    }
    update() {
      this.y += this.speedY
      this.x += this.speedX
      if (this.y < -10) this.reset()
      if (this.x < -10) this.x = w + 10
      if (this.x > w + 10) this.x = -10
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`
      ctx.fill()
    }
  }

  for (let i = 0; i < COUNT; i++) {
    const p = new Particle()
    p.y = Math.random() * h
    particles.push(p)
  }

  let maxDist = 150

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / maxDist)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => { p.update(); p.draw() })
    drawConnections()
    requestAnimationFrame(animate)
  }
  animate()
}
