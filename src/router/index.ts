import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/components/LayoutView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LayoutView,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/HomeView.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('../views/AboutView.vue')
                },
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
                    // @ts-ignore
                    component: () => import('../views/admin/PostList.vue')
                },
                {
                    path: 'file-list',
                    name: 'file-list',
                    // @ts-ignore
                    component: () => import('../views/admin/ImageList.vue')
                },
                {
                    path: 'md-editor',
                    name: 'md-editor',
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

export default router
