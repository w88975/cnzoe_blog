<template>
    <div class="md:max-w-5xl mx-auto flex-1 flex-col flex">
        <!-- header -->
        <div class="flex justify-between items-center p-4">
            <div class="flex items-center">
                <IconLogo class="w-8 h-8" />
                <span class="text-2xl font-bold ml-2">My APP Name</span>
            </div>
            <!-- 右侧导航, 移动设备兼容 -->
            <div class="md:hidden">
                <button class="p-2" @click="toggleDrawer">
                    <IconMenu class="w-8 h-8" />
                </button>
            </div>
            <!-- 右侧导航, PC显示菜单 -->
            <div class="hidden md:block">
                <ul class="flex items-center">
                    <li class="p-2" v-for="item in menuList" :key="item.name">
                        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <!-- router view -->
        <div class="flex-1 p-4">
            <RouterView />
            <slot />
        </div>
        <FooterView />

        <!-- drawer menu panel -->
        <DrawerPanel ref="drawerPanel">
            <ul class="flex flex-col items-center">
                <li class="p-4" v-for="item in menuList" :key="item.name">
                    <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                </li>
            </ul>
        </DrawerPanel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import DrawerPanel from '@/components/drawer/DrawerPanel.vue'
import FooterView from '@/components/FooterView.vue'

const drawerPanel = ref(null)
const menuList = ref([
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Passwords',
        path: '/passwords',
    },
    {
        name: 'About',
        path: '/about',
    },
])
const toggleDrawer = () => {
    drawerPanel.value.toggleDrawer()
}
</script>

<style scoped></style>
