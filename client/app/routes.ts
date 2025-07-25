import {
  type RouteConfig,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  //Ajouter les routes qui n'utilisent pas le layout ici

  layout("./layout/MainLayout.tsx", [
    index("routes/_index.tsx"),
    //Ajouter les routes qui utilisent le layout ici
  ]),
] satisfies RouteConfig;
