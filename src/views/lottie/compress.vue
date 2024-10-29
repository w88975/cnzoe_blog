<template>
    <div class="flex flex-col lg:flex-row box-wrapper">
        <BoxView class="w-full lg:w-1/5 lg:mr-4">

        </BoxView>


        <BoxView class="boxRight">
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-bold mb-4">Lottie 压缩</h1>
                <p>{{ msg }}</p>
                <!-- File Upload Section -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">上传 Lottie 文件</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M..." />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                                <label for="file-upload"
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>点击上传</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                        @change="handleFileUpload">
                                </label>
                                <p class="pl-1">或拖拽到此处</p>
                            </div>
                            <p class="text-xs text-gray-500">JSON 文件</p>
                        </div>
                    </div>
                </div>

                <!-- Lottie Preview Section -->
                <div class="mb-4">
                    <h2 class="text-lg font-medium">Lottie 预览</h2>
                    <div class="border rounded-md p-4">
                        <!-- Lottie 预览组件 -->
                        <div v-if="lottieData">
                            <!-- 这里放置 Lottie 预览组件 -->
                        </div>
                        <div v-else class="text-gray-500">请上传 Lottie 文件以预览</div>
                    </div>
                </div>

                <!-- Compression Section -->
                <div class="mb-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        @click="compressLottie">
                        压缩
                    </button>
                </div>

                <!-- Download Section -->
                <div v-if="compressedData" class="mb-4">
                    <h2 class="text-lg font-medium">下载压缩文件</h2>
                    <div class="flex items-center">
                        <a :href="compressedDataUrl" download
                            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            下载
                        </a>
                        <p class="ml-4 text-sm text-gray-600">压缩比率: {{ compressionRatio }}%</p>
                    </div>
                </div>
            </div>
        </BoxView>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createVideoPreviews } from '@/utils/ffmpeg'

const lottieData = ref(null)
const compressedData = ref(null)
const compressionRatio = ref(0)
const msg = ref('')

const handleFileUpload = (event) => {
    // 处理文件上传
}

const compressLottie = () => {
    // 处理压缩逻辑
}

onMounted(async () => {
    const gif = await createVideoPreviews('https://91porn.lwhzak.workers.dev/https://oss.cnzoe.com/Squish_it_seed1423175453.mp4', (msgs) => {
        msg.value += msgs + '\n'
    })
    console.log(gif)
    // 将blob插入document
    const img = document.createElement('img')
    img.src = URL.createObjectURL(gif)
    document.body.appendChild(img)
})
</script>

<style scoped>
.box-wrapper {
    min-height: 80vh;
}

.boxRight {
    flex: 1;
    overflow: hidden;
}
</style>