<template>
    <div :class="['drawer-wrapper overflow-hidden', isOpen ? 'drawer-wrapper-bg-black' : '']">
        <div :class="isOpen ? 'drawer-wrapper-animate drawer-wrapper-on' : 'drawer-wrapper-animate'">
            <slot></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const bus = instance.appContext.config.globalProperties.$bus

const isOpen = ref(false)

bus.on('toggleDrawer', (state) => {
    isOpen.value = state
})

const toggleDrawer = () => {
    isOpen.value = !isOpen.value
}

defineExpose({
    toggleDrawer,
})
</script>

<style scoped>
.drawer-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    /* background-color: red; */
    transition: background-color 0.5s ease;
}

.drawer-wrapper-bg-black {
    background-color: #000;
}


.drawer-wrapper-animate {
    flex: 1;
    display: flex;
    transition-property: transform, border-radius;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
    transform-origin: center top;
    border-radius: 0;
    transform: scale(1) translate3d(0, 0, 0);
}

.drawer-wrapper-on {
    border-radius: 8px;
    overflow: hidden;
    transform: scale(0.9828042328042328) translate3d(0, 14px, 0);
}
</style>