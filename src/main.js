import './style.css'
import { initThreeScene } from './effects/three-scene.js'
import { initParticles } from './effects/particles.js'
import { initScrollReveal } from './effects/scroll-reveal.js'
import emailjs from '@emailjs/browser'

/* ===================================================
   Data
   =================================================== */

const skills = [
  { name: 'JavaScript / TypeScript', category: 'frontend', icon: 'js' },
  { name: 'React', category: 'frontend', icon: 'react' },
  { name: 'Model Context Protocol (MCP)', category: 'backend', icon: 'api' },
  { name: 'Vector Indexing (HNSW)', category: 'backend', icon: 'db' },
  { name: 'LLM Ingestion & RAG', category: 'backend', icon: 'node' },
  { name: 'HTML / CSS', category: 'frontend', icon: 'html' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind' },
  { name: 'Vite', category: 'frontend', icon: 'vite' },
  { name: 'Node.js', category: 'backend', icon: 'node' },
  { name: 'Express.js', category: 'backend', icon: 'express' },
  { name: 'Socket.io', category: 'backend', icon: 'socket' },
  { name: 'SQLite', category: 'backend', icon: 'db' },
  { name: 'PostgreSQL', category: 'backend', icon: 'db' },
  { name: 'REST APIs', category: 'backend', icon: 'api' },
  { name: 'Docker', category: 'devops', icon: 'docker' },
  { name: 'Linux / DietPi', category: 'devops', icon: 'linux' },
  { name: 'ARM SBCs', category: 'devops', icon: 'chip' },
  { name: 'Nginx', category: 'devops', icon: 'nginx' },
  { name: 'Cloudflare', category: 'devops', icon: 'cloud' },
  { name: 'Network Security', category: 'security', icon: 'shield' },
  { name: 'Firewall / Hardening', category: 'security', icon: 'lock' },
  { name: 'Container Security', category: 'security', icon: 'container' },
  { name: 'Monitoring', category: 'devops', icon: 'monitor' },
]

const projects = [
  {
    title: 'Intelligent Document Processor',
    tag: 'RAG Engine',
    desc: 'A secure, full-stack Retrieval-Augmented Generation (RAG) system built with Next.js, Supabase, pgvector, and Groq Cloud. Features role-based access control (RBAC) filtering at the database layer to ensure data isolation and mitigates prompt injection attacks.',
    tech: ['Next.js', 'Supabase', 'pgvector', 'Groq Cloud', 'Tailwind CSS'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/intelligent-doc-processor' }],
  },
  {
    title: 'Stock & Crypto Tracker',
    tag: 'Web App',
    desc: 'Live market intelligence dashboard pulling data from CoinGecko and Yahoo Finance. Features historical line charts, dynamic price alert rules evaluated via background cron jobs, automated email notifications via Resend, and an industrial-brutalist dark UI.',
    tech: ['Next.js', 'React', 'Recharts', 'SQLite', 'Vitest'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/stock-crypto-tracker' }],
  },
  {
    title: 'Agentic RAG Engine',
    tag: 'AI Engine',
    desc: 'Agentic RAG engine with a custom HNSW vector index built from scratch, Qwen-27B self-correction reasoning loop, relevance grading, and a real-time visual trace graph using Server-Sent Events (SSE). Styled with cinematic dark ambient glassmorphism.',
    tech: ['Next.js', 'TypeScript', 'Groq Cloud', 'HNSW Graph', 'SSE Stream', 'Vanilla CSS'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/agentic-rag-portfolio' }],
  },
  {
    title: 'Token Compressor',
    tag: 'MCP Server',
    desc: 'MCP server for Hermes Agent that compresses text before it enters an LLM context window. Four strategies — auto (dedup+truncate), smart truncation at sentence boundaries, line deduplication, and JSON minification with recursive key stripping. Fully local, no API calls. 99% token savings on noisy build logs.',
    tech: ['Python', 'MCP SDK', 'tiktoken', 'asyncio', 'pytest'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/token-compressor' }],
  },
  {
    title: 'Meridian',
    tag: 'Knowledge Graph',
    desc: 'A knowledge graph and note-taking app with React, TipTap rich text editing, D3.js force-directed graphs, FTS5 full-text search, wiki-link navigation between notes, journal with heatmap calendar visualization, and dark glassmorphism UI.',
    tech: ['Node.js', 'Express', 'React', 'TipTap', 'D3.js', 'better-sqlite3', 'FTS5'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/meridian' }],
  },
  {
    title: 'Kanvas',
    tag: 'Real-time',
    desc: 'Real-time collaborative canvas with Node.js, Express 5, Socket.io, and SQLite. Supports multi-user drawing, live cursor tracking, persistent board storage, and broadcast events for seamless collaboration.',
    tech: ['Node.js', 'Express 5', 'Socket.io', 'SQLite'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/kanvas' }],
  },
  {
    title: 'Athena Attendance',
    tag: 'Education',
    desc: 'Online attendance management system for a Year 11 class. Features separate teacher and student portals, live attendance polling, CSV/PDF export, analytics with Chart.js, audit logging, rate limiting, field-level AES-256-GCM encryption, and claymorphism dark UI.',
    tech: ['FastAPI', 'SQLite', 'Jinja2', 'Chart.js', 'bcrypt', 'AES-256-GCM'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/athena-attendance' }],
  },
  {
    title: 'Vangdy Guest House',
    tag: 'Live Site',
    desc: 'Production guest house website with Tailwind CSS, GSAP scroll animations, and EmailJS contact integration. Dark luxury design with dynamic booking visualization and full mobile responsiveness.',
    tech: ['Tailwind CSS', 'GSAP', 'ScrollTrigger', 'EmailJS'],
    links: [
      { label: 'Live Site', url: 'https://vangdy-guesthouse.haportech.space/' },
    ],
  },
  {
    title: 'Ghosttype',
    tag: 'Writing App',
    desc: 'Distraction-free full-stack writing web app. Rich text editor with keyboard-first shortcuts, typewriter/focus modes, document management with folders/tags, FTS5 full-text search, AI review via GPT-4o (optional), and dark/light teal-accent theme.',
    tech: ['Node.js', 'Express', 'SQLite', 'FTS5', 'OpenAI', 'contenteditable'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/ghosttype' }],
  },
  {
    title: 'Relic',
    tag: 'Finance',
    desc: 'Self-hosted personal finance and net worth tracker. Dashboard with animated net worth counter, asset/liability allocation tracking, transaction ledger with CSV import, recurring schedules, Chart.js analytics, multi-currency support, and bcrypt/JWT-secured PIN auth. 100% offline.',
    tech: ['Node.js', 'Express', 'SQLite', 'Chart.js', 'JWT', 'bcrypt'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/Relic' }],
  },
  {
    title: 'Pulse Monitor',
    tag: 'System',
    desc: 'Real-time Linux system monitor with Flask/Python backend and terminal-inspired HTML frontend. Tracks CPU, memory, disk I/O, network throughput, and process list. Industrial green-on-black CRT aesthetic with live auto-refreshing dashboard.',
    tech: ['Python', 'Flask', 'psutil', 'HTML/CSS'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/pulse' }],
  },
  {
    title: 'Codeshot',
    tag: 'Tool',
    desc: 'Beautiful code screenshot tool. CodeMirror 5 editor with syntax highlighting for JS, Python, Rust, Go, and more. Multiple themes (Dracula, Nord, One Dark, Monokai), font switching (JetBrains Mono, Fira Code, Cascadia Code), and html2canvas PNG export.',
    tech: ['CodeMirror', 'html2canvas', 'Vanilla JS', 'CSS'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/codeshot' }],
  },
  {
    title: 'Minecraft Server',
    tag: 'DevOps',
    desc: 'Self-hosted Minecraft Forge 1.20.1 modded server on ARM64 infrastructure. Automated deployment, mod management, backup scheduling, and performance tuning for multi-player environments.',
    tech: ['Minecraft Forge', 'Linux', 'ARM64', 'Backup Automation'],
    links: [],
  },
  {
    title: 'PC Part Compare',
    tag: 'Web App',
    desc: 'Compare computer parts side by side — specs, benchmarks, and pricing for CPUs and GPUs. Color-coded scoring highlights best value, shareable comparison URLs, and mobile-responsive card-to-table layout. Built with Next.js 16 and edge SQLite via Turso.',
    tech: ['Next.js 16', 'Prisma 7', 'Turso', 'Tailwind CSS v4', 'Cloudflare Pages'],
    links: [{ label: 'GitHub', url: 'https://github.com/haportech/pcpartcompare' }],
  },
]

const timeline = [
  {
    date: '2024 — Present',
    title: 'Independent Developer & Sysadmin',
    subtitle: 'Vientiane, Laos',
    items: [
      'Architect custom Approximate Nearest Neighbor (ANN) vector indices (HNSW) and agentic self-correction RAG loops from scratch',
      'Build specialized Model Context Protocol (MCP) servers to optimize token context size window limits',
      'Architect and deploy full-stack web applications (Meridian, Kanvas, Hatch) with Node.js, React, and real-time capabilities',
      'Manage self-hosted infrastructure on Orange Pi Zero3: containers (SearXNG, Pi-hole, Vaultwarden, NPM), reverse proxy, and monitoring',
      'Build secure, isolated mock server environments for development testing',
      'Develop and maintain production systems from bare metal to frontend deployment',
    ],
  },
  {
    date: '2022 — 2024',
    title: 'Systems & Infrastructure Lead',
    subtitle: 'Remote / Southeast Asia',
    items: [
      'Designed and deployed containerized microservices on ARM SBCs with Docker and Nginx Proxy Manager',
      'Implemented network-wide ad blocking, DNS filtering, and security hardening (Pi-hole, Unbound)',
      'Built custom monitoring dashboards for system health and resource utilization',
    ],
  },
  {
    date: '2018 — 2022',
    title: 'Full-Stack Developer',
    subtitle: 'Various Projects',
    items: [
      'Developed real-time collaborative applications with WebSocket and Socket.io architectures',
      'Built CRUD applications and REST APIs with Express.js, SQLite, and PostgreSQL',
      'Created interactive data visualizations using D3.js and Canvas APIs',
      'Established CI/CD patterns and deployment workflows for personal and client projects',
    ],
  },
]

/* ===================================================
   Typing Animation
   =================================================== */

function initTyping() {
  const el = document.getElementById('typing-text')
  if (!el) return
  const roles = [
    'Full-stack Developer',
    'AI Systems Architect',
    'Systems Administrator',
    'Security Engineer',
    'DevOps Practitioner',
    'Infrastructure Architect',
  ]
  let roleIdx = 0
  let charIdx = 0
  let isDeleting = false

  function type() {
    const current = roles[roleIdx]
    if (!isDeleting) {
      el.textContent = current.slice(0, charIdx + 1)
      charIdx++
      if (charIdx === current.length) {
        setTimeout(() => { isDeleting = true; type() }, 2000)
        return
      }
      setTimeout(type, 60 + Math.random() * 40)
    } else {
      el.textContent = current.slice(0, charIdx - 1)
      charIdx--
      if (charIdx === 0) {
        isDeleting = false
        roleIdx = (roleIdx + 1) % roles.length
        setTimeout(type, 400)
        return
      }
      setTimeout(type, 30 + Math.random() * 20)
    }
  }
  type()
}

/* ===================================================
   Theme Toggle
   =================================================== */

function initTheme() {
  const btn = document.querySelector('.theme-toggle')
  if (!btn) return

  const saved = localStorage.getItem('theme')
  if (saved) document.documentElement.setAttribute('data-theme', saved)

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  })
}

/* ===================================================
   Mobile Menu
   =================================================== */

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle')
  const navLinks = document.querySelector('.nav-links')
  if (!toggle || !navLinks) return

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open')
  })

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  })
}

/* ===================================================
   Skills Grid
   =================================================== */

function initSkills() {
  const grid = document.getElementById('skills-grid')
  if (!grid) return

  function render(category) {
    const filtered = category === 'all' ? skills : skills.filter(s => s.category === category)
    grid.innerHTML = filtered.map(s => `
      <div class="skill-card" data-category="${s.category}">
        <span class="skill-icon">${getSkillIcon(s.icon)}</span>
        <span class="skill-name">${s.name}</span>
      </div>
    `).join('')
  }

  render('all')

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      render(btn.dataset.filter)
    })
  })
}

function getSkillIcon(type) {
  const icons = {
    js: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="1" fill="none"/><path d="M15 19l1-2.5M15 19l-1-2.5M8 16c.5.5 1.2 1 2 1s1.5-.5 1.5-1.5v-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
    react: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="3"/><ellipse cx="12" cy="12" rx="3" ry="10"/><ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-60 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
    html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3l1.5 18L12 22l6.5-1L20 3z"/><path d="M8.5 10H16l-.5 4.5L12 16l-3.5-1.5L8 13"/><path d="M8 7h8"/></svg>`,
    tailwind: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4c-4 0-5.5 2-5.5 3.5 2-1 3.5-1 4.5 0 1 1 1 2.5 2.5 3.5 2.5 1.5 5 0 6.5-1-2 1-4 2-6 0-1-1-1-2.5-2.5-3.5C10 4.5 9 4 12 4z"/><path d="M6.5 12c-4 0-5.5 2-5.5 3.5 2-1 3.5-1 4.5 0 1 1 1 2.5 2.5 3.5 2.5 1.5 5 0 6.5-1-2 1-4 2-6 0-1-1-1-2.5-2.5-3.5-1.5-1-2.5-1.5.5-1.5z"/></svg>`,
    node: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7v10l10 5 10-5V7z"/><path d="M2 7l10 5 10-5"/><path d="M12 22V12"/></svg>`,
    express: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 17s3-4 9-4 9 4 9 4"/><path d="M3 7s3-4 9-4 9 4 9 4"/><circle cx="12" cy="13" r="3" fill="currentColor" opacity="0.3"/></svg>`,
    socket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>`,
    db: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    api: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8l4 4-4 4M19 8l-4 4 4 4M13 4l-2 16"/></svg>`,
    docker: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="4" height="4" rx="1"/><rect x="10" y="6" width="4" height="4" rx="1"/><rect x="4" y="12" width="4" height="4" rx="1"/><rect x="10" y="12" width="4" height="4" rx="1"/><rect x="16" y="12" width="4" height="4" rx="1"/><path d="M16 8h3a3 3 0 010 6h-3"/><path d="M2 16h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z"/></svg>`,
    linux: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7v10l10 5 10-5V7z"/><path d="M2 7l10 5 10-5"/><path d="M12 22V12"/><path d="M8 9l-2 2 2 2M16 9l2 2-2 2"/></svg>`,
    chip: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8v8H8z"/><path d="M4 10H2M4 14H2M22 10h-2M22 14h-2M10 4V2M14 4V2M10 22v-2M14 22v-2"/></svg>`,
    nginx: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7v10l10 5 10-5V7z"/><path d="M12 22V12"/><path d="M8 9v6l4-3z"/><path d="M16 9v6l-4-3z"/></svg>`,
    cloud: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.5 19H9a7 7 0 116.6-9.5A5.5 5.5 0 1117.5 19z"/></svg>`,
    shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    lock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    container: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>`,
    monitor: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    vite: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L3 20h18z"/><path d="M12 2L7.5 12.5h9z"/></svg>`,
  }
  return icons[type] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>`
}

/* ===================================================
   Projects Grid
   =================================================== */

function initProjects() {
  const grid = document.getElementById('projects-grid')
  if (!grid) return

  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-card-inner">
        <span class="project-tag">${p.tag}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        ${p.links.length ? `<div class="project-links">${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="project-link">${l.label} →</a>`).join('')}</div>` : ''}
      </div>
    </div>
  `).join('')
}

/* ===================================================
   Timeline
   =================================================== */

function initTimeline() {
  const el = document.getElementById('timeline')
  if (!el) return

  el.innerHTML = timeline.map(t => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${t.date}</div>
      <h3 class="timeline-title">${t.title}</h3>
      <div class="timeline-subtitle">${t.subtitle}</div>
      <div class="timeline-desc"><ul>${t.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
    </div>
  `).join('')
}

