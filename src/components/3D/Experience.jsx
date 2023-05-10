import { useEffect, useRef, Suspense } from "react";

import * as THREE from "three";

import { Perf } from "r3f-perf";
import ThreeDText from "./3DText";
import ModelPenBook from "./ModelPenBook";
import Placeholder from "./Placeholder";

import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      {/* <Perf position='top-left' /> */}

      <OrbitControls makeDefault autoRotate={true} />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Suspense fallback={<Placeholder />}>
        <ModelPenBook />
      </Suspense>
      {/* <ThreeDText /> */}
    </>
  );
}
