import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Particles } from './Particles'

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 80 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      frameloop="always"
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#00000d']} />
      <Particles />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>
    </Canvas>
  )
}
