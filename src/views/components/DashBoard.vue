<template>
  <div class="relative">
    <BoxView>
      <p class="text-xl font-bold mb-4">My Apps</p>
      <div class="grid grid-cols-2 gap-4">
        <RouterLink to="/admin/post-list" class="h-full">
          <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full">
            <icon-file size="24" class="mr-2 flex-shrink-0" />
            <span class="flex-grow">Blog Manager</span>
          </div>
        </RouterLink>

        <RouterLink to="/admin/file-list" class="h-full">
          <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full">
            <icon-image size="24" class="mr-2 flex-shrink-0" />
            <span class="flex-grow">Image Manager</span>
          </div>
        </RouterLink>

        <RouterLink to="/admin/tag-list" class="h-full">
          <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full">
            <icon-tags size="24" class="mr-2 flex-shrink-0" />
            <span class="flex-grow">Tag Manager</span>
          </div>
        </RouterLink>

        <RouterLink to="/admin/category-list" class="h-full">
          <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full">
            <icon-subscribe size="24" class="mr-2 flex-shrink-0" />
            <span class="flex-grow">Category Manager</span>
          </div>
        </RouterLink>

        <RouterLink to="/admin/database" class="h-full">
          <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center h-full">
            <icon-storage size="24" class="mr-2 flex-shrink-0" />
            <span class="flex-grow">Database Manager</span>
          </div>
        </RouterLink>
      </div>
    </BoxView>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import BoxView from '@/components/BoxView.vue'
import { IconFile, IconImage, IconTags, IconSubscribe, IconStorage } from '@arco-design/web-vue/es/icon'
import { $User } from '@/store/user'


const DEFAULT_PASSWORD = '456111'
const password = ref('')
const isAuthenticated = ref(false)

const authenticate = () => {
  $User.authenticate(password.value)
}

onMounted(() => {
  const storedPassword = localStorage.getItem('dashboardPassword')
  if (storedPassword === DEFAULT_PASSWORD) {
    isAuthenticated.value = true
  }
})
</script>