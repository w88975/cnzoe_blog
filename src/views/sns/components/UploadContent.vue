<template>
    <a-spin class="w-full" :loading="loading">
        <div class="w-full max-w-md mx-auto">
            <div class="mb-4">
                <label for="file-upload"
                    class="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <span class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span class="font-medium text-gray-600">
                            {{ type === 'video' ? '上传视频' : '上传图片' }}
                        </span>
                    </span>
                    <input id="file-upload" type="file" :accept="acceptTypes" class="hidden" multiple
                        @change="handleFileChange" />
                </label>
            </div>

            <div v-if="files.length > 0" class="mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">上传进度</div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${overallProgress}%` }"></div>
                </div>
            </div>

            <div v-if="files.length > 0" class="space-y-2">
                <div v-for="(file, index) in files" :key="index"
                    class="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <span class="text-sm truncate">{{ file.file.name }}</span>
                    <button @click="removeFile(index)" class="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script setup>
import { ref, computed, defineExpose, defineEmits } from 'vue'
import { uploadFileToR2 } from '@/utils/aws-r2'
import { saveUploadData } from '@/api/files'
import { OSS_URL } from '@/config'


const props = defineProps({
    type: {
        type: String,
        default: 'image',
        validator: (value) => ['image', 'video'].includes(value)
    }
})

const emit = defineEmits(['complete'])
const loading = ref(false)
const files = ref([])
const overallProgress = ref(0)

const acceptTypes = computed(() => props.type === 'video' ? 'video/*' : 'image/*')

const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files)
    files.value = [
        ...files.value,
        ...newFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            progress: 0
        }))
    ]
}

const removeFile = (index) => {
    URL.revokeObjectURL(files.value[index].preview)
    files.value.splice(index, 1)
    updateOverallProgress()
}

const uploadFiles = async () => {
    loading.value = true
    const uploadPromises = files.value.map((file, index) => {
        if (file.progress === 0) {
            return simulateUpload(index)
        }
        return Promise.resolve()
    })

    await Promise.all(uploadPromises)
    console.log('upload complete')
    loading.value = false
    emit('complete', files.value.map(file => OSS_URL + file.url), props.type)
}

const simulateUpload = (index) => {
    return new Promise((resolve, reject) => {
        const file = files.value[index].file
        uploadFileToR2(file, (progressData) => {
            files.value[index].progress = parseFloat(progressData.progress)
            updateOverallProgress()
        }, '/SNS')
            .then((result) => {
                files.value[index].progress = 100
                files.value[index].url = result.url
                updateOverallProgress()
                console.log(`File uploaded: ${result.url}`)
                // 保存到数据库
                return saveUploadData({
                    url: result.url,
                    dir: '/SNS',
                    fileSize: result.fileSize,
                    type: file.type,
                    name: file.name
                })
            })
            .then((savedResult) => {
                console.log(`Upload data saved: ${savedResult.id}`)
                resolve(savedResult)
            })
            .catch((error) => {
                console.error(`Upload failed for file ${file.name}:`, error)
                reject(error)
            })
    })
}

const updateOverallProgress = () => {
    const totalProgress = files.value.reduce((sum, file) => sum + file.progress, 0)
    overallProgress.value = files.value.length > 0 ? totalProgress / files.value.length : 0
}

const doUpload = () => {
    uploadFiles()
}

defineExpose({
    doUpload
})
</script>
