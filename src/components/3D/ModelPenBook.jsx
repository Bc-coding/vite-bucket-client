import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import ModelPenBookComponent from "./ModelPenBookComponent";

export default function ModelPenBook() {
  return (
    <>
      <ModelPenBookComponent position={[1.2, 0.5, 0]} rotation-y='-45' />
    </>
  );
}
