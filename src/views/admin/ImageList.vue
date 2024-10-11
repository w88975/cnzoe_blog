<template>
    <TitleLine title="File Upload"></TitleLine>
    <!-- 这里是拖拽上传 -->
    <div class="mb-4 w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        @dragover.prevent @dragleave.prevent @drop.prevent="handleFileDrop"
        :class="{ 'border-blue-500 bg-blue-50': isDragging }">
        <div class="flex flex-col items-center justify-center">
            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
            </p>
        </div>
        <input type="file" class="hidden" multiple @change="handleFileUpload" ref="fileInput" />
    </div>
    <!-- 待上传的文件列表 -->
    <div
        class="mb-4 w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
        <div class="flex flex-col items-center justify-center">
            <p class="mb-2 text-sm text-gray-500">待上传的文件列表</p>
            <div v-if="pendingFiles.length === 0" class="text-gray-400">没有待上传的文件</div>
            <ul v-else>
                <li v-for="(file, index) in pendingFiles" :key="index" class="flex justify-between items-center">
                    <span class="text-sm">{{ file.name }}</span>
                    <button @click="removeFile(index)" class="text-red-500">删除</button>
                </li>
            </ul>
            <button @click="uploadAllFiles" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">全部上传</button>
        </div>
    </div>

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
                <div @click="folderClick(file.full_path)" v-for="file in fileList" :key="file.id"
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
import { Message } from '@arco-design/web-vue'

const fileList = ref([])
const loading = ref(false)
const currentDir = ref('/')
const lastDirs = ref([])
const createFolderVisible = ref(false)
const createFolderName = ref('')
const isDragging = ref(false)
const fileInput = ref(null)
const pendingFiles = ref([]) // New state to track files ready for upload

onMounted(() => {
    getFileListData(currentDir.value)
})

// 返回上一级
const goBack = () => {
    if (lastDirs.value.length > 0) {
        currentDir.value = lastDirs.value.pop()
        getFileListData(currentDir.value)
    }
}

const folderClick = async (path) => {
    lastDirs.value.push(currentDir.value)
    await getFileListData(path)
}

const getFileListData = async (dir) => {
    loading.value = true
    const data = await getFileList({ dir })
    fileList.value = data.data.data
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

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    pendingFiles.value.push(...files) // Add files to pending list
    console.log('Files uploaded:', pendingFiles.value)
}

const handleFileDrop = (event) => {
    isDragging.value = false
    const files = Array.from(event.dataTransfer.files)
    pendingFiles.value.push(...files) // Add dropped files to pending list
    console.log('Files dropped:', pendingFiles.value)
}

const removeFile = (index) => {
    pendingFiles.value.splice(index, 1) // Remove file from pending list
}

const uploadAllFiles = async () => {
    // Implement the logic to upload all files in pendingFiles
    for (const file of pendingFiles.value) {
        // Upload each file (you need to implement the actual upload logic)
        console.log('Uploading file:', file)
    }
    // Clear the pending files after upload
    pendingFiles.value = []
}
</script>

<style scoped></style>