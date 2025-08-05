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
    index("routes/index/_index.tsx"),
    route("product/:slug", "routes/product.tsx"),
    route("cart", "routes/index/cart.tsx"),
    //Ajouter les routes qui utilisent le layout ici
  ]),

  // Layout Admin & route admin
  layout("layout/AdminLayout.tsx", [
    route("admin", "routes/admin/_index.tsx"),
    route("user_list", "routes/admin/user_list.tsx"),
  ]),
] satisfies RouteConfig;
