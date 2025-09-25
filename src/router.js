// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import { getActiveUser } from './services/authService'; // <-- Importar

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
  // Restaurar Scroll [cite: 74]
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

// Guardia global de rutas (Router) [cite: 60]
router.beforeEach((to, from, next) => {
  const user = getActiveUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isPublic = to.matched.some(record => record.meta.public);

  if (requiresAuth && !user) {
    // Redirigir a /login si la ruta requiere auth y el usuario no está autenticado [cite: 61]
    next('/login');
  } else if (user && isPublic) {
    // Evitar acceder al login si ya hay sesión (redirigir a /) [cite: 62]
    next('/');
  } else {
    next();
  }
});

export default router;