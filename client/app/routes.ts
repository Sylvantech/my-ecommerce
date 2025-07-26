import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
