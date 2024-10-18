<template>
    <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow mt-4">
        <div class="text-sm text-gray-700">
            总共 <span class="font-medium">{{ pagination.total }}</span> 条
        </div>
        <div class="flex items-center space-x-2">
            <button @click="handlePrevPage" :disabled="pagination.page === 1"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div class="flex items-center">
                <input v-model.number="pagination.page" @keyup.enter="handlePageChange"
                    class="w-12 px-2 py-1 text-sm border border-blue-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number" min="1" :max="pagination.totalPages">
                <span class="mx-2 text-sm text-blue-600">/ {{ pagination.totalPages }}</span>
            </div>
            <button @click="handleNextPage" :disabled="pagination.page === pagination.totalPages"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, defineProps, defineEmits, watch, toRefs } from 'vue'

const emit = defineEmits(['update:page'])

const props = defineProps({
    total: {
        type: Number,
        // required: true,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 20
    },
    hook: {
        type: Object,
        default: () => null
    }
})

const currentPage = ref(props.page)
const totalPages = ref(Math.ceil(props.total / props.pageSize))

const hasHook = ref(false)
const pagination = ref({
    refresh: null,
    page: props.page,
    total: 0,
    pageSize: 20,
    totalPages: Math.ceil(props.total / props.pageSize)
})

watch(() => props.hook, (newHook) => {
    console.log('newHook', newHook)
    if (newHook) {
        const { page, total, pageSize, refresh } = toRefs(newHook)
        hasHook.value = true
        pagination.value.page = page.value
        pagination.value.total = total.value
        pagination.value.pageSize = pageSize.value
        pagination.value.refresh = refresh.value
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.pageSize)
    } else {
        hasHook.value = false
        console.warn('props.hook is undefined in pagination component')
    }
}, { deep: true, immediate: true })

const handlePageChange = () => {
    if (pagination.value.page >= 1 && pagination.value.page <= pagination.value.totalPages) {
        if (hasHook.value) {
            pagination.value.refresh({
                page: pagination.value.page
            })
        } else {
            emit('update:page', pagination.value.page)
        }

    }
}

const handlePrevPage = () => {
    if (pagination.value.page > 1) {
        pagination.value.page--
        if (hasHook.value) {
            pagination.value.refresh({
                page: pagination.value.page
            })
        } else {
            emit('update:page', pagination.value.page)
        }

    }
}

const handleNextPage = () => {
    console.log('handleNextPage', pagination.value)
    if (pagination.value.page < pagination.value.totalPages) {
        pagination.value.page++
        if (hasHook.value) {
            pagination.value.refresh({
                page: pagination.value.page
            })
        } else {
            emit('update:page', pagination.value.page)
        }
    }
}

</script>