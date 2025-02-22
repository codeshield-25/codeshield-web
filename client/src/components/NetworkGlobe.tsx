"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Points } from "@react-three/drei"
import type * as THREE from "three"
import { motion } from "framer-motion-3d"

function NetworkPoints() {
  const points = useRef<THREE.Points>(null)
  const lines = useRef<THREE.LineSegments>(null)

  // Generate random points on a sphere
  const count = 2000
  const [positions, connections] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const connections = []

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 5

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Create connections between nearby points
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          const distance = Math.sqrt(
            Math.pow(positions[i * 3] - positions[j * 3], 2) +
              Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
              Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2),
          )
          if (distance < 2) {
            connections.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
            connections.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
          }
        }
      }
    }

    return [positions, new Float32Array(connections)]
  }, [])

  useFrame((state) => {
    if (points.current && lines.current) {
      points.current.rotation.y += 0.001
      lines.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      <Points ref={points}>
        <pointsMaterial size={0.05} color="#00ffff" sizeAttenuation transparent opacity={0.8} />
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
      </Points>
      <lineSegments ref={lines}>
        <lineBasicMaterial color="#00ffff" opacity={0.2} transparent />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
      </lineSegments>
    </group>
  )
}

export function NetworkGlobe() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <motion.group initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <NetworkPoints />
        </motion.group>
      </Canvas>
    </div>
  )
}

