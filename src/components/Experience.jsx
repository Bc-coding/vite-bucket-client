import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const boxGeometry = new THREE.BoxGeometry();
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const boxGroup = useRef();

  useFrame((state, delta) => {
    for (const box of boxGroup.current.children) {
      box.rotation.y += delta * 0.2;
    }
  });

  const [matcapTexture] = useMatcapTexture("1D3FCC_051B5F_81A0F2_5579E9", 256);

  //console.log(matcapTexture);

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={1.2}
          lineHeight={0.7}
          letterSpacing={-0.01}
          curveSegments={12}
        >
          {`Let's create\nyour bucket list`}
          {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
        </Text3D>
      </Center>

      <group ref={boxGroup}>
        {[...Array(100)].map((item, i) => (
          <mesh
            key={i}
            geometry={boxGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.002}
          >
            {/* <sphereGeometry />
          <meshMatcapMaterial matcap={matcapTexture} /> */}
          </mesh>
        ))}
      </group>
    </>
  );
}
