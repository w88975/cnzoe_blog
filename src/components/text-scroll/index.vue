<template>
    <div ref="containerRef" class="text-scroll-container">
        <div ref="contentRef" class="text-scroll-content" :style="animationStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    speed: {
        type: Number,
        default: 20
    }
});

const containerRef = ref(null);
const contentRef = ref(null);
const isOverflowing = ref(false);
const animationStyle = ref({});

const checkOverflow = () => {
    if (containerRef.value && contentRef.value) {
        isOverflowing.value = contentRef.value.offsetWidth > containerRef.value.offsetWidth;

        if (isOverflowing.value) {
            // const containerWidth = containerRef.value.offsetWidth;
            const contentWidth = contentRef.value.offsetWidth;
            const animationDuration = contentWidth / props.speed;
            animationStyle.value = {
                animation: `text-scroll ${animationDuration}s linear infinite`,
                animationDelay: '1s',
                // paddingLeft: `0px`, // 添加左侧填充
            };
        } else {
            animationStyle.value = {};
        }
    }
};

onMounted(checkOverflow);
watch(() => contentRef.value?.innerHTML, checkOverflow);
</script>

<style>
@keyframes text-scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>

<style scoped>
.text-scroll-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.text-scroll-content {
    display: inline-block;
}
</style>
