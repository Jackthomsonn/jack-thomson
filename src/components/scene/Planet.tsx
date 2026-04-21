import { useRef } from 'react'
import * as THREE from 'three'

const surfaceVert = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const surfaceFrag = `
  uniform vec3  uColor1;
  uniform vec3  uColor2;
  uniform float uBandFreq;
  uniform float uNoiseScale;
  uniform vec3  uLightDir;

  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),             hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p  = p * 2.0 + vec3(5.2, 1.3, 2.8);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float n = fbm(vPosition * uNoiseScale);

    // Gas giant bands or rocky/ice surface
    float pattern = mix(n, sin(vPosition.y * uBandFreq + n * 2.5) * 0.5 + 0.5, step(0.1, uBandFreq));

    vec3 color = mix(uColor1, uColor2, clamp(pattern, 0.0, 1.0));

    // Diffuse + ambient lighting
    float diffuse = max(0.0, dot(normalize(vNormal), normalize(uLightDir)));
    float light   = 0.18 + diffuse * 0.82;
    color *= light;

    // Dark terminator edge
    float terminator = smoothstep(-0.1, 0.2, dot(normalize(vNormal), normalize(uLightDir)));
    color = mix(color * 0.1, color, terminator);

    gl_FragColor = vec4(color, 1.0);
  }
`

const atmoVert = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vNormal   = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmoFrag = `
  uniform vec3 uColor;
  uniform vec3 uLightDir;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = 1.0 - max(0.0, dot(vNormal, viewDir));
    float rim     = pow(fresnel, 2.8);

    float lit = max(0.3, dot(vNormal, normalize(uLightDir)));
    float alpha = rim * 0.75 * lit;

    gl_FragColor = vec4(uColor, alpha);
  }
`

export interface PlanetConfig {
  radius:     number
  color1:     string
  color2:     string
  atmoColor:  string
  bandFreq:   number
  noiseScale: number
  rings?:     boolean
  ringColor?: string
}

const LIGHT_DIR = new THREE.Vector3(1.4, 0.8, 1.2).normalize()

export const Planet = ({ radius, color1, color2, atmoColor, bandFreq, noiseScale, rings, ringColor }: PlanetConfig) => {
  const surfaceUniforms = useRef({
    uColor1:    { value: new THREE.Color(color1) },
    uColor2:    { value: new THREE.Color(color2) },
    uBandFreq:  { value: bandFreq },
    uNoiseScale:{ value: noiseScale },
    uLightDir:  { value: LIGHT_DIR },
  })

  const atmoUniforms = useRef({
    uColor:    { value: new THREE.Color(atmoColor) },
    uLightDir: { value: LIGHT_DIR },
  })

  return (
    <group>
      {/* Planet surface */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial
          vertexShader={surfaceVert}
          fragmentShader={surfaceFrag}
          uniforms={surfaceUniforms.current}
        />
      </mesh>

      {/* Atmosphere inner glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.06, 64, 64]} />
        <shaderMaterial
          vertexShader={atmoVert}
          fragmentShader={atmoFrag}
          uniforms={atmoUniforms.current}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmosphere outer haze */}
      <mesh>
        <sphereGeometry args={[radius * 1.16, 64, 64]} />
        <shaderMaterial
          vertexShader={atmoVert}
          fragmentShader={atmoFrag}
          uniforms={{
            uColor:    { value: new THREE.Color(atmoColor) },
            uLightDir: { value: LIGHT_DIR },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rings */}
      {rings && (
        <mesh rotation={[Math.PI / 2.4, 0.2, 0.1]}>
          <ringGeometry args={[radius * 1.45, radius * 2.4, 128]} />
          <meshBasicMaterial
            color={ringColor ?? atmoColor}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
