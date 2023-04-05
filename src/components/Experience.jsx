import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("1D3FCC_051B5F_81A0F2_5579E9", 256);

  //console.log(matcapTexture);
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={1.2}
          lineHeight={0.7}
          letterSpacing={-0.01}
          curveSegments={12}
        >
          {`Let's create\nyour bucket list`}
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      {[...Array(100)].map((item, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.002}
        >
          <sphereGeometry />
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      ))}
    </>
  );
}
