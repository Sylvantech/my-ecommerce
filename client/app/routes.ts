import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  layout("./layout/MainLayout.tsx", [
    index("routes/index/_index.tsx"),
    route("product/:slug", "routes/index/product.tsx"),
    route("cart", "routes/index/cart.tsx"),
  ]),

  layout("layout/AdminLayout.tsx", [
    route("admin", "routes/admin/_index.tsx"),
    route("admin/user", "routes/admin/user.tsx"),
    route("admin/categories", "routes/admin/categories.tsx"),
    route("admin/variants", "routes/admin/variants.tsx"),
    route("admin/cart", "routes/admin/cart.tsx"),
  ]),
] satisfies RouteConfig;
