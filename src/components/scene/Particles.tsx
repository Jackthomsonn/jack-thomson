import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 3000
const MOUSE_STRENGTH = 12
const SMOOTHING = 0.08

export const DEPTH = 300.0
export const BASE_SPEED = 12.0

const vertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSpeed;

  uniform float uTime;
  uniform float uBaseSpeed;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    float z = mod(pos.z + ${DEPTH}.0 + uTime * uBaseSpeed * aSpeed, ${DEPTH}.0) - ${DEPTH}.0;
    pos.z = z;

    float depth = (z + ${DEPTH}.0) / ${DEPTH}.0;
    vDepth = depth;

    float warp = depth * depth * 0.1;
    pos.x *= 1.0 + warp;
    pos.y *= 1.0 + warp;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    float fadeIn  = smoothstep(0.0, 0.15, depth);
    float fadeOut = 1.0 - smoothstep(0.75, 1.0, depth);
    vAlpha = fadeIn * fadeOut;

    float sizeBoost = 1.0 + depth * 1.8;
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * sizeBoost;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.18, d);
    float glow = 1.0 - smoothstep(0.1, 0.5, d);
    float alpha = (core * 0.9 + glow * 0.1) * vAlpha;

    vec3 color = vColor + core * vec3(0.4, 0.4, 0.5) * vDepth;

    gl_FragColor = vec4(color, alpha);
  }
`

export const Particles = () => {
  const pointsRef = useRef<THREE.Points<any, any>>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const geometryRef = useRef<THREE.BufferGeometry<any>>(null!)
  const { camera } = useThree()

  // ✅ GLOBAL MOUSE (fixes your issue)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const { positions, sizes, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)

    const dimStar = new THREE.Color('#0d1a2e')
    const white = new THREE.Color('#c8dcff')
    const yellow = new THREE.Color('#FFD200')
    const cyan = new THREE.Color('#22d3ee')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.sqrt(Math.random()) * 18

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = -(Math.random() * DEPTH)

      speeds[i] = 0.5 + Math.random() * 1.0

      const r = Math.random()

      if (r < 0.78) {
        sizes[i] = 0.08 + Math.random() * 0.2
        const dim = dimStar.clone().multiplyScalar(0.6 + Math.random() * 0.8)
        colors[i * 3] = dim.r; colors[i * 3 + 1] = dim.g; colors[i * 3 + 2] = dim.b
      } else if (r < 0.90) {
        sizes[i] = 0.2 + Math.random() * 0.5
        const b = 0.6 + Math.random() * 0.4
        colors[i * 3] = white.r * b; colors[i * 3 + 1] = white.g * b; colors[i * 3 + 2] = white.b * b
      } else if (r < 0.95) {
        sizes[i] = 0.3 + Math.random() * 0.7
        colors[i * 3] = yellow.r; colors[i * 3 + 1] = yellow.g; colors[i * 3 + 2] = yellow.b
      } else if (r < 0.98) {
        sizes[i] = 0.25 + Math.random() * 0.5
        colors[i * 3] = cyan.r; colors[i * 3 + 1] = cyan.g; colors[i * 3 + 2] = cyan.b
      } else {
        sizes[i] = 1.2 + Math.random() * 1.5
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0
      }
    }

    return { positions, sizes, colors, speeds }
  }, [])

  useEffect(() => {
    const geo = geometryRef.current
    if (!geo) return
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
  }, [positions, sizes, colors, speeds])

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uBaseSpeed: { value: BASE_SPEED },
  })

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta

    const m = mouseRef.current

    camera.position.x += (m.x * MOUSE_STRENGTH - camera.position.x) * SMOOTHING
    camera.position.y += (m.y * MOUSE_STRENGTH - camera.position.y) * SMOOTHING

    camera.lookAt(m.x * 2, m.y * 1.5, -20)
  })

  return (
    <points ref={pointsRef as any}>
      <bufferGeometry ref={geometryRef as any} />
      <shaderMaterial
        ref={materialRef as any}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}