<template>
    <!-- 表结构 -->
    <div class="overflow-x-auto">
        <div class="flex flex-row justify-end">
            <NvaButton @click="saveChanges" class="mb-2">SAVE</NvaButton>
        </div>

        <div class="table-wrapper" id="table-wrapper">
            <div id="table-container" class="table-container" ref="tableContainer">
                <table class="w-full border border-gray-300 text-sm">
                    <thead>
                        <tr class="bg-gray-100">
                            <th
                                class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                                字段名</th>
                            <th
                                class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                                类型</th>
                            <th
                                class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                                不许为空</th>
                            <th
                                class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                                默认值</th>
                            <th
                                class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                                操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(column, index) in tableStructure" :key="column._key" class="hover:bg-gray-50">
                            <td class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate">
                                <input v-model.lazy="column.name"
                                    class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                    @change="updateColumn(column)" />
                            </td>
                            <td class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate">
                                <select v-model="column.type" class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                    @change="updateColumn(column)">
                                    <option v-for="type in sqliteTypes" :key="type" :value="type">{{ type }}
                                    </option>
                                </select>
                            </td>
                            <td class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate">
                                <select v-model="column.notnull"
                                    class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                    @change="updateColumn(column)">
                                    <option :value="1">是</option>
                                    <option :value="0">否</option>
                                </select>
                            </td>
                            <td class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate">
                                <input v-model.lazy="column.dflt_value" placeholder="NULL"
                                    class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                    @change="updateColumn(column)" />
                            </td>
                            <td class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate">
                                <div class="hidden lg:block">
                                    <button @click="addBefore(index)"
                                        class="text-blue-600 hover:text-blue-800 mr-1 text-xs">前增</button>
                                    <button @click="addAfter(index)"
                                        class="text-blue-600 hover:text-blue-800 mr-1 text-xs">后增</button>
                                    <button @click="removeColumn(index)"
                                        class="text-red-600 hover:text-red-800 text-xs">删除</button>
                                </div>
                                <div class="lg:hidden">
                                    <a-button size="mini" type="text">操作</a-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script setup lang="js">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'
import { getTableStructure, modifyTableStructure } from '@/api/db'

const props = defineProps({
    tableName: {
        type: String,
        default: ''
    },
    // v-modal loading
    loading: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:tableName', 'update:loading'])

const selectedTable = ref(null)
const tableStructure = ref(null)

// SQLite 支持的类型
const sqliteTypes = [
    'INTEGER',
    'REAL',
    'TEXT',
    'BLOB',
    'NULL',
    'VARCHAR',
    'CHAR',
    'BOOLEAN',
    'DATE',
    'DATETIME'
]

const handleGetTableStructure = async (tableName) => {
    if (tableName) {
        selectedTable.value = tableName
        // loading
        emits('update:loading', true)
        const res = await getTableStructure(tableName)
        tableStructure.value = res.data.data.map(column => ({
            ...column,
            _key: Date.now() + Math.random() // Add a unique key to each column
        }))
        // loading
        emits('update:loading', false)
    }
}

const addBefore = (index) => {
    const newColumn = { name: '', type: sqliteTypes[0], notnull: 0, dflt_value: '', _key: Date.now() + Math.random() }
    tableStructure.value.splice(index, 0, newColumn)
}

const addAfter = (index) => {
    const newColumn = { name: '', type: sqliteTypes[0], notnull: 0, dflt_value: '', _key: Date.now() + Math.random() }
    tableStructure.value.splice(index + 1, 0, newColumn)
}

const removeColumn = (index) => {
    tableStructure.value.splice(index, 1)
}

const saveChanges = async () => {
    console.log('修改后的表结构:', tableStructure.value)
    // loading
    emits('update:loading', true)
    const res = await modifyTableStructure(selectedTable.value, tableStructure.value)
    await handleGetTableStructure(selectedTable.value)
    NvaMessage.success('保存成功')
    // loading
    emits('update:loading', false)
}

const updateColumn = (column) => {
    column._key = Date.now() + Math.random() // Update the key when the column changes
}

const updateTableHeight = () => {
    const tableContainer = document.querySelector('#table-container')
    const tableWrapper = document.querySelector('#table-wrapper')
    console.log('xxxxxxxxxxxxxxxx', tableContainer.clientHeight)
    tableWrapper.style.height = tableContainer.clientHeight + 'px'
}

const tableContainer = ref(null)

onMounted(() => {
    // 监听tableContainer内容变化
    const observer = new MutationObserver((mutations) => {
        console.log('监听tableContainer内容变化')
        updateTableHeight()
    })

    observer.observe(tableContainer.value, {
        childList: true,
        subtree: true,
        characterData: true
    })
})

watch(() => props.tableName, (newVal) => {
    handleGetTableStructure(newVal)
}, { immediate: true })
</script>

<style scoped>
.table-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
}

.table-container {
    width: 100%;
    position: absolute;
    overflow: auto;
}
</style>
