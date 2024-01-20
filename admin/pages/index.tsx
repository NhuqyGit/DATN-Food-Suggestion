import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
  return <NavigateToResource resource="blog-posts" />;
}

Home.noLayout = true;
