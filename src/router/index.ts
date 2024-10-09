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
                {
                    path: 'md-editor',
                    name: 'md-editor',
                    component: () => import('../views/MDEditor.vue')
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
