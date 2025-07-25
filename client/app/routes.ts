import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  //Ajouter les routes qui n'utilisent pas le layout ici
  
  layout("/home/pierre/Epitech/ecommerce/W-WEB-502-LIL-2-1-ecommerce-brahim.boulahia/client/app/layout/MainLayout.tsx", [
    index("routes/_index.tsx"),
    //Ajouter les routes qui utilisent le layout ici
  ]),
] satisfies RouteConfig;