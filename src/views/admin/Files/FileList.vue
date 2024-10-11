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
            <a-breadcrumb class="mb-4">
                <a-breadcrumb-item @click="navigateTo('/')">Root</a-breadcrumb-item>
                <template v-for="(segment, index) in pathSegments" :key="index">
                    <a-breadcrumb-item @click="navigateTo(segment.path)">
                        {{ segment.name }}
                    </a-breadcrumb-item>
                </template>
            </a-breadcrumb>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto relative"
                @dragenter.prevent="handleDragEnter" @dragover.prevent @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleFileDrop">
                <div @click="folderClick(file.type, file.full_path, file)" v-for="file in fileList" :key="file.id"
                    class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50">
                    <IconFile size="24" :type="file.type" :fileName="file.path" />
                    <span class="text-sm text-center truncate w-full block">{{ file.path }}</span>
                </div>
                <!-- 上传按钮 -->
                <div class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50"
                    @click="triggerFileUpload">
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

    <!-- Hidden file input -->
    <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" multiple>

    <!-- 新建文件夹弹出框 -->
    <a-modal v-model:visible="createFolderVisible" title="新建文件夹" @ok="handleCreateFolder">
        <!-- 当前目录展示 -->
        <div class="text-sm text-gray-500 mb-4">当前目录：{{ currentDir }}</div>
        <a-input v-model="createFolderName" placeholder="请输入文件夹名称" />
    </a-modal>

    <!-- 展示文件信息 -->
    <DrawerPanel v-model:visible="fileInfoVisible">
        <FileInfo :file="currentFile" />
    </DrawerPanel>

</template>

<script setup lang="js">
import BoxView from '@/components/BoxView.vue'
import { IconPlus } from '@arco-design/web-vue/es/icon';
import IconFile from '@/components/icons/iconFile.vue'
import { getFileList, createFolder, uploadFile } from '@/api/files'
import { ref, onMounted, watch, computed } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import DrawerPanel from '@/components/drawer/DrawerPanel.vue'
import FileInfo from './FileInfo.vue'

const router = useRouter()
const route = useRoute()

const fileList = ref([])
const loading = ref(false)
const currentDir = ref('/')
// 移除 lastDirs
const fileInfoVisible = ref(false)
const createFolderVisible = ref(false)
const createFolderName = ref('')
const isDragging = ref(false)
const fileInput = ref(null)
const uploadLoading = ref(false)
const dragCounter = ref(0)

const currentFile = ref(null)

const pathSegments = computed(() => {
    const segments = currentDir.value.split('/').filter(Boolean)
    return segments.map((segment, index) => ({
        name: segment,
        path: '/' + segments.slice(0, index + 1).join('/')
    }))
})

const navigateTo = (path) => {
    router.push({ query: { dir: encodeURIComponent(path) } })
}

onMounted(() => {
    const urlDir = route.query.dir
    if (urlDir) {
        currentDir.value = decodeURIComponent(urlDir)
    }
    getFileListData(currentDir.value)
})

watch(() => route.query.dir, (newDir) => {
    if (newDir) {
        currentDir.value = decodeURIComponent(newDir)
        getFileListData(currentDir.value)
    }
})


const folderClick = async (type, path, file) => {
    if (type === 0) {
        await router.push({ query: { dir: encodeURIComponent(path) } })
        // getFileListData will be triggered by the watch function
    } else {
        currentFile.value = file
        fileInfoVisible.value = true
    }
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

const triggerFileUpload = () => {
    fileInput.value.click()
}

const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files)
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
        // Reset the file input
        event.target.value = ''
    }
}
</script>

<style scoped></style>