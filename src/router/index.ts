import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore }                                   from "../store/userInfo";


const routes: RouteRecordRaw[] = [
	{
		path:      "/",
		name:      "Home",
		component: () => import("../views/Home.vue"),
		meta:      { requiresAuth: true },
	},
	{
		path:      "/login",
		name:      "Login",
		component: () => import("../views/Login.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

function Verify() {
	const userStore = useUserStore();
	
	return !!userStore.id.sub;
}

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!Verify()) {
			next({
				name: "Login",
			});
		}
	}
	next();
});


export default router;
