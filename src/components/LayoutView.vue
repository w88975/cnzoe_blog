<template>
  <div class="md:max-w-5xl mx-auto flex-1 flex-col flex">
    <!-- header -->
    <div class="flex justify-between items-center p-4" :class="{ 'pt-10': isPWA }">
      <RouterLink to="/">
        <div class="flex items-center cursor-pointer active:opacity-50" v-longpress="toggleDebug">
          <IconLogo class="w-8 h-8" />
          <span class="text-2xl font-bold ml-2">KamiSama</span>
        </div>
      </RouterLink>

      <!-- 右侧导航, 移动设备兼容 -->
      <div class="md:hidden">
        <button class="p-2" @click="toggleDrawer">
          <IconMenu class="w-8 h-8" />
        </button>
      </div>
      <!-- 右侧导航, PC显示菜单 -->
      <div class="hidden md:block">
        <ul class="flex items-center">
          <li class="p-2 active:opacity-50" v-for="item in menuList" :key="item.name">
            <RouterLink :to="item.path">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- router view -->
    <div class="flex-1 p-4">
      <slot />
      <RouterView />
    </div>
    <FooterView />

    <!-- drawer menu panel -->
    <DrawerPanel v-model:visible="drawerVisible">
      <ul class="flex flex-col items-center">
        <li class="p-4" v-for="item in menuList" :key="item.name">
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </DrawerPanel>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import IconLogo from '@/components/icons/iconLogo.vue'
import IconMenu from '@/components/icons/iconMenu.vue'
import DrawerPanel from '@/components/drawer/DrawerPanel.vue'
import FooterView from '@/components/FooterView.vue'
import VConsole from 'vconsole';


import { $User } from '@/store/user'

const isPWA = ref(false);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIOS) {
  // Check if the app is running in standalone mode (PWA) on iOS
  isPWA.value = window.navigator.standalone === true;
} else {
  // For other platforms, use the previous method
  isPWA.value = window.matchMedia('(display-mode: standalone)').matches;
}

const drawerVisible = ref(false)
const menuList = ref([
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: $User.isAuthenticated ? 'Logout' : 'Login',
    path: $User.isAuthenticated ? '/login?logout=true' : '/login'
  },
])
const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value
}

const toggleDebug = () => {

  if (!window.vConsole) {
    localStorage.setItem('debug', '1')
    window.vConsole = new VConsole()
  } else {
    localStorage.removeItem('debug')
    window.vConsole.destroy()
  }
}
</script>

<style scoped></style>
