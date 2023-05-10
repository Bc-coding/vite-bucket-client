import { useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import ThreeDText from "./3DText";
import ModelPenBook from "./ModelPenBook";
import Placeholder from "./Placeholder";
import { useControls } from "leva";

import { OrbitControls, useHelper } from "@react-three/drei";

export default function Experience() {
  const directionalLightRef = useRef();
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* <Perf position='top-left' /> */}

      <OrbitControls makeDefault autoRotate={true} />

      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[-2, 3, 4]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      {/* <color args={["ivory"]} attach='background' /> */}

      <Suspense fallback={<Placeholder />}>
        <ModelPenBook />
      </Suspense>
      {/* <ThreeDText /> */}
    </>
  );
}
