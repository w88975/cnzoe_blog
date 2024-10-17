<template>
    <div class="flex flex-col lg:flex-row box-wrapper">


        <BoxView class="w-full lg:w-1/5 lg:mr-4">
            <a-spin :loading="leftLoading" class="w-full h-full">
                <div @click="handleGetTableStructure(table.name)" :class="[
                    'flex flex-row items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer active:bg-gray-200',
                    selectedTable == table.name && 'bg-gray-200']" v-for="(table, idx) in tables" :key="idx">
                    <icon-storage size="24" class="mr-2 flex-shrink-0" />
                    <span class="flex-grow truncate">{{ table.name }}</span>
                </div>
                <!-- 新建table -->
                <div
                    class="flex flex-row items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer active:bg-gray-200">
                    <icon-plus size="24" class="mr-2 flex-shrink-0" />
                    <span class="flex-grow truncate">新建表</span>
                </div>
            </a-spin>
        </BoxView>


        <BoxView class="boxRight">
            <a-spin :loading="rightLoading" class="w-full h-full">
                <template v-if="selectedTable && tableStructure">
                    <div class="flex flex-row items-center space-x-4 mb-4 border-b pb-2">
                        <span
                            class="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-200">表结构</span>
                        <span
                            class="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-200">表数据</span>
                    </div>
                    <div class="overflow-x-auto">
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
                                <tr v-for="(column, index) in tableStructure" :key="column._key"
                                    class="hover:bg-gray-50">
                                    <td class="border border-gray-300 px-1 py-1">
                                        <input v-model.lazy="column.name"
                                            class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                            @change="updateColumn(column)" />
                                    </td>
                                    <td class="border border-gray-300 px-1 py-1">
                                        <select v-model="column.type"
                                            class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                            @change="updateColumn(column)">
                                            <option v-for="type in sqliteTypes" :key="type" :value="type">{{ type }}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="border border-gray-300 px-1 py-1">
                                        <select v-model="column.notnull"
                                            class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                            @change="updateColumn(column)">
                                            <option :value="1">是</option>
                                            <option :value="0">否</option>
                                        </select>
                                    </td>
                                    <td class="border border-gray-300 px-1 py-1">
                                        <input v-model.lazy="column.dflt_value" placeholder="NULL"
                                            class="border border-gray-300 w-full px-1 py-0.5 text-xs"
                                            @change="updateColumn(column)" />
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
                <a-empty class="w-full h-full flex items-center justify-center" v-else />
            </a-spin>

        </BoxView>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { getTables, getTableStructure, modifyTableStructure } from '@/api/db'
import { IconStorage, IconDelete, IconPlus } from '@arco-design/web-vue/es/icon';
import BoxView from '@/components/BoxView.vue';

const tables = ref([])
const selectedTable = ref(null)
const tableStructure = ref(null)
const leftLoading = ref(true)
const rightLoading = ref(false)

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

const handeGetTables = async () => {
    leftLoading.value = true
    const res = await getTables()
    tables.value = res.data.data
    leftLoading.value = false
}

const handleGetTableStructure = async (tableName) => {
    if (tableName) {
        selectedTable.value = tableName
        rightLoading.value = true
        const res = await getTableStructure(tableName)
        tableStructure.value = res.data.data.map(column => ({
            ...column,
            _key: Date.now() + Math.random() // Add a unique key to each column
        }))
        rightLoading.value = false
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

const saveChanges = () => {
    console.log('修改后的表结构:', tableStructure.value)
    modifyTableStructure(selectedTable.value, tableStructure.value)
}

const updateColumn = (column) => {
    column._key = Date.now() + Math.random() // Update the key when the column changes
}

onMounted(() => {
    handeGetTables()
})
</script>

<style scoped>
.boxLeft {
    /* width: 20%; */
}

.box-wrapper {
    min-height: 80vh;
}

.boxRight {
    flex: 1;
}
</style>