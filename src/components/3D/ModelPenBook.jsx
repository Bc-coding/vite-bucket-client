import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import ModelPenBookComponent from "./ModelPenBookComponent";

export default function ModelPenBook() {
  return (
    <>
      <ModelPenBookComponent
        // scale={0.5}
        position-x={0.7}
        // rotation-z={90}
      />
    </>
  );
}
