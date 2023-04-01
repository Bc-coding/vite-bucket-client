import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

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
          {`Join us!\nLet's create\nyour bucket list`}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </>
  );
}
