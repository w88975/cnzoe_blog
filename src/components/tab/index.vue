<template>
    <div class="flex flex-row items-center relative w-full bg-gray-100 p-2 rounded">
        <button v-for="(tab, index) in tabs" :key="tab" @click="selectTab(tab, index)" ref="tabButtons" :class="[
            'p-1 px-4 font-medium text-sm focus:outline-none z-10',

        ]">
            {{ tab }}
        </button>
        <div id="tab-bg" class="absolute z-0 h-8 rounded-lg bg-white shadow-md transition-all duration-300"
            :style="tabBgStyle"></div>
    </div>
    <div class="mt-4">
        <slot :name="selectedTab"></slot>
    </div>
</template>

<script setup lang="js">
import { ref, defineProps, defineEmits, onMounted, computed, watch } from 'vue'

const props = defineProps({
    tabs: {
        type: Array,
        default: () => [],
    },
    tabIndex: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits(['update:tabs', 'update:tabIndex'])

const selectedTab = ref(props.tabs[props.tabIndex])
const tabButtons = ref([])
const activeTabIndex = ref(props.tabIndex)
const hoveredTabIndex = ref(null)

const tabBgStyle = computed(() => {
    const index = hoveredTabIndex.value !== null ? hoveredTabIndex.value : activeTabIndex.value
    const button = tabButtons.value[index]
    if (!button) return {}
    return {
        width: `${button.offsetWidth}px`,
        left: `${button.offsetLeft}px`
    }
})

const selectTab = (tab, index) => {
    selectedTab.value = tab
    activeTabIndex.value = index
    emits('update:tabIndex', index)
}

watch(props.tabs, (newVal) => {
    selectedTab.value = newVal[activeTabIndex.value]
}, { immediate: true })

const updateTabBg = (index) => {
    hoveredTabIndex.value = index
}

const resetTabBg = () => {
    hoveredTabIndex.value = null
}

watch(() => props.tabIndex, (newVal) => {
    if (newVal !== activeTabIndex.value) {
        selectedTab.value = props.tabs[newVal]
        activeTabIndex.value = newVal
        console.log('Tab index changed:', props.tabs[newVal], newVal)
    }
}, { immediate: true })

// 添加一个新的 watch 来监听 activeTabIndex 的变化
watch(activeTabIndex, (newVal) => {
    emits('update:tabIndex', newVal)
})

onMounted(() => {
    // 初始化背景位置
    activeTabIndex.value = props.tabIndex
})
</script>
