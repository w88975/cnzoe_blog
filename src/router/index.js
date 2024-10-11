import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LayoutView from '@/components/LayoutView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFound.vue'
import { $User } from '@/store/index'

const router = createRouter({
    // history: import.meta.env.MODE === 'pwa' ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LayoutView,
            children: [
                {
                    path: '/',
                    name: 'home',
                    // component: () => import('../views/HomeView.vue')
                    component: () => import('../views/admin/DashBoard.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('../views/AboutView.vue')
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/Login.vue')
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: LayoutView,

            children: [
                {
                    path: '',
                    name: 'dashboard',
                    // @ts-ignore
                    component: () => import('../views/admin/DashBoard.vue')
                },
                {
                    path: 'post-list',
                    name: 'post-list',
                    meta: {
                        requiresAuth: true
                    },
                    // @ts-ignore
                    component: () => import('../views/admin/PostList.vue')
                },
                {
                    path: 'file-list',
                    name: 'file-list',
                    meta: {
                        requiresAuth: true
                    },
                    // @ts-ignore
                    component: () => import('../views/admin/Files/FileList.vue')
                },
                {
                    path: 'md-editor',
                    name: 'md-editor',
                    meta: {
                        requiresAuth: true
                    },
                    // @ts-ignore
                    component: () => import('../views/admin/MDEditor.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ]
})

// Add this new code block after the router creation
router.beforeEach((to, from, next) => {
    const isAuthenticated = $User.isAuthenticated // You need to implement this function
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
