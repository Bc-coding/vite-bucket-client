import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, useMatcapTexture } from "@react-three/drei";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();

const material_blue = new THREE.MeshMatcapMaterial();
const material_purple = new THREE.MeshMatcapMaterial();
const material_shine = new THREE.MeshMatcapMaterial();

export default function ThreeDText() {
  const boxGroup = useRef();

  useFrame((state, delta) => {
    for (const box of boxGroup.current.children) {
      box.rotation.y += delta * 0.2;
    }
  });

  const [matcapTexture_blue] = useMatcapTexture(
    "1D3FCC_051B5F_81A0F2_5579E9",
    256
  );

  const [matcapTexture_purple] = useMatcapTexture(
    "5B4CBC_B59AF2_9B84EB_8F78E4",
    256
  );

  const [matcapTexture_shine] = useMatcapTexture(
    "8955D0_744CC4_EA4AEF_954DA4",
    256
  );

  //console.log(matcapTexture);

  useEffect(() => {
    matcapTexture_blue.encoding = THREE.sRGBEncoding;
    matcapTexture_blue.needsUpdate = true;

    material_blue.matcap = matcapTexture_blue;
    material_blue.needsUpdate = true;

    matcapTexture_purple.encoding = THREE.sRGBEncoding;
    matcapTexture_purple.needsUpdate = true;

    material_purple.matcap = matcapTexture_purple;
    material_purple.needsUpdate = true;

    matcapTexture_shine.encoding = THREE.sRGBEncoding;
    matcapTexture_shine.needsUpdate = true;

    material_shine.matcap = matcapTexture_shine;
    material_shine.needsUpdate = true;
  }, []);

  return (
    <>
      <Center>
        <Text3D
          material={material_blue}
          font='./fonts/helvetiker_regular.typeface.json'
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
        {[...Array(50)].map((item, i) => (
          <mesh
            key={i}
            geometry={boxGeometry}
            material={material_shine}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.002}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            {/* <sphereGeometry />
          <meshMatcapMaterial matcap={matcapTexture} /> */}
          </mesh>
        ))}
      </group>

      <group>
        {[...Array(100)].map((item, i) => (
          <mesh
            key={i}
            geometry={sphereGeometry}
            material={material_purple}
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
