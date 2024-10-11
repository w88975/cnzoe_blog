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
        <div v-if="isDragging" class="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
          <p class="text-white text-xl font-bold">Drop files here to upload</p>
        </div>
      </div>
    </BoxView>
  </a-spin>

  <!-- 待上传文件列表, 及上传进度, 只可展示, 不可操作 -->
  <BoxView class="mt-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">待上传文件列表</h3>
    <div v-if="uploadingFiles.length === 0" class="text-center text-gray-500 py-4">
      暂无待上传文件
    </div>
    <div v-else v-for="file in uploadingFiles" :key="file.name" class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-600">{{ file.name }}</span>
        <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="{
          'bg-blue-100 text-blue-800': file.status === 'uploading',
          'bg-green-100 text-green-800': file.status === 'completed',
          'bg-red-100 text-red-800': file.status === 'error'
        }">
          {{ file.status }}
          <span class="text-xs text-gray-500">{{ file.speed }}</span>
        </span>
        
      </div>
      <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div class="bg-blue-500 h-full transition-all duration-300 ease-in-out" :style="{ width: `${file.progress}%` }">
        </div>
      </div>
      <div class="text-xs text-gray-500 mt-1 text-right">
        {{ file.progress }}%
      </div>
    </div>
  </BoxView>

  <!-- Hidden file input -->
  <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none;" multiple>

  <!-- 新建文件夹弹出框 -->
  <a-modal v-model:visible="createFolderVisible" title="新建文件夹" @ok="handleCreateFolder">
    <!-- 当前目录展示 -->
    <div class="text-sm text-gray-500 mb-4">当前目录：{{ currentDir }}</div>
    <a-input v-model="createFolderName" placeholder="请输入文件夹名称" />
  </a-modal>

  <!-- 展示文件信息 -->
  <DrawerPanel v-model:visible="fileInfoVisible">
    <FileInfo :file="currentFile" @file-deleted="handleFileDeleted" />
  </DrawerPanel>
</template>

<script setup lang="js">
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { getFileList, createFolder, uploadFile, saveUploadData } from '@/api/files'
import { uploadFileToR2 } from '@/utils/aws-r2'
import { formatFileSize } from '@/utils/format'
import BoxView from '@/components/BoxView.vue'
import DrawerPanel from '@/components/drawer/DrawerPanel.vue'
import FileInfo from './FileInfo.vue'
import IconFile from '@/components/icons/iconFile.vue'

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
  try {
    const data = await getFileList({ dir })
    fileList.value = data.data.data
    currentDir.value = dir
  } catch (error) {
    Message.error('获取文件列表失败：' + error.message)
  } finally {
    loading.value = false
  }
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

// 修改 uploadingFiles 的定义
const uploadingFilesState = reactive({
  files: []
})
const { files: uploadingFiles } = toRefs(uploadingFilesState)

/**
 * 添加文件到上传队列
 * @param {File} file - 要上传的文件
 */
const addToUploadQueue = (file) => {
  uploadingFiles.value.push(reactive({
    name: file.name,
    size: file.size,
    status: 'Pending',
    progress: 0,
    speed: '0 KB/s'
  }))
}

/**
 * 更新文件上传进度
 * @param {Object} file - 上传文件对象
 * @param {number} progress - 上传进度（0-100）
 * @param {number} speed - 上传速度（字节/秒）
 */
const updateFileProgress = (file, progress, speed) => {
  file.progress = Math.round(progress)
  // file.speed = formatFileSize(speed) + '/s'
  file.speed = speed + 'MB/s';
  if (progress === 100) {
    file.status = 'Completed'
  } else {
    file.status = 'Uploading'
  }
}

/**
 * 清空上传文件列表
 */
const clearUploadingFiles = () => {
  uploadingFiles.value = []
}

/**
 * 处理文件上传
 * @param {FileList|File[]} files - 要上传的文件列表
 */
const handleFileUpload = async (files) => {
  uploadLoading.value = true

  try {
    const fileArray = Array.from(files)
    fileArray.forEach(addToUploadQueue)

    for (const file of fileArray) {
      const uploadingFile = uploadingFiles.value.find(f => f.name === file.name)
      uploadingFile.status = 'Uploading'

      const res = await uploadFileToR2(
        file,
        ({ progress, speed }) => updateFileProgress(uploadingFile, progress, speed),
        currentDir.value
      )

      if (res.url) {
        await saveUploadData({
          url: res.url,
          fileSize: res.fileSize,
          dir: currentDir.value
        })
        // 确保上传完成后状态更新为 Completed
        updateFileProgress(uploadingFile, 100, 0)
      }
    }

    Message.success('Files uploaded successfully')
    await getFileListData(currentDir.value)
    // 延迟清空上传列表，让用户能看到完成状态
    setTimeout(clearUploadingFiles, 2000)
  } catch (error) {
    Message.error('Error uploading files')
    console.error('Upload error:', error)
  } finally {
    uploadLoading.value = false
  }
}

/**
 * 处理文件拖放
 * @param {DragEvent} event - 拖放事件对象
 */
const handleFileDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  dragCounter.value = 0
  handleFileUpload(event.dataTransfer.files)
}

/**
 * 处理文件选择
 * @param {Event} event - 文件选择事件对象
 */
const handleFileSelect = (event) => {
  handleFileUpload(event.target.files)
  event.target.value = '' // 重置文件输入以允许选择相同的
}

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileDeleted = async ({ success, fileId }) => {
  if (success) {
    fileInfoVisible.value = false // 关闭文件信息抽屉
    await getFileListData(currentDir.value) // 刷新当前目录的文件列表
  }
}

</script>

<style scoped></style>