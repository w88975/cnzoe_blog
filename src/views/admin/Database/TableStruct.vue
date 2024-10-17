<template>
    <!-- 表结构 -->
    <div class="overflow-x-auto">
        <div class="flex flex-row justify-end">
            <NvaButton @click="saveChanges" class="mb-2">SAVE</NvaButton>
        </div>

        <table class="min-w-full border border-gray-300 text-sm">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border border-gray-300 text-xs">字段名</th>
                    <th class="border border-gray-300 text-xs">类型</th>
                    <th class="border border-gray-300 text-xs">是否可空</th>
                    <th class="border border-gray-300 text-xs">默认值</th>
                    <th class="border border-gray-300 text-xs">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(column, index) in tableStructure" :key="column._key" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-1 py-1">
                        <input v-model.lazy="column.name" class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                            @change="updateColumn(column)" />
                    </td>
                    <td class="border border-gray-300 px-1 py-1">
                        <select v-model="column.type" class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                            @change="updateColumn(column)">
                            <option v-for="type in sqliteTypes" :key="type" :value="type">{{ type }}
                            </option>
                        </select>
                    </td>
                    <td class="border border-gray-300 px-1 py-1">
                        <select v-model="column.notnull" class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                            @change="updateColumn(column)">
                            <option :value="1">是</option>
                            <option :value="0">否</option>
                        </select>
                    </td>
                    <td class="border border-gray-300 px-1 py-1">
                        <input v-model.lazy="column.dflt_value" placeholder="NULL"
                            class="border border-gray-300 w-full px-1 py-0.5 text-xs" @change="updateColumn(column)" />
                    </td>
                    <td class="border px-1 py-1 text-center">
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
    // loading
    emits('update:loading', false)
}

const updateColumn = (column) => {
    column._key = Date.now() + Math.random() // Update the key when the column changes
}

onMounted(() => { })

watch(() => props.tableName, (newVal) => {
    handleGetTableStructure(newVal)
}, { immediate: true })
</script>
