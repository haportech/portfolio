import * as THREE from 'three'

export function initThreeScene(canvas) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const shapes = []
  const geometries = [
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.TorusGeometry(1, 0.3, 16, 32),
    new THREE.OctahedronGeometry(1),
    new THREE.TorusKnotGeometry(0.8, 0.25, 64, 8),
    new THREE.DodecahedronGeometry(1),
  ]

  const colors = [0x2563eb, 0x3b82f6, 0x60a5fa, 0x1d4ed8]

  for (let i = 0; i < 6; i++) {
    const geo = geometries[i % geometries.length]
    const color = colors[i % colors.length]
    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.15 + Math.random() * 0.15,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10,
      -5 - Math.random() * 10
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = {
      rotSpeed: { x: (Math.random() - 0.5) * 0.005, y: (Math.random() - 0.5) * 0.005 },
      floatAmp: 0.2 + Math.random() * 0.3,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: mesh.position.y,
    }
    scene.add(mesh)
    shapes.push(mesh)
  }

  camera.position.z = 8

  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  let time = 0

  function animate() {
    requestAnimationFrame(animate)
    time += 0.01

    targetX += (mouseX * 0.3 - targetX) * 0.02
    targetY += (mouseY * 0.3 - targetY) * 0.02

    camera.position.x += (targetX * 2 - camera.position.x) * 0.02
    camera.position.y += (targetY * 1.5 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    shapes.forEach((mesh, i) => {
      mesh.rotation.x += mesh.userData.rotSpeed.x
      mesh.rotation.y += mesh.userData.rotSpeed.y
      mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * mesh.userData.floatAmp
    })

    renderer.render(scene, camera)
  }

  animate()

  return () => {
    renderer.dispose()
    shapes.forEach(s => {
      s.geometry.dispose()
      s.material.dispose()
    })
  }
}
