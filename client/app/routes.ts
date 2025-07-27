import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  //Ajouter les routes qui n'utilisent pas le layout ici
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  layout("./layout/MainLayout.tsx", [
    index("routes/_index.tsx"),
    //Ajouter les routes qui utilisent le layout ici
  ]),
] satisfies RouteConfig;
