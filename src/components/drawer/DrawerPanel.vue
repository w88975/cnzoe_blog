<template>
    <a-drawer :header="false" :width="500" :height="'auto'" :placement="direction" :visible="isOpen" unmountOnClose
        @cancel="closeDrawer" :drawer-style="{ maxHeight: '100vh' }">
        <slot></slot>
    </a-drawer>
</template>

<script setup lang="js">
import { ref, watch, } from 'vue'

const direction = ref('bottom')
// 接收父组件的visible  
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const isOpen = ref(props.visible)

const emit = defineEmits(['update:visible'])

// 当父组件的visible变化时，更新isOpen
watch(() => props.visible, (newVal) => {
    // 如果设备是移动端，则显示在底部，否则显示在右侧
    if (window.innerWidth < 768) {
        direction.value = 'bottom'
    } else {
        direction.value = 'right'
    }
    isOpen.value = newVal
})

const closeDrawer = () => {
    isOpen.value = false
    emit('update:visible', false)
}
</script>
