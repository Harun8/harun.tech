import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    name: 'AskPDFs',
    desc: 'PDF chat SaaS with RAG pipeline',
    tech: ['Next.js', 'Supabase', 'AI/ML'],
    link: 'https://askpdfs.io',
    category: 'personal',
    color: '#FF6B4A',
  },
  {
    name: 'BilligBid',
    desc: 'React Native grocery deals app for the Danish market',
    tech: ['React Native', 'Node.js', 'Hetzner'],
    link: null,
    category: 'personal',
    color: '#4A7CFF',
  },
  {
    name: 'ExifM',
    desc: 'Lightweight Node.js toolkit for EXIF metadata on images',
    tech: ['Node.js', 'NPM Package', 'CLI'],
    link: 'https://npmjs.com/package/exifm',
    category: 'personal',
    color: '#34D399',
  },
  {
    name: 'Dagenslands',
    desc: 'Daily geography puzzle game (Wordle-style)',
    tech: ['JavaScript', 'CSS'],
    link: 'https://dagenslands.dk',
    category: 'personal',
    color: '#A78BFA',
  },
  {
    name: 'UDRP AI',
    desc: 'MS Teams bot automating domain dispute forms for lawyers at Abion',
    tech: ['Automation', 'Legal Tech', 'Full-Stack'],
    link: 'https://abion.com',
    category: 'work',
    color: '#FBBF24',
  },
  {
    name: 'Gift-a-Friend',
    desc: 'Shopify referral plugin for store owners',
    tech: ['Shopify', 'Full-Stack'],
    link: null,
    category: 'work',
    color: '#F472B6',
  },
  {
    name: 'WordWorks',
    desc: 'RAG systems for intelligent document processing',
    tech: ['Full-Stack', 'RAG', 'AI/ML'],
    link: null,
    category: 'work',
    color: '#2DD4BF',
  },
]

// Key layout positions (col, row) on a virtual grid
const KEY_LAYOUT = [
  { col: 0, row: 0 },
  { col: 1.6, row: 0 },
  { col: 3.2, row: 0 },
  { col: 4.8, row: 0 },
  { col: 0.4, row: 1.6 },
  { col: 2.0, row: 1.6 },
  { col: 3.6, row: 1.6 },
]

const KEY_WIDTH = 1.3
const KEY_DEPTH = 1.3
const KEY_HEIGHT = 0.45
const KEY_RADIUS = 0.15
const KEY_GAP = 0.1

function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  shape.moveTo(x + r, y)
  shape.lineTo(x + w - r, y)
  shape.quadraticCurveTo(x + w, y, x + w, y + r)
  shape.lineTo(x + w, y + h - r)
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  shape.lineTo(x + r, y + h)
  shape.quadraticCurveTo(x, y + h, x, y + h - r)
  shape.lineTo(x, y + r)
  shape.quadraticCurveTo(x, y, x + r, y)
  return shape
}

