import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'home') {
    if (!store.state.isAuthenticated) {
      // 如果未登录
      next({ name: 'auth' });
    } else {
      next();
    } 
  } else if (to.name === 'auth') {
    console.log('isAuthenticated:', store.state.isAuthenticated);
    if (store.state.isAuthenticated) {
      // 如果已登录
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
