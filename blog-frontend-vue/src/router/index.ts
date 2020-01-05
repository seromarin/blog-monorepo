import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/pages/Home.vue";

import * as VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.use(VueRouter);

const isAuth = (to: any, from: any, next: any) => {
  console.log({ to, from, next});
  if(!Vue.$cookies.isKey('token')) next("/register")
  else next();
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/auth/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/auth/Register.vue")
  },
  {
    path: "/create",
    name: "create",
    beforeEnter: isAuth,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/post/Create.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    beforeEnter: isAuth,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/post/Edit.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
