import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'FrontView',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'createOrder',
        name: 'createOrder',
        component: () => import('../views/CreateOrderView.vue')
      }
      // {
      //   path: 'productsList',
      //   name: 'ProductsList',
      //   component: () => import('../views/FrontProductsView.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/dashboard/AdminHomeView.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/dashboard/OrderView.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/dashboard/ProductsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
