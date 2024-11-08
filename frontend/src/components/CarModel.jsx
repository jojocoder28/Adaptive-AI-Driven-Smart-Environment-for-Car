// import React from 'react';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// function CarModel() {
//   const gltf = useLoader(GLTFLoader, '/Models/scene.gltf');

//   return <primitive object={gltf.scene} scale={1} position={[0, -200, 0]} />;
// }

// export default CarModel;

import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CarModel(props) {
  const { nodes, materials } = useGLTF('/Models/sedan_car.glb');
  const lightRef = useRef();

  // Update the light position based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      lightRef.current.position.set(x * 300, y * 300, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <>
    <directionalLight ref={lightRef} intensity={1} position={[0, 100, 100]} />
    <group {...props} dispose={null}>
      <group position={[113.016, 45.013, 245.161]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.sedan_car_wheel_lf_sedan_car_wheel_lf_1_0.geometry} material={materials.sedan_car_wheel_lf_1} />
        <mesh geometry={nodes.sedan_car_wheel_lf_sedan_car_wheel_lf_2_0.geometry} material={materials.sedan_car_wheel_lf_2} />
      </group>
      <group position={[0, -3.25, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.sedan_car_body_sedan_car_body_1_0.geometry} material={materials.sedan_car_body_1} />
        <mesh geometry={nodes.sedan_car_body_sedan_car_body_3_0.geometry} material={materials.sedan_car_body_3} />
        <mesh geometry={nodes.sedan_car_body_sedan_car_body_2_0.geometry} material={materials.sedan_car_body_2} />
      </group>
      <group position={[113.016, 45.013, -112.553]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.sedan_car_wheel_lb_sedan_car_wheel_lb_1_0.geometry} material={materials.sedan_car_wheel_lb_1} />
        <mesh geometry={nodes.sedan_car_wheel_lb_sedan_car_wheel_lb_2_0.geometry} material={materials.sedan_car_wheel_lb_2} />
      </group>
      <group position={[-96.689, 45.013, 245.161]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.sedan_car_wheel_rf_sedan_car_wheel_rf_1_0.geometry} material={materials.sedan_car_wheel_rf_1} />
        <mesh geometry={nodes.sedan_car_wheel_rf_sedan_car_wheel_rf_2_0.geometry} material={materials.sedan_car_wheel_rf_2} />
      </group>
      <group position={[-96.689, 45.013, -112.553]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.sedan_car_wheel_rb_sedan_car_wheel_rb_1_0.geometry} material={materials.sedan_car_wheel_rb_1} />
        <mesh geometry={nodes.sedan_car_wheel_rb_sedan_car_wheel_rb_2_0.geometry} material={materials.sedan_car_wheel_rb_2} />
      </group>
    </group>
    </>
  )
}

useGLTF.preload('/Models/sedan_car.glb')

export default CarModel;