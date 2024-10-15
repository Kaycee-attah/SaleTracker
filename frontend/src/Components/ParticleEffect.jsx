// Import necessary modules from Three.js and React Three Fiber
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';  // You can use 'Stars' or custom particles
import * as THREE from 'three';

const ParticleEffect = () => {
  return (
    <Canvas>
      {/* Adding a basic camera with controls */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* Add a simple starry particle effect */}
      <Stars
        radius={100}          // Radius of the particle system
        depth={50}            // How much in/out particles can move along z-axis
        count={5000}          // Number of particles
        factor={4}            // Size factor for particles
        saturation={0}        // Desaturation of stars
        fade={true}           // Enables fading in/out of particles
        speed={1}             // Speed of the particle movement
      />

      {/* Optionally, you can add a 3D object or model */}
    </Canvas>
  );
};

export default ParticleEffect;
