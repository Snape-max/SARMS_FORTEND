import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import BrowseView from '@/components/BrowseView.vue'
import UploadView from '@/components/UploadView.vue'
import Dashboard from '@/components/Dashboard.vue'
import ImageView from '@/components/ImageView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'browse',
        name: 'browse',
        component: BrowseView,
        meta: { title: '图片浏览' }

      },
      {
        path: 'browse/:id',
        name: 'image',
        component: ImageView,
        meta: { title: '图片详情' }
      },
      {
        path: 'upload',
        name: 'upload',
        component: UploadView,
        meta: { title: '图片上传' }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { title: '数据统计' }
      }

    ]
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
  if (to.name === 'home' || to.name === 'browse' || to.name === 'upload' || to.name === 'dashboard') {
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
