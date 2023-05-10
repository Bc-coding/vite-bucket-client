import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { useGLTF, Clone } from "@react-three/drei";
import ModelPenBookComponent from "./ModelPenBookComponent";

export default function ModelPenBook() {
  // const model = useLoader(GLTFLoader, "./blue_pen_and_book.glb");
  // const model = useGLTF("./blue_pen_and_book.glb");
  // console.log(model);

  return (
    <>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={20}
      >
        <planeGeometry />
        <meshStandardMaterial color='white' />
      </mesh>
      <ModelPenBookComponent
        // scale={0.5}
        position-x={0.7}
        // rotation-z={90}
      />
    </>
  );
}
