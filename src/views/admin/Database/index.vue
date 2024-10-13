<template>
  <div>
    <h1 class="text-2xl font-bold">数据库</h1>
    <div>
      <NvaButton @click="handeGetTables" class="mb-4">获取表结构</NvaButton>
      <div class="mt-4">
        <select v-model="selectedTable" @change="handleGetTableStructure" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="" disabled selected>选择一个表</option>
          <option v-for="table in tables" :key="table.name" :value="table.name">
            {{ table.name }}
          </option>
        </select>
      </div>
      <div v-if="tableStructure" class="mt-4">
        <h2 class="text-xl font-semibold">表结构</h2>
        <table class="min-w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">字段名</th>
              <th class="border border-gray-300 px-4 py-2">类型</th>
              <th class="border border-gray-300 px-4 py-2">是否可空</th>
              <th class="border border-gray-300 px-4 py-2">默认值</th>
              <th class="border border-gray-300 px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(column, index) in tableStructure" :key="column._key" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">
                <input 
                  v-model.lazy="column.name" 
                  class="border border-gray-300 rounded-md w-full px-2 py-1" 
                  @change="updateColumn(column)"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <select 
                  v-model="column.type" 
                  class="border border-gray-300 rounded-md w-full px-2 py-1"
                  @change="updateColumn(column)"
                >
                  <option v-for="type in sqliteTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <select 
                  v-model="column.notnull" 
                  class="border border-gray-300 rounded-md w-full px-2 py-1"
                  @change="updateColumn(column)"
                >
                  <option :value="1">是</option>
                  <option :value="0">否</option>
                </select>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <input 
                  v-model.lazy="column.dflt_value" 
                  class="border border-gray-300 rounded-md w-full px-2 py-1" 
                  @change="updateColumn(column)"
                />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <button @click="addBefore(index)" class="text-blue-600 hover:text-blue-800 underline mr-2">往前新增</button>
                <button @click="addAfter(index)" class="text-blue-600 hover:text-blue-800 underline mr-2">往后新增</button>
                <button @click="removeColumn(index)" class="text-red-600 hover:text-red-800 underline">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <NvaButton @click="saveChanges" class="mt-4">保存修改</NvaButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { getTables, getTableStructure, modifyTableStructure } from '@/api/db'

const tables = ref([])
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

const handeGetTables = async () => {
  const res = await getTables()
  tables.value = res.data.data
}

const handleGetTableStructure = async () => {
  if (selectedTable.value) {
    const res = await getTableStructure(selectedTable.value)
    tableStructure.value = res.data.data.map(column => ({
      ...column,
      _key: Date.now() + Math.random() // Add a unique key to each column
    }))
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
