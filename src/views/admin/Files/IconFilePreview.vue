<template>
  <div class="w-ful h-full flex items-center justify-center overflow-hidden">
    <!-- 文件夹 -->
    <img v-if="file.type === 0" :src="IconFolder" alt="file preview" class="w-full h-full object-cover p-2" />
    <template v-else>
      <!-- 图片 -->
      <img v-if="fileType === 'image'" :src="OSS_IMAGE_RESIZE + file.full_path" alt="file preview"
        class="w-full object-cover p-2" />
      <!-- audio  -->
      <img v-if="fileType === 'audio'" :src="IconAudio" alt="file preview" class="w-full h-full object-cover p-2" />
      <!-- video -->
      <img v-if="fileType === 'video' && !file.preview" :src="IconVideo" alt="file preview"
        class="w-full h-full object-cover p-2" />
      <!-- video, 有预览图 -->
      <div v-if="fileType === 'video' && file.preview" class="relative w-full h-full group">
        <img :src="OSS_GIF_RESIZE + file.preview" alt="video preview" class="w-full h-full object-cover" />
        <img :src="OSS_IMAGE_RESIZE + file.preview" alt="video preview"
          class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div
          class="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
          <div class="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <!-- document -->
      <img v-if="fileType === 'document'" :src="IconDocument" alt="file preview"
        class="w-full h-full object-cover p-2" />
      <!-- code -->
      <img v-if="fileType === 'code'" :src="IconCode" alt="file preview" class="w-full h-full object-cover p-2" />
      <!-- zip -->
      <img v-if="fileType === 'zip'" :src="IconZip" alt="file preview" class="w-full h-full object-cover p-2" />
      <!-- unknown -->
      <img v-if="fileType === 'unknown'" :src="IconUnknown" alt="file preview" class="w-full h-full object-cover p-2" />
    </template>

  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { OSS_URL, OSS_IMAGE_RESIZE, OSS_GIF_RESIZE } from '@/config'
import IconFolder from './icons/icon_folder.png'
// import IconImage from './icons/icon_image.png'
import IconAudio from './icons/icon_audio.png'
import IconVideo from './icons/icon_video.png'
import IconDocument from './icons/icon_pdf.png'
import IconCode from './icons/icon_txt.png'
import IconZip from './icons/icon_zip.png'
import IconUnknown from './icons/icon_unknow.png'

const props = defineProps({
  file: {
    type: Object,
    required: true
  },
})

const fileType = ref('txt')
const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toLowerCase()
}

const getFileType = (fileName) => {
  const extension = getFileExtension(fileName)
  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return 'document'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return 'image'
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'video'
    case 'mp3':
    case 'wav':
      return 'audio'
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'xz':
      return 'zip'
    case 'js':
    case 'vue':
    case 'py':
    case 'java':
      return 'code'
    default:
      return 'unknown'
  }
}

onMounted(() => {
  fileType.value = getFileType(props.file.path)
})

</script>
