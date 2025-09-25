import { createRouter, createWebHistory } from 'vue-router';
import { getActiveUser } from './services/authService'; 

const routes = [
  { path: '/', name: 'Home', component: () => import('./views/HomeView.vue') },
  { path: '/productos', name: 'Products', component: () => import('./views/ProductsView.vue'), meta: { requiresAuth: true } }, // Protegida
  { path: '/productos/:id', name: 'ProductDetail', component: () => import('./views/ProductDetailView.vue'), meta: { requiresAuth: true } }, // Protegida
  { path: '/clientes', name: 'Clients', component: () => import('./views/ClientsView.vue'), meta: { requiresAuth: true } }, // Protegida
  { path: '/login', name: 'Login', component: () => import('./views/LoginView.vue'), meta: { public: true } }, // Pública
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  const user = getActiveUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isPublic = to.matched.some(record => record.meta.public);

  if (requiresAuth && !user) {
    next('/login');
  } else if (user && isPublic) {
    next('/');
  } else {
    next();
  }
});

export default router;