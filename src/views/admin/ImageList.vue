<template>
    <TitleLine title="File List">
        <template #right>
            <!-- 显示创建按钮 -->
            <a-space>
                <a-button type="primary" @click="showCreateFolderModal">新建文件夹</a-button>
                <!-- <a-button type="primary">新建文件夹</a-button> -->
            </a-space>

        </template>
    </TitleLine>

    <a-spin class="w-full" :loading="loading">
        <BoxView>
            <template v-if="currentDir !== '/'">
                <a-button type="text" @click="goBack">返回上一级</a-button>
            </template>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto">
                <div @click="getFileListData(file.path)" v-for="file in fileList" :key="file.id"
                    class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50">
                    <icon-folder size="24" class="mb-2" />
                    <span class="text-sm text-center break-words">{{ file.path }}</span>
                </div>
            </div>
        </BoxView>
    </a-spin>

    <!-- 新建文件夹弹出框 -->
    <a-modal v-model:visible="createFolderVisible" title="新建文件夹" @ok="handleCreateFolder">
        <!-- 当前目录展示 -->
        <div class="text-sm text-gray-500 mb-4">当前目录：{{ currentDir }}</div>
        <a-input v-model="createFolderName" placeholder="请输入文件夹名称" />
    </a-modal>
</template>

<script setup lang="js">
import BoxView from '@/components/BoxView.vue'
import { IconFolder } from '@arco-design/web-vue/es/icon';
import { getFileList, createFolder } from '@/api/files'
import { ref, onMounted } from 'vue'
import { Modal, Message } from '@arco-design/web-vue'

const fileList = ref([])
const loading = ref(false)
const currentDir = ref('/')
const lastDir = ref('/')
const createFolderVisible = ref(false)
const createFolderName = ref('')

onMounted(() => {
    getFileListData(currentDir.value)
})

// 返回上一级
const goBack = () => {
    currentDir.value = lastDir.value
    getFileListData(currentDir.value)
}

const getFileListData = async (dir) => {
    loading.value = true
    const data = await getFileList({ dir })
    fileList.value = data.data.data
    lastDir.value = currentDir.value
    currentDir.value = dir
    loading.value = false
}

// 新建文件夹
const showCreateFolderModal = () => {
    createFolderVisible.value = true
}

const handleCreateFolder = async () => {
    // 校验 用正则  
    if (!/^[a-zA-Z0-9_-]+$/.test(createFolderName.value)) {
        Message.warning('文件夹名称只能包含字母、数字、下划线和横杠')
        return
    }
    loading.value = true
    const data = await createFolder({ dir: currentDir.value, folder: createFolderName.value })
    if (data.data.success) {
        Message.success('新建文件夹成功')
        await getFileListData(currentDir.value)
    } else {
        Message.error(data.data.message)
    }
    loading.value = false
}
</script>

<style scoped></style>