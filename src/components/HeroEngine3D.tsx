import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    Cylinder,
    Box,
    Torus
} from '@react-three/drei';
import * as THREE from 'three';

// Engine Block - Creates a stylized V8 engine using primitives
function EngineBlock() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={groupRef} scale={0.8}>
                {/* Main Engine Block */}
                <Box args={[2, 1.5, 1.5]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
                </Box>

                {/* Cylinder Bank Left (V-shape) */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`left-${i}`} position={[-0.6 + i * 0.4, 0.9, -0.3]} rotation={[0.3, 0, 0]}>
                        <Cylinder args={[0.12, 0.12, 0.8, 16]}>
                            <meshStandardMaterial color="#404040" metalness={0.95} roughness={0.15} />
                        </Cylinder>
                        {/* Piston heads */}
                        <Cylinder args={[0.1, 0.1, 0.15, 16]} position={[0, 0.45, 0]}>
                            <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} emissive="#3b82f6" emissiveIntensity={0.3} />
                        </Cylinder>
                    </group>
                ))}

                {/* Cylinder Bank Right (V-shape) */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`right-${i}`} position={[-0.6 + i * 0.4, 0.9, 0.3]} rotation={[-0.3, 0, 0]}>
                        <Cylinder args={[0.12, 0.12, 0.8, 16]}>
                            <meshStandardMaterial color="#404040" metalness={0.95} roughness={0.15} />
                        </Cylinder>
                        {/* Piston heads */}
                        <Cylinder args={[0.1, 0.1, 0.15, 16]} position={[0, 0.45, 0]}>
                            <meshStandardMaterial color="#22d3ee" metalness={0.9} roughness={0.1} emissive="#22d3ee" emissiveIntensity={0.3} />
                        </Cylinder>
                    </group>
                ))}

                {/* Intake Manifold */}
                <Box args={[1.8, 0.3, 0.6]} position={[0, 1.4, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
                </Box>

                {/* Throttle Body */}
                <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0, 1.7, 0]}>
                    <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
                </Cylinder>

                {/* Oil Pan */}
                <Box args={[1.8, 0.4, 1.2]} position={[0, -1, 0]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.5} />
                </Box>

                {/* Exhaust Headers Left */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`exhaust-left-${i}`}>
                        <Torus args={[0.15, 0.04, 8, 16, Math.PI / 2]} position={[-0.6 + i * 0.4, 0.3, -0.9]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.3} />
                        </Torus>
                    </group>
                ))}

                {/* Exhaust Headers Right */}
                {[0, 1, 2, 3].map((i) => (
                    <group key={`exhaust-right-${i}`}>
                        <Torus args={[0.15, 0.04, 8, 16, Math.PI / 2]} position={[-0.6 + i * 0.4, 0.3, 0.9]} rotation={[0, -Math.PI / 2, 0]}>
                            <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.3} />
                        </Torus>
                    </group>
                ))}

                {/* Glowing accent ring */}
                <Torus args={[1.3, 0.02, 16, 64]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.6} />
                </Torus>
            </group>
        </Float>
    );
}

// Loading fallback
function LoadingFallback() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
            <meshStandardMaterial
                color="#3b82f6"
                metalness={0.8}
                roughness={0.2}
                wireframe
            />
        </mesh>
    );
}

// Main exported component
export default function HeroEngine3D() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [4, 2, 4], fov: 40 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#3b82f6" />
                <pointLight position={[5, 5, 5]} intensity={0.3} color="#22d3ee" />
                <spotLight
                    position={[0, 8, 0]}
                    angle={0.4}
                    penumbra={1}
                    intensity={0.8}
                    color="#ffffff"
                />

                {/* The 3D Engine Model */}
                <Suspense fallback={<LoadingFallback />}>
                    <EngineBlock />
                    <Environment preset="city" />
                </Suspense>

                {/* Camera controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
}
