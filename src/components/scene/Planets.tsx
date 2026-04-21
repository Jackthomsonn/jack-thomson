import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Planet, PlanetConfig } from './Planet'
import { DEPTH, BASE_SPEED } from './Particles'

interface PlanetEntry extends PlanetConfig {
  startPos: [number, number, number]
  rotSpeed: number
}

const PLANETS: PlanetEntry[] = [
  {
    startPos:  [10, 3, -55],
    radius:    6.5,
    color1:    '#0d2448',
    color2:    '#2e6db4',
    atmoColor: '#5ba3e8',
    bandFreq:  5.5,
    noiseScale: 1.8,
    rotSpeed:  0.8,
  },
  {
    startPos:  [-14, -2.5, -125],
    radius:    3.8,
    color1:    '#3b0e06',
    color2:    '#a83210',
    atmoColor: '#e8784a',
    bandFreq:  0.0,
    noiseScale: 3.5,
    rotSpeed:  1.2,
  },
  {
    startPos:  [13, -7, -195],
    radius:    8.5,
    color1:    '#1a0838',
    color2:    '#6d28d9',
    atmoColor: '#a78bfa',
    bandFreq:  4.0,
    noiseScale: 2.2,
    rings:     true,
    ringColor: '#c4b5fd',
    rotSpeed:  0.6,
  },
  {
    startPos:  [-9, 7, -265],
    radius:    3.2,
    color1:    '#c8dff8',
    color2:    '#e8f4ff',
    atmoColor: '#a5c8f8',
    bandFreq:  0.0,
    noiseScale: 1.2,
    rotSpeed:  1.0,
  },
]

export const Planets = () => {
  const groupRefs = useRef<(any | null)[]>(new Array(PLANETS.length).fill(null))

  useFrame((_, delta) => {
    groupRefs.current.forEach((group, i) => {
      if (!group) return
      group.position.z += BASE_SPEED * delta
      if (group.position.z > 20) {
        group.position.z -= DEPTH
      }
      group.rotation.y += delta * 0.06 * PLANETS[i].rotSpeed
    })
  })

  return (
    <>
      {PLANETS.map((planet, i) => (
        <group
          key={i}
          ref={el => { groupRefs.current[i] = el }}
          position={planet.startPos}
        >
          <Planet {...planet} />
        </group>
      ))}
    </>
  )
}
