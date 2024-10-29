import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LayoutView from '@/components/LayoutView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFound.vue'
import { $User } from '@/store/index'
import mitt from 'mitt'

const bus = mitt()

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
                    component: () => import('../views/sns/index.vue')
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
                },
                {
                    path: '/app/91porn',
                    name: '91porn',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/porn/91Porn.vue')
                },
                {
                    path: '/app/91porn-detail',
                    name: '91porn-detail',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/porn/91PornDetail.vue')
                },
                {
                    path: '/app/sns',
                    name: 'sns',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/sns/index.vue')
                },
                {
                    path: '/app/favorite',
                    name: 'favorite',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/porn/favorite.vue')
                }
            ]
        },
        {
            path: '/app',
            name: 'app',
            component: LayoutView,
            children: [
                {
                    path: 'lottie',
                    name: 'lottie',
                    meta: {
                        requiresAuth: false
                    },
                    component: () => import('../views/lottie/compress.vue')
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
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/HomeView.vue')
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
                },
                {
                    path: 'database',
                    name: 'database',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('../views/admin/Database/Console.vue')
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

// 切换路由 发送全局通知
router.afterEach(() => {
    bus.emit('route-change', router.currentRoute.value)
})

export default router
