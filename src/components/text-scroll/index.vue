<template>
    <div ref="containerRef" class="text-scroll-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div ref="contentRef" class="text-scroll-content" :style="computedAnimationStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';

const props = defineProps({
    speed: {
        type: Number,
        default: 20
    },
    start: {
        type: String,
        default: 'auto',
        validator: (value) => ['auto', 'hover'].includes(value)
    }
});

const containerRef = ref(null);
const contentRef = ref(null);
const isOverflowing = ref(false);
const animationStyle = ref({});
const isHovered = ref(false);

const checkOverflow = () => {
    if (containerRef.value && contentRef.value) {
        isOverflowing.value = contentRef.value.offsetWidth > containerRef.value.offsetWidth;

        if (isOverflowing.value) {
            const contentWidth = contentRef.value.offsetWidth;
            const animationDuration = contentWidth / props.speed;
            animationStyle.value = {
                animation: `text-scroll ${animationDuration}s linear infinite`,
                animationDelay: '1s',
            };
        } else {
            animationStyle.value = {};
        }
    }
};

const computedAnimationStyle = computed(() => {
    if (props.start === 'hover' && !isHovered.value) {
        return {};
    }
    if (props.start === 'hover') {
        return {
            ...animationStyle.value,
            animationDelay: '0s'
        };
    }
    return animationStyle.value;
});

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

onMounted(() => {
    nextTick(() => {
        setTimeout(checkOverflow, 1000);
    })
});

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
