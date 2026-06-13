export function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const delay = parseInt(el.dataset.delay) || 0
        setTimeout(() => el.classList.add('revealed'), delay)
        observer.unobserve(el)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  })

  document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
    observer.observe(el)
  })
}
