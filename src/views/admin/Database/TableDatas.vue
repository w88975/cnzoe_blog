<template>
    <!-- 表数据 -->
    <div class="w-full">
        <div class="flex flex-row justify-between mb-2">
            <div>
                <span class="mr-2">每页显示:</span>
                <select v-model="pageSize" @change="handlePageSizeChange"
                    class="border border-gray-300 px-2 py-1 text-sm">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <NvaButton @click="saveChanges" :disabled="!hasChanges">保存更改</NvaButton>
        </div>

        <div class="flex">
            <div class="inline-block flex-1 min-w-full align-middle table-view">
                <table class="min-w-full border border-gray-300 text-sm">
                    <thead>
                        <tr class="bg-gray-100">
                            <th v-for="column in columns" :key="column"
                                class="border border-gray-300 text-xs px-2 py-1">
                                {{ column }}
                                <div class="resize-handle" @mousedown="startResize($event, column)"></div>
                            </th>
                            <th class="border border-gray-300 text-xs px-2 py-1">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in list" :key="row._id" class="hover:bg-gray-50">
                            <td v-for="column in columns" :key="`${row._id}-${column}`"
                                class="border border-gray-300 px-1 py-1">
                                <template v-if="column === '_id'">
                                    {{ row[column] }}
                                </template>
                                <template v-else>
                                    <input v-model="row[column]"
                                        class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                        @change="updateRow(row)" />
                                </template>
                            </td>
                            <td class="border px-1 py-1 text-center">
                                <button @click="removeRow(rowIndex)"
                                    class="text-red-600 hover:text-red-800 text-xs mr-2">删除</button>
                                <button @click="saveRow(row)" class="text-blue-600 hover:text-blue-800 text-xs"
                                    :disabled="!row._changed">保存</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <div class="flex justify-between items-center mt-4">
            <span class="text-sm">总记录数: {{ total }}</span>
            <div class="flex items-center">
                <button @click="handlePrevPage" :disabled="currentPage === 1"
                    class="px-2 py-1 mr-2 text-sm border rounded bg-white text-blue-500 disabled:opacity-50">
                    上一页
                </button>
                <input v-model.number="inputPage" @keyup.enter="handleInputPage"
                    class="w-16 px-2 py-1 text-sm border rounded text-center" type="number" min="1" :max="totalPages">
                <span class="mx-2 text-sm">/ {{ totalPages }}</span>
                <button @click="handleNextPage" :disabled="currentPage === totalPages"
                    class="px-2 py-1 ml-2 text-sm border rounded bg-white text-blue-500 disabled:opacity-50">
                    下一页
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, computed, watch, defineEmits } from 'vue'
import { getTableData, updateTableData } from '@/api/db'
import useList from '@/hooks/useList'

const props = defineProps({
    tableName: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:loading'])

const columns = ref([])
const hasChanges = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)

const { list, loading, refresh, total } = useList(getTableData, { tableName: props.tableName })

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const inputPage = ref(1)

const handlePrevPage = () => {
    if (currentPage.value > 1) {
        handlePageChange(currentPage.value - 1)
    }
}

const handleNextPage = () => {
    if (currentPage.value < totalPages.value) {
        handlePageChange(currentPage.value + 1)
    }
}

const handleInputPage = () => {
    const page = Math.min(Math.max(1, inputPage.value), totalPages.value)
    handlePageChange(page)
}

const handlePageChange = (page) => {
    currentPage.value = page
    inputPage.value = page
    refresh({ page, pageSize: pageSize.value, tableName: props.tableName })
}

const handlePageSizeChange = () => {
    currentPage.value = 1
    refresh({ page: 1, pageSize: pageSize.value, tableName: props.tableName })
}

const updateRow = (row) => {
    row._changed = true
    hasChanges.value = true
}

const removeRow = (index) => {
    list.value.splice(index, 1)
    hasChanges.value = true
}

const saveRow = async (row) => {
    loading.value = true
    try {
        await updateTableData(props.tableName, {
            data: [row]
        })
        row._changed = false
        hasChanges.value = list.value.some(r => r._changed)
    } catch (error) {
        console.error('Error saving row:', error)
    } finally {
        loading.value = false
    }
}

const startResize = (event, column) => {
    const th = event.target.closest('th')
    const startX = event.pageX
    const startWidth = th.offsetWidth

    const handleMouseMove = (moveEvent) => {
        const width = startWidth + moveEvent.pageX - startX
        th.style.width = `${width}px`
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const saveChanges = async () => {
    loading.value = true
    try {
        console.log(list.value)
        await updateTableData(props.tableName, {
            data: list.value
        })
        refresh()
        hasChanges.value = false
    } catch (error) {
        console.error('Error saving changes:', error)
    } finally {
        loading.value = false
    }
}

watch(() => props.tableName, (newTableName) => {
    console.log('newTableName', { tableName: newTableName, page: 1, pageSize: pageSize.value })
    refresh({ tableName: newTableName, page: 1, pageSize: pageSize.value })
})

watch(list, (newList) => {
    if (newList.length > 0) {
        columns.value = Object.keys(newList[0]).filter(key => key !== '_id')
    }
}, { immediate: true })

watch(() => currentPage.value, (newPage) => {
    inputPage.value = newPage
})
// watch useList的loading,
watch(loading, (newLoading) => {
    emit('update:loading', newLoading)
})
</script>

<style scoped>
.resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: col-resize;
    /* background-color: #ddd; */
}

th {
    position: relative;
}

.overflow-x-auto {
    overflow-x: auto;
    max-width: 100%;
}

.table-view {
    overflow-x: auto;
    flex: 1;
    max-width: 100%;
    /* max-width: max-content; */
}

table {
    width: 200vh;
    table-layout: fixed;
}

th,
td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
