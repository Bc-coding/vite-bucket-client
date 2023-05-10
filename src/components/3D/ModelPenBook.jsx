import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import ModelPenBookComponent from "./ModelPenBookComponent";

export default function ModelPenBook() {
  return (
    <>
      <ModelPenBookComponent position-x={0.7} />
    </>
  );
}
