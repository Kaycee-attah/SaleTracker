import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model(props) {
  const { nodes, materials } = useGLTF('/sumud-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_0.geometry} material={materials.Material_0} position={[0.071, -2.521, 0.098]} scale={20} />
    </group>
  );
}

const Sumud = () => {
  const controlsRef = useRef();
  
  return (
    <div className="flex items-center justify-center h-full bg-white w-fit" style={{ width: '300px', height: '300px' }}>
      <Canvas 
        camera={{ position: [0, 0, 350], fov: 15 }} // Camera positioned far enough to view large scale
      >
        <Suspense fallback={null}>
          <ambientLight />
          <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />

          <OrbitControls
            ref={controlsRef}
            mo
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            target={[0, 0, 0]} // Target the center of the scaled model
            minDistance={50} // Prevent zooming in too much
            maxDistance={200} // Prevent zooming out too far
          />

          {/* The 3D Model */}
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Sumud;
