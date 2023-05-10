import { useEffect, useRef, Suspense } from "react";

import * as THREE from "three";

import { Perf } from "r3f-perf";
import ThreeDText from "./3DText";
import ModelPenBook from "./ModelPenBook";
import Placeholder from "./Placeholder";
import { useControls } from "leva";

import {
  OrbitControls,
  useHelper,
  BakeShadows,
  ContactShadows,
} from "@react-three/drei";

export default function Experience() {
  const directionalLightRef = useRef();
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  });

  return (
    <>
      {/* <Perf position='top-left' /> */}

      <OrbitControls makeDefault autoRotate={true} />

      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[1, 3, 4]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <color args={["ivory"]} attach='background' />

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={20}
      >
        <planeGeometry />
        <meshStandardMaterial color='white' />
      </mesh>

      <Suspense fallback={<Placeholder />}>
        <ModelPenBook />
      </Suspense>
      {/* <ThreeDText /> */}
    </>
  );
}
