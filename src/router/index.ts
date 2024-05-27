import { createRouter, createWebHashHistory } from "vue-router";
import CatalogPage from "@/pages/CatalogPage.vue";
import CartPage from "@/pages/CartPage.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "catalog",
      component: CatalogPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
  ],
});

export default router;
