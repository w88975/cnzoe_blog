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

    <!-- 文件夹,文件列表 -->
    <a-spin class="w-full" :loading="loading || uploadLoading">
        <BoxView>
            <template v-if="currentDir !== '/'">
                <a-button type="text" @click="goBack">返回上一级</a-button>
            </template>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto relative"
                @dragenter.prevent="handleDragEnter" @dragover.prevent @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleFileDrop">
                <div @click="folderClick(file.full_path)" v-for="file in fileList" :key="file.id"
                    class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50">
                    <!-- <icon-folder size="24" class="mb-2" /> -->
                    <IconFile size="24" :type="file.type" :fileName="file.path" />
                    <span class="text-sm text-center truncate w-full block">{{ file.path }}</span>
                </div>
                <!-- 上传按钮 -->
                <div class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50">
                    <icon-plus size="24" class="mb-2" />
                    <span class="text-sm text-center break-words">上传</span>
                </div>

                <!-- Drag and drop overlay -->
                <div v-if="isDragging"
                    class="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                    <p class="text-white text-xl font-bold">Drop files here to upload</p>
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
import { IconFolder, IconPlus } from '@arco-design/web-vue/es/icon';
import IconFile from '@/components/icons/iconFile.vue'
import { getFileList, createFolder, uploadFile } from '@/api/files'
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
const uploadLoading = ref(false)
const dragCounter = ref(0)

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

const handleDragEnter = (event) => {
    event.preventDefault()
    dragCounter.value++
    if (dragCounter.value === 1) {
        isDragging.value = true
    }
}

const handleDragLeave = (event) => {
    event.preventDefault()
    dragCounter.value--
    if (dragCounter.value === 0) {
        isDragging.value = false
    }
}

const handleFileDrop = async (event) => {
    event.preventDefault()
    isDragging.value = false
    dragCounter.value = 0
    const files = Array.from(event.dataTransfer.files)
    uploadLoading.value = true

    try {
        for (const file of files) {
            await uploadFile({ file: file, dir: currentDir.value })
        }
        Message.success('Files uploaded successfully')
        await getFileListData(currentDir.value)
    } catch (error) {
        Message.error('Error uploading files')
        console.error('Upload error:', error)
    } finally {
        uploadLoading.value = false
    }
}

const removeFile = (index) => {
    pendingFiles.value.splice(index, 1) // Remove file from pending list
}

const uploadAllFiles = async () => {
    // Implement the logic to upload all files in pendingFiles
    for (const file of pendingFiles.value) {
        // Upload each file (you need to implement the actual upload logic)
        console.log('Uploading file:', file)
        // 按顺序上传文件
        await uploadFile({ file: file, dir: currentDir.value })

    }
    // Clear the pending files after upload
    pendingFiles.value = []
}
</script>

<style scoped>
.grid {
    min-height: 200px;
    /* 确保拖拽区域有一定的高度 */
}
</style>