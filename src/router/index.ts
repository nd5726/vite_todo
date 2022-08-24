import { createRouter, createWebHashHistory } from "vue-router";
import LoginService from "@/services/loginService";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/loginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/registerView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/mainView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/aboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/** 路由守衛 */
router.beforeEach(async (to, from, next) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const notDirectArray = ["login", "register"];

  // 如果有token
  if (token !== null && token !== "") {
    try {
      await LoginService.ckeck();

      //  token驗證成功，如果進login跟register會直接跳轉到main
      if (notDirectArray.includes(String(to.name))) {
        next({ name: "main" });
      } else {
        next();
      }
    } catch {
      //  清除cookie內容，重新登入
      document.cookie = "token=; nickname=;";
      return next({ name: "login" });
    }
  } else {
    if (notDirectArray.includes(String(to.name))) {
      next();
    } else {
      alert("請先登入");
      return next({ name: "login" });
    }
  }
});

export default router;
