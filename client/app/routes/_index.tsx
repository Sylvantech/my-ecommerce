import type { Route } from "./+types/_index";
import { Welcome } from "./welcome/welcome";

export function meta(): Route.MetaFunction {
  return () => [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