function createKeyMesh(project, index) {
  const shape = createRoundedRectShape(KEY_WIDTH, KEY_DEPTH, KEY_RADIUS)
  const extrudeSettings = {
    depth: KEY_HEIGHT,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
  }
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

  const color = new THREE.Color(project.color)
  const sideColor = color.clone().multiplyScalar(0.55)

  const topMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.35,
    metalness: 0.1,
  })
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: sideColor,
    roughness: 0.5,
    metalness: 0.05,
  })

  // ExtrudeGeometry creates groups: 0=sides, 1=top, 2=bottom
  const mesh = new THREE.Mesh(geometry, [sideMaterial, topMaterial, sideMaterial])
  mesh.castShadow = true
  mesh.receiveShadow = true

  // Rotate so extruded direction is Y-up
  mesh.rotation.x = -Math.PI / 2

  const pos = KEY_LAYOUT[index]
  const spacing = KEY_WIDTH + KEY_GAP
  const totalW = 4.8 + KEY_WIDTH
  const totalD = 1.6 + KEY_DEPTH
  mesh.position.set(
    pos.col * (spacing / (KEY_WIDTH + KEY_GAP)) + KEY_WIDTH / 2 - totalW / 2,
    0,
    pos.row * (spacing / (KEY_WIDTH + KEY_GAP)) + KEY_DEPTH / 2 - totalD / 2
  )

  // Start below grid for intro animation
  mesh.position.y = -2
  mesh.userData = { project, index, baseY: 0.3, targetY: 0.3 }

  // Text label on key top
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 256, 256)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 36px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Split long names
  const name = project.name
  if (name.length > 8) {
    const words = name.split(/[-\s]/)
    words.forEach((word, i) => {
      ctx.fillText(word, 128, 110 + i * 42)
    })
  } else {
    ctx.fillText(name, 128, 128)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  const labelGeo = new THREE.PlaneGeometry(KEY_WIDTH * 0.85, KEY_DEPTH * 0.85)
  const labelMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })
  const label = new THREE.Mesh(labelGeo, labelMat)
  label.rotation.x = -Math.PI / 2
  label.position.y = KEY_HEIGHT + 0.06
  mesh.add(label)

  return mesh
}

