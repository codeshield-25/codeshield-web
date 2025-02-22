import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Sphere, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { useInView } from "react-intersection-observer"
import type * as THREE from "three"

function AnimatedGlobe() {
  const globeRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002
    }
  })

  return (
    <motion.group initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
      <Sphere ref={globeRef} args={[5, 64, 64]}>
        <meshStandardMaterial color="#0a2540" wireframe />
      </Sphere>
    </motion.group>
  )
}

export function HeroSection3D() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      {inView && (
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedGlobe />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      )}
    </div>
  )
}

