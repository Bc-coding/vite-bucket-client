import { useEffect } from "react";
import { Text3D, Center, useMatcapTexture } from "@react-three/drei";
import * as THREE from "three";
const material_hello = new THREE.MeshMatcapMaterial();

export default function Placeholder() {
  const [matcapTexture_hello] = useMatcapTexture(
    "6C52AA_C9A6EA_A681D6_B494E2",
    256
  );

  useEffect(() => {
    matcapTexture_hello.encoding = THREE.sRGBEncoding;
    matcapTexture_hello.needsUpdate = true;

    material_hello.matcap = matcapTexture_hello;
    material_hello.needsUpdate = true;
  }, []);
  return (
    <Center>
      <Text3D
        material={material_hello}
        font='./fonts/helvetiker_regular.typeface.json'
        size={0.75}
        height={1.2}
        lineHeight={0.7}
        letterSpacing={-0.01}
        curveSegments={12}
      >
        {`Loading! `}
        {/* <meshMatcapMaterial matcap={matcapTexture_blue} /> */}
      </Text3D>
    </Center>
  );
}
