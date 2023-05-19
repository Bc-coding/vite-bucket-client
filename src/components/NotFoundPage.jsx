import { Link } from "@chakra-ui/react";
import Layout from "./Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <div>
        <p style={{ textAlign: "center" }}>
          <Link href={`/`}>Home page</Link>
        </p>
      </div>
    </Layout>
  );
}
