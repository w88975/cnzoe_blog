<template>
  <div class="w-24 h-24 flex items-center justify-center overflow-hidden">
    <!-- 文件夹 -->
    <img v-if="file.type === 0" :src="IconFolder" alt="file preview" class="w-full h-full object-cover p-2" />
    <template v-else>
      <!-- 图片 -->
      <img v-if="fileType === 'image'" :src="OSS_IMAGE_RESIZE + file.full_path" alt="file preview"
        class="w-full object-cover p-2" />
      <!-- audio  -->
      <img v-if="fileType === 'audio'" :src="IconAudio" alt="file preview" class="w-full h-full object-cover p-2" />
      <!-- video -->
      <img v-if="fileType === 'video'" :src="IconVideo" alt="file preview" class="w-full h-full object-cover p-2" />
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
import { OSS_URL, OSS_IMAGE_RESIZE } from '@/config'
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
