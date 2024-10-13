<template>
  <BoxView>
    <TitleLine :title="postInfo.title || '加载中...'">
      <template #right>
        <a-space>
          <NvaButton type="primary">保存文档</NvaButton>
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
import { $$91porn_PostContent } from '@/api/91porn'
import BoxView from '@/components/BoxView.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tid = ref(null)
const postInfo = ref({
  authorName: '',
  authorUID: '',
  title: '',
  postTime: '',
  content: '',
  images: []
})

onMounted(async () => {
  tid.value = route.query.tid
  const res = await $$91porn_PostContent(tid.value)
  postInfo.value = res.data
})
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
