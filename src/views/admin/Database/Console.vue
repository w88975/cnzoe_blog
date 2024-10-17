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
                <template v-if="selectedTable">
                    <NavTab :tabs="['表结构', '数据']" v-model:tabIndex="tabIndex"></NavTab>
                    <!-- 表结构 -->
                    <TableStruct v-if="tabIndex == 0" :tableName="selectedTable" v-model:loading="rightLoading" />
                    <!-- 表数据 -->
                    <TableDatas v-if="tabIndex == 1" :tableName="selectedTable" v-model:loading="rightLoading" />
                </template>
                <a-empty class="w-full h-full flex items-center justify-center" v-else />
            </a-spin>

        </BoxView>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { getTables, } from '@/api/db'
import { IconStorage, IconPlus } from '@arco-design/web-vue/es/icon';
import TableStruct from './TableStruct.vue'
import TableDatas from './TableDatas.vue'

const tables = ref([])
const selectedTable = ref(null)
const leftLoading = ref(true)
const rightLoading = ref(false)
const tabIndex = ref(0)
const handeGetTables = async () => {
    leftLoading.value = true
    const res = await getTables()
    tables.value = res.data.data
    leftLoading.value = false
}

const handleGetTableStructure = async (tableName) => {
    selectedTable.value = tableName
}

onMounted(() => {
    handeGetTables()
})
</script>

<style scoped>
.box-wrapper {
    min-height: 80vh;
}

.boxRight {
    flex: 1;
}
</style>