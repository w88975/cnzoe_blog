<template>
    <transition name="fade">
        <div v-if="isOpen" class="w-full h-full fixed top-0 left-0 z-50">
            <div class="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50" @click="toggleDrawer"></div>
            <div class="w-full panel p-10 bottom-0 bg-white absolute rounded-t-lg">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const bus = instance?.appContext.config.globalProperties.$bus

const isOpen = ref(false)

const toggleDrawer = () => {
    isOpen.value = !isOpen.value
    // 发送全局事件
    bus.emit('toggleDrawer', isOpen.value)
}
// 暴露toggleDrawer
defineExpose({
    toggleDrawer
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active .panel {
    transition: transform 0.5s ease;
    transform: translateY(0);
}

.fade-enter-from .panel {
    transform: translateY(100%);
}

.fade-leave-active .panel {
    transition: transform 0.5s ease;
    transform: translateY(100%);
}

.fade-leave-from .panel {
    transform: translateY(0);
}
</style>