function WebGLFallback({ filter, onSelect, selected, onClose }) {
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-2xl mx-auto">
      {filtered.map((project, i) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => (selected?.name === project.name ? onClose() : onSelect(project))}
          className="rounded-xl p-5 cursor-pointer border-2 transition-all"
          style={{
            background: selected?.name === project.name ? project.color + '30' : '#111',
            borderColor: project.color,
          }}
        >
          <h3 className="font-mono font-bold text-lg" style={{ color: project.color }}>
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{project.desc}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-2 inline-block underline"
              style={{ color: project.color }}
              onClick={(e) => e.stopPropagation()}
            >
              Visit site
            </a>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function Keyboard2() {
  const canvasRef = useRef(null)
  const sceneRef = useRef({})
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [webglAvailable, setWebglAvailable] = useState(true)
  const [mounted, setMounted] = useState(false)

  const handleKeyClick = useCallback((project) => {
    setSelectedProject((prev) => (prev?.name === project.name ? null : project))
  }, [])

  const handleClose = useCallback(() => {
    setSelectedProject(null)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check WebGL
    let gl
    try {
      gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        setWebglAvailable(false)
        return
      }
    } catch {
      setWebglAvailable(false)
      return
    }
    // Release the test context so Three.js can claim the canvas
    gl.getExtension('WEBGL_lose_context')?.loseContext()

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0a0a0a')
    scene.fog = new THREE.Fog('#0a0a0a', 12, 22)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const width = canvas.parentElement.clientWidth
    const height = canvas.parentElement.clientHeight
    renderer.setSize(width, height)

    // Isometric-ish perspective camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(0, 7, 8)
    camera.lookAt(0, 0, 0)

    const cameraTarget = {
      pos: new THREE.Vector3(0, 7, 8),
      lookAt: new THREE.Vector3(0, 0, 0),
    }

    // Lights
    const ambient = new THREE.AmbientLight('#ffffff', 0.5)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight('#ffffff', 1.2)
    dirLight.position.set(5, 10, 7)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.set(1024, 1024)
    dirLight.shadow.camera.near = 1
    dirLight.shadow.camera.far = 25
    dirLight.shadow.camera.left = -8
    dirLight.shadow.camera.right = 8
    dirLight.shadow.camera.top = 8
    dirLight.shadow.camera.bottom = -8
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight('#4A7CFF', 0.3)
    rimLight.position.set(-5, 4, -5)
    scene.add(rimLight)

    // Grid floor
    const gridGeo = new THREE.PlaneGeometry(20, 20, 40, 40)
    const gridMat = new THREE.MeshStandardMaterial({
      color: '#1a1a2e',
      roughness: 0.9,
      metalness: 0,
    })
    const gridMesh = new THREE.Mesh(gridGeo, gridMat)
    gridMesh.rotation.x = -Math.PI / 2
    gridMesh.position.y = -0.01
    gridMesh.receiveShadow = true
    scene.add(gridMesh)

    // Grid lines
    const gridHelper = new THREE.GridHelper(20, 40, '#1e293b', '#1e293b')
    gridHelper.position.y = 0
    scene.add(gridHelper)

    // Create keys
    const keys = []
    PROJECTS.forEach((project, i) => {
      const mesh = createKeyMesh(project, i)
      scene.add(mesh)
      keys.push(mesh)
    })

    sceneRef.current = { scene, renderer, camera, keys, cameraTarget }

    // Raycaster
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredKey = null

    const getIntersected = (event) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = event.touches ? event.touches[0].clientX : event.clientX
      const clientY = event.touches ? event.touches[0].clientY : event.clientY
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(keys, true)
      if (intersects.length > 0) {
        let obj = intersects[0].object
        while (obj.parent && !obj.userData.project) obj = obj.parent
        if (obj.userData.project) return obj
      }
      return null
    }

    const onPointerMove = (e) => {
      const hit = getIntersected(e)
      if (hoveredKey && hoveredKey !== hit) {
        hoveredKey.userData.targetY = hoveredKey.userData.baseY
        canvas.style.cursor = 'default'
      }
      if (hit) {
        hit.userData.targetY = hit.userData.baseY - 0.08
        canvas.style.cursor = 'pointer'
        hoveredKey = hit
      } else {
        hoveredKey = null
      }
    }

    const onPointerDown = (e) => {
      const hit = getIntersected(e)
      if (hit) {
        const project = hit.userData.project
        // Dispatch to React state via a custom event (cleaner than reaching into React)
        canvas.dispatchEvent(new CustomEvent('keyclick', { detail: project }))
      }
    }

    const handleCustomClick = (e) => {
      handleKeyClick(e.detail)
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('keyclick', handleCustomClick)

    // Touch orbit
    let isDragging = false
    let prevTouch = { x: 0, y: 0 }
    let orbitAngle = 0
    let orbitPitch = 0.65

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return
      const dx = e.touches[0].clientX - prevTouch.x
      const dy = e.touches[0].clientY - prevTouch.y
      orbitAngle += dx * 0.005
      orbitPitch = Math.max(0.3, Math.min(1.2, orbitPitch - dy * 0.005))
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }

      const radius = 10
      cameraTarget.pos.set(
        Math.sin(orbitAngle) * radius * Math.cos(orbitPitch),
        radius * Math.sin(orbitPitch),
        Math.cos(orbitAngle) * radius * Math.cos(orbitPitch)
      )
    }
    const onTouchEnd = () => {
      isDragging = false
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)

    // Mouse wheel for subtle zoom
    const onWheel = (e) => {
      const z = cameraTarget.pos.z + e.deltaY * 0.005
      cameraTarget.pos.z = Math.max(4, Math.min(14, z))
      cameraTarget.pos.y = Math.max(3, Math.min(10, cameraTarget.pos.y + e.deltaY * 0.002))
    }
    canvas.addEventListener('wheel', onWheel, { passive: true })

    // Resize
    const onResize = () => {
      const w = canvas.parentElement.clientWidth
      const h = canvas.parentElement.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Intro animation timeline
    const startTime = performance.now()
    const introDelay = 200 // ms per key stagger

    // Animation loop
    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = performance.now() - startTime
      const dt = Math.min(clock.getDelta(), 0.05)

      // Intro: keys rise up
      keys.forEach((key, i) => {
        const keyStart = i * introDelay
        const progress = Math.max(0, Math.min(1, (elapsed - keyStart) / 600))
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3)
        const introY = -2 + (key.userData.baseY + 2) * ease

        // Hover depress
        const targetY = key.userData.targetY
        const currentY = key.position.y
        const smoothY = progress >= 1 ? currentY + (targetY - currentY) * 8 * dt : introY

        key.position.y = smoothY

        // Subtle floating bob after intro
        if (progress >= 1) {
          const bob = Math.sin(elapsed * 0.001 + i * 1.2) * 0.03
          key.position.y += bob
        }
      })

      // Smooth camera
      camera.position.lerp(cameraTarget.pos, 3 * dt)
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      camera.lookAt(
        camera.position.x + (cameraTarget.lookAt.x - camera.position.x) * 0.1,
        cameraTarget.lookAt.y,
        camera.position.z + (cameraTarget.lookAt.z - camera.position.z) * 0.1
      )

      renderer.render(scene, camera)
    }
    animate()

    setMounted(true)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('keyclick', handleCustomClick)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)

      // Dispose Three.js resources
      keys.forEach((key) => {
        key.geometry.dispose()
        if (Array.isArray(key.material)) {
          key.material.forEach((m) => m.dispose())
        } else {
          key.material.dispose()
        }
        key.children.forEach((child) => {
          child.geometry?.dispose()
          child.material?.map?.dispose()
          child.material?.dispose()
        })
      })
      gridGeo.dispose()
      gridMat.dispose()
      renderer.dispose()
    }
  }, [handleKeyClick])

  // Filter keys in 3D scene by toggling visibility
  useEffect(() => {
    const { keys } = sceneRef.current
    if (!keys) return
    keys.forEach((mesh) => {
      const cat = mesh.userData.project.category
      mesh.visible = filter === 'all' || cat === filter
    })
  }, [filter])

  // Camera focus on selected project
  useEffect(() => {
    const { keys, cameraTarget } = sceneRef.current
    if (!keys || !cameraTarget) return

    if (selectedProject) {
      const mesh = keys.find((k) => k.userData.project.name === selectedProject.name)
      if (mesh) {
        cameraTarget.pos.set(mesh.position.x, 5, mesh.position.z + 5)
        cameraTarget.lookAt.set(mesh.position.x, 0, mesh.position.z)
      }
    } else {
      cameraTarget.pos.set(0, 7, 8)
      cameraTarget.lookAt.set(0, 0, 0)
    }
  }, [selectedProject])

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden font-mono">
      {/* Filter toggle */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
        {['all', 'personal', 'work'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
              filter === f
                ? 'bg-white text-black font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-14 left-1/2 -translate-x-1/2 z-20 text-white text-sm tracking-[0.3em] uppercase opacity-60"
      >
        Projects
      </motion.h1>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Fallback */}
      {!webglAvailable && (
        <div className="absolute inset-0 overflow-y-auto pt-24 pb-8 bg-[#0a0a0a]">
          <WebGLFallback
            filter={filter}
            onSelect={(p) => setSelectedProject(p)}
            selected={selectedProject}
            onClose={handleClose}
          />
        </div>
      )}

      {/* Project detail overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={selectedProject.name}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90vw] max-w-md"
          >
            <div
              className="rounded-2xl p-6 backdrop-blur-xl border shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.color}15, ${selectedProject.color}08)`,
                borderColor: selectedProject.color + '40',
                boxShadow: `0 20px 60px ${selectedProject.color}20`,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all text-sm"
              >
                x
              </button>

              {/* Category badge */}
              <span
                className="inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 font-bold"
                style={{
                  background: selectedProject.color + '25',
                  color: selectedProject.color,
                }}
              >
                {selectedProject.category}
              </span>

              <h2 className="text-2xl font-bold text-white mb-1">{selectedProject.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{selectedProject.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: selectedProject.color + '18',
                      color: selectedProject.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: selectedProject.color,
                    color: '#000',
                  }}
                >
                  Visit project
                  <span className="text-xs">-&gt;</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 0.4 : 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-gray-500 text-[10px] tracking-wider"
      >
        CLICK A KEY TO EXPLORE / SCROLL TO ZOOM / DRAG TO ORBIT
      </motion.p>
    </div>
  )
}
