import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/percentage',
                    name: 'percentage',
                    component: () => import('@/views/PercentageCalculator.vue')
                },
                {
                    path: '/companies',
                    name: 'companies',
                    component: () => import('@/views/Company.vue')
                }
            ]
        }
    ]
});

export default router;
