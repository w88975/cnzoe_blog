import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/components/LayoutView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LayoutView,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('../views/AboutView.vue')
                }
            ]
        },
    ]
})

export default router
