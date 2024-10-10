<template>
    <BoxView>
        <p class="text-xl font-bold mb-4">My Apps</p>
        <div class="grid grid-cols-2 gap-4">
            <RouterLink to="/admin/post-list">
                <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center">
                    <icon-file size="24" class="mr-2" />
                    Blog Manager
                </div>
            </RouterLink>

            <RouterLink to="/admin/image-list">
                <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center">
                    <icon-image size="24" class="mr-2" />
                    Image Manager
                </div>
            </RouterLink>

            <RouterLink to="/admin/tag-list">
                <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center">
                    <icon-tags size="24" class="mr-2" />
                    Tag Manager
                </div>
            </RouterLink>

            <RouterLink to="/admin/category-list">
                <div class="bg-gray-100 p-4 rounded-md cursor-pointer flex flex-row items-center">
                    <icon-subscribe size="24" class="mr-2" />
                    Category Manager
                </div>
            </RouterLink>
        </div>
    </BoxView>
</template>

<script setup lang="js">
import BoxView from '@/components/BoxView.vue'
import { IconFile, IconImage, IconTags, IconSubscribe } from '@arco-design/web-vue/es/icon';
</script>