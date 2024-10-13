<template>
  <BoxView>
    <TitleLine :title="postInfo.title || '加载中...'">
      <template #right>
        <a-space>
          <NvaButton type="primary" @click="saveDocument">
            {{ isSaving ? `保存中 (${saveProgress}/${totalImages})` : '保存文档' }}
          </NvaButton>
        </a-space>
      </template>
    </TitleLine>
    <div class="mb-4 text-sm text-gray-600">
      <p class="mb-1">
        <span class="font-semibold">作者：</span>
        <span class="text-blue-600">{{ postInfo.authorName }}</span>
      </p>
      <p class="mb-1">
        <span class="font-semibold">发帖时间：</span>
        <span class="text-green-600">{{ postInfo.postTime }}</span>
      </p>
      <p>
        <span class="font-semibold">图片数量：</span>
        <span class="text-red-600">{{ postInfo.images.length }}</span>
      </p>
    </div>
    <div class="article-content">
      <!-- Placeholder for content -->
      <div v-if="postInfo.content" v-html="postInfo.content"></div>
      <p v-else>加载中...</p>
    </div>
  </BoxView>
</template>

<script setup>
import { $$91porn_PostContent, $$91porn_UpdateSavedImgs } from '@/api/91porn'
import { uploadFileToR2 } from '@/utils/aws-r2'
import { saveUploadData } from '@/api/files'
import BoxView from '@/components/BoxView.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { OSS_URL } from '@/config'

const route = useRoute()

const tid = ref(null)
const postInfo = ref({
  authorName: '',
  authorUID: '',
  title: '',
  postTime: '',
  content: '',
  // 旧图片
  images: [], //["https://int.alimamacloud1.com/attachments//24101022113dba1cddacc8c25a.jpg",…] 这种格式
  // 新图片
  saved_imgs: '', // "https://oss.cnzoe.com/porn91/24101022113dba1cddacc8c25a.jpg,https://oss.cnzoe.com/porn91/2410102211706a8e0f532993e1.jpg,https://oss.cnzoe.com/porn91/241010221133fd1a32e44fe950.jpg,https://oss.cnzoe.com/porn91/2410102211274eaf7dfdec9e0d.jpg,https://oss.cnzoe.com/porn91/241010221103287c76b0c5126e.jpg,https://oss.cnzoe.com/porn91/24101022119f28e56db23d3aca.jpg,https://oss.cnzoe.com/porn91/241010221163951b8c9e2e23c0.jpg"
})

const isSaving = ref(false)
const saveProgress = ref(0)
const totalImages = computed(() => postInfo.value.images?.length || 0)

onMounted(async () => {
  tid.value = route.query.tid
  const res = await $$91porn_PostContent(tid.value)
  postInfo.value = res.data
  // Replace old image URLs with new ones in the content
  if (postInfo.value.images && postInfo.value.images.length > 0 && postInfo.value.saved_imgs) {
    const oldImages = postInfo.value.images
    const newImages = postInfo.value.saved_imgs.split(',')

    if (oldImages.length === newImages.length) {
      for (let i = 0; i < oldImages.length; i++) {
        const oldImageUrl = oldImages[i]
        const newImageUrl = newImages[i]

        // Replace all occurrences of old image URL with new image URL in the content
        if (postInfo.value.content) {
          postInfo.value.content = postInfo.value.content.replace(new RegExp(oldImageUrl, 'g'), newImageUrl)
        }
      }
    } else {
      console.warn('The number of old images does not match the number of saved images.')
    }
  }
})

const saveDocument = async () => {
  if (postInfo.value.images && postInfo.value.images.length > 0) {
    const basePath = `/porn91`
    try {
      isSaving.value = true
      saveProgress.value = 0
      const savedImgs = []
      for (const [index, image] of postInfo.value.images.entries()) {
        const url = `https://91porn.lwhzak.workers.dev/${image}`
        const prefix = `${postInfo.value.authorName}_${tid.value}_`
        const uploadResult = await downloadAndUploadImage(url, basePath, prefix)
        await saveUploadData({
          url: uploadResult.url,
          fileSize: uploadResult.fileSize,
          dir: basePath,
          originalUrl: url,
          title: postInfo.value.title,
          authorName: postInfo.value.authorName,
          postTime: postInfo.value.postTime,
          tid: tid.value
        })
        savedImgs.push(OSS_URL + uploadResult.url)
        saveProgress.value = index + 1
      }
      
      await $$91porn_UpdateSavedImgs(tid.value, savedImgs.join(','))
      alert('文档保存成功！')
    } catch (error) {
      console.error('保存文档时出错：', error)
      alert('保存文档失败，请稍后重试。')
    } finally {
      isSaving.value = false
      saveProgress.value = 0
    }
  } else {
    alert('没有图片需要保存。')
  }
}

async function downloadAndUploadImage(imageUrl, basePath, prefix) {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const fileName = prefix + (imageUrl.split('/').pop() || `image_${Date.now()}.jpg`)
    const file = new File([blob], fileName, { type: blob.type })

    const uploadResult = await uploadFileToR2(file, () => { }, basePath)
    return uploadResult
  } catch (error) {
    console.error('下载或上传图片时出错：', error)
    throw error
  }
}
</script>


<style>
.article-content {
  max-width: 100%;
  /* padding: 1rem; */

  line-height: 1.5;
  word-wrap: break-word;
  /* text-align: center; */
}

.article-content img {
  max-width: 100%;
  /* max-height: 10rem;
  margin: auto; */
}

.article-content * {
  font-size: 14px;
}

@media (min-width: 768px) {
  .article-content {
    font-size: 1.1rem;
    /* padding: 2rem; */
  }
}
</style>
