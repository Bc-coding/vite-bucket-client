import React from "react";
import { IdeasForActivity } from "../components";
import Layout from "../components/Layout";
import Header from "../components/header/Header";

import { Canvas } from "@react-three/fiber";
import Experience from "../components/3D/Experience";

const Landing = () => {
  return (
    <>
      <Header />
      <Canvas
        shadows={false}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 5, 8],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default Landing;
