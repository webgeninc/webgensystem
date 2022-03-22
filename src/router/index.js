import { createRouter, createWebHashHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Work from "../views/Work.vue"
import Login from "../views/Login.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // meta: {
    //   title: "Home",
    //   auth: false,
    // }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    // meta: {
    //   title: "Home",
    //   auth: false,
    // }
  },
  {
    path: "/Work",
    name: "Work",
    component: Work,
    meta: {
      auth: true,
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});


// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | WIMS`;
//   next();
// });

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)){
    if (user) {
      next();
      return
    }
    next({name: "Login"})
    return
  }
  next();
});

export default router;
