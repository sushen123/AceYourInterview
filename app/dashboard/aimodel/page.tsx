"use client"
import { Canvas } from '@react-three/fiber'
import {Experience} from '@/components/Experience'
import { Leva } from 'leva'
export default function AI() {
    return (
        <div>
       
        <Leva  />
        <Canvas shadows camera={{position: [0,-8,0] }} >
            <Experience  />
        </Canvas>
        </div>
        
    )
}