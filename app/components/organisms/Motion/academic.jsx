"use client"

import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
extend({ Canvas })
import { Trail, Float, Line, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Academic() {
  return (
    // <Float speed={5} rotationIntensity={1.1} floatIntensity={1.1}>
      <Atom />
    // </Float>
  )
}

function Atom(props) {
  return (
    <group {...props}>
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, 0.8]} speed={6} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, -0.8]} speed={6} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, 1.6]} speed={6} />
      <ElectronWithSphere radius={5.5} color={0x4b8d2d} position={[0, 0, 0.5]} speed={6} />
      <Electron radius={5.5} color={0x4b8d2d} position={[0, 0, 0.5]} rotation={[0, 0, 0.9]} speed={6} />
      <Electron radius={5.5} color={0x4b8d2d} position={[0, 0, 0.5]} rotation={[0, 0, -0.9]} speed={6} />
      <Electron radius={5.5} color={0x4b8d2d} position={[0, 0, 0.5]} rotation={[0, 0, 1.5]} speed={6} />
      <Electron radius={5} color={0x01732e} position={[0, 0, 0.5]} speed={6} />
      <ElectronWithSphere radius={5} color={0x01732e} position={[0, 0, 0.5]} rotation={[0, 0, 0.8]} speed={6} />
      <Electron radius={5} color={0x01732e} position={[0, 0, 0.5]} rotation={[0, 0, -0.8]} speed={6} />
      <Electron radius={5} color={0x01732e} position={[0, 0, 0.5]} rotation={[0, 0, 1.6]} speed={6} />
      <Sphere args={[0.4, 64, 64]}>
        <meshBasicMaterial color={[10, 20, 5]} toneMapped={false} />
      </Sphere>
    </group>
  )
}

function Electron({ radius = 6.5, speed = 5, color = 0x81a52c, ...props }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)
  })
  return (
    <group {...props}>
      <Trail width={0.1} length={3} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <mesh ref={ref}>
        </mesh>
      </Trail>
    </group>
  )
}

function ElectronWithSphere({ radius = 6.5, speed = 5, color = 0x81a52c, ...props }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)
  })
  return (
    <group {...props}>
      <Trail width={0.1} length={3} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.15]}/>
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  )
}