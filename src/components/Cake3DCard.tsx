import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Cake3DCardProps {
    image: string;
    name: string;
    price?: string;
    onClick?: () => void;
}

const Card = ({ image, name, price, onClick }: Cake3DCardProps) => {
    const ref = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useFrame((state, delta) => {
        if (ref.current) {
            // Smooth tilt effect
            const targetRotationY = hovered ? 0.2 : 0;
            const targetRotationX = hovered ? -0.1 : 0;
            const targetScale = hovered ? 1.05 : 1;

            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, delta * 5);
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotationX, delta * 5);
            ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, delta * 5));
        }
    });

    return (
        <group
            ref={ref}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Image url={image} scale={[3, 4] as any} position={[0, 0, 0]} />
            {/* Overlay Text - simpler to do in HTML overlay, but demonstrating 3D text possibility */}
            {/* We will rely on an HTML overlay for accessibility and sharpness, keeping the canvas as the background visual */}
        </group>
    );
};


export const Cake3DCard = ({ image, name, price, onClick }: Cake3DCardProps) => {
    return (
        <div className="relative w-full h-[400px] border rounded-xl overflow-hidden bg-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Card image={image} name={name} price={price} onClick={onClick} />
                </Canvas>
            </div>

            {/* HTML Overlay for Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white pointer-events-none">
                <h3 className="text-xl font-bold font-serif">{name}</h3>
                {price && <p className="text-sm opacity-90">{price}</p>}
            </div>
        </div>
    );
};