/* ===================================================
   Contact Form — Validation & EmailJS
   =================================================== */

emailjs.init('HOuzM-QQMxMXPbDeS')

function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim()
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function showFieldError(fieldId, msg) {
  const field = document.getElementById(fieldId)
  const existing = field.parentElement.querySelector('.field-error')
  if (existing) existing.remove()
  field.classList.add('input-error')
  const err = document.createElement('span')
  err.className = 'field-error'
  err.textContent = msg
  field.parentElement.appendChild(err)
}

function clearFieldErrors() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'))
  document.querySelectorAll('.field-error').forEach(el => el.remove())
}

function initContactForm() {
  const form = document.getElementById('contact-form')
  if (!form) return

  let lastSent = 0
  const RATE_LIMIT_MS = 30000
  const MAX_NAME = 100
  const MAX_EMAIL = 100
  const MAX_MSG = 5000

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    clearFieldErrors()

    const name = sanitize(document.getElementById('name').value)
    const email = sanitize(document.getElementById('email').value)
    const message = sanitize(document.getElementById('message').value)

    let valid = true

    if (!name || name.length < 2) {
      showFieldError('name', 'Name must be at least 2 characters')
      valid = false
    } else if (name.length > MAX_NAME) {
      showFieldError('name', `Name cannot exceed ${MAX_NAME} characters`)
      valid = false
    }

    if (!email || !validateEmail(email)) {
      showFieldError('email', 'Enter a valid email address')
      valid = false
    } else if (email.length > MAX_EMAIL) {
      showFieldError('email', `Email cannot exceed ${MAX_EMAIL} characters`)
      valid = false
    }

    if (!message || message.length < 10) {
      showFieldError('message', 'Message must be at least 10 characters')
      valid = false
    } else if (message.length > MAX_MSG) {
      showFieldError('message', `Message cannot exceed ${MAX_MSG} characters`)
      valid = false
    }

    if (!valid) return

    const now = Date.now()
    if (now - lastSent < RATE_LIMIT_MS) {
      alert(`Please wait ${Math.ceil((RATE_LIMIT_MS - (now - lastSent)) / 1000)}s before sending again.`)
      return
    }

    const btn = form.querySelector('.form-submit')
    btn.classList.add('loading')

    emailjs.send('service_d7lp08g', 'template_7q4ld1u', { from_name: name, from_email: email, message })
      .then(() => {
        lastSent = Date.now()
        btn.classList.remove('loading')
        form.innerHTML = `
          <div class="form-success show">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        `
      })
      .catch(() => {
        btn.classList.remove('loading')
        alert('Failed to send. Try emailing me directly at hp@haportech.space')
      })
  })
}

/* ===================================================
   Init
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initTyping()
  initMobileMenu()
  initSkills()
  initProjects()
  initTimeline()
  initContactForm()
  initScrollReveal()
  initParticles(document.getElementById('particle-canvas'))

  const threeCanvas = document.getElementById('three-canvas')
  if (threeCanvas) initThreeScene(threeCanvas)
})
