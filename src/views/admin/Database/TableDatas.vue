<template>
    <!-- 表数据 -->
    <div class="w-full">
        <div class="mb-4">
            <textarea v-model="sqlStr" :default-value="sqlStr" placeholder="输入 SQL 查询..."
                class="w-full h-24 p-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            <div class="mt-2 flex justify-end">
                <NvaButton @click="runSqlQuery">运行</NvaButton>
            </div>
        </div>
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
            <NvaButton @click="saveChanges" :disabled="!changedList.length">保存更改</NvaButton>
        </div>
        <!-- 表格 -->
        <Datas :columns="columns" :list="list" @update:list="handleListUpdate"></Datas>
        <!-- 分页器 -->
        <NvaPagination :hook="ListHandle" />
    </div>
</template>

<script setup lang="js">
import { ref, watch, defineEmits } from 'vue'
import { getTableData, updateTableData } from '@/api/db'
import useList from '@/hooks/useList'
import Datas from './components/Datas.vue'

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
const pageSize = ref(20)
const sqlStr = ref('')
const changedList = ref([])

const ListHandle = useList(getTableData, { tableName: props.tableName })
const { list, loading, refresh, result, page } = ListHandle

watch(result, (newResult) => {
    sqlStr.value = newResult.sql
})

const inputPage = ref(1)


const handlePageSizeChange = () => {
    refresh({ page: 1, pageSize: pageSize.value, tableName: props.tableName }, true)
}

const saveChanges = async () => {
    loading.value = true
    try {
        console.log(list.value)
        await updateTableData(props.tableName, {
            data: changedList.value
        })
        refresh()
        changedList.value = []
        hasChanges.value = false
        NvaMessage.success('保存成功')
    } catch (error) {
        console.error('Error saving changes:', error)
        NvaMessage.error('保存失败')
    } finally {
        loading.value = false
    }
}

const handleListUpdate = (newList) => {
    changedList.value = newList
    console.log('newList', newList)
}

// 运行SQL
const runSqlQuery = async () => {
    console.log('sqlStr', sqlStr.value)
    await refresh({ page: 1, pageSize: pageSize.value, tableName: props.tableName, sql: sqlStr.value }, true)
    NvaMessage.success('查询成功')
}

watch(() => props.tableName, (newTableName) => {
    console.log('newTableName', { tableName: newTableName, page: 1, pageSize: pageSize.value })
    refresh({ tableName: newTableName, page: 1, pageSize: pageSize.value }, true)
})

watch(list, (newList) => {
    if (newList.length > 0) {
        columns.value = Object.keys(newList[0]).filter(key => key !== '_id')
        console.log('columns', columns.value)
    }
}, { immediate: true })

watch(() => page, (newPage) => {
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
