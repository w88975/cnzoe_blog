<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <BoxView>
      <TitleLine title="最新精华"></TitleLine>
      <!-- 渲染数据 -->
      <div class="space-y-2">
        <div v-for="item in latestFeatured" :key="item.id">
          <router-link target="_blank"  :to="{ name: '91porn-detail', query: { tid: item.tid } }"
            :class="{ 'text-red-600 font-bold': item.isHighlighted, 'hover:text-blue-600': !item.isHighlighted }"
            class="cursor-pointer truncate block">{{ item.title }}</router-link>
        </div>
      </div>
    </BoxView>
    <BoxView>
      <TitleLine title="最新点赞"></TitleLine>
      <!-- 渲染数据 -->
      <div class="space-y-2">
        <div v-for="item in latestLiked" :key="item.id">
          <router-link target="_blank"  :to="{ name: '91porn-detail', query: { tid: item.tid } }"
            :class="{ 'text-red-600 font-bold': item.isHighlighted, 'hover:text-blue-600': !item.isHighlighted }"
            class="cursor-pointer truncate block">{{ item.title }}</router-link>
        </div>
      </div>
    </BoxView>
    <BoxView>
      <TitleLine title="本周热门"></TitleLine>
      <!-- 渲染数据 -->
      <div class="space-y-2">
        <div v-for="item in weeklyHot" :key="item.id">
          <router-link target="_blank"  :to="{ name: '91porn-detail', query: { tid: item.tid } }"
            :class="{ 'text-red-600 font-bold': item.isHighlighted, 'hover:text-blue-600': !item.isHighlighted }"
            class="cursor-pointer truncate block">{{ item.title }}</router-link>
        </div>
      </div>
    </BoxView>
  </div>
  <BoxView>
    <TitleLine title="精华帖子"></TitleLine>
    <!-- 渲染数据 -->
    <div class="space-y-2">
      <div v-for="item in hotPosts" :key="item.id">
        <router-link  :to="{ name: '91porn-detail', query: { tid: item.tid } }" :class="'text-red-600 font-bold '"
          class="cursor-pointer truncate block" target="_blank" rel="noopener noreferrer">
          {{ item.cache ? '[已缓存]' : '' }}
          {{ item.full_save ? '[已保存]' : '' }}
          {{ item.title }}</router-link>
      </div>
    </div>
    <div class="flex justify-center items-center mt-4">
      <button @click="prevPage"
        class="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        :disabled="currentPage === 1">
        上一页
      </button>
      <span class="mx-2">第 {{ currentPage }} 页</span>
      <button @click="nextPage"
        class="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        :disabled="currentPage === totalPages">
        下一页
      </button>
    </div>
  </BoxView>
</template>

<script setup>
import { $$91porn_TodayHot, $$91porn_GetFeaturedPosts } from '@/api/91porn'
import { onMounted, ref } from 'vue'
import BoxView from '@/components/BoxView.vue'

const latestFeatured = ref([])
const latestLiked = ref([])
const weeklyHot = ref([])

// 精华帖子
const hotPosts = ref([])
const currentPage = ref(1)
const totalPages = ref(300) // 假设总页数为300，您可以根据实际情况调整

const getFeaturedPosts = async (page) => {
  const res = await $$91porn_GetFeaturedPosts(page)
  console.log(res)
  hotPosts.value = res.data.posts
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    getFeaturedPosts(currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    getFeaturedPosts(currentPage.value)
  }
}

onMounted(async () => {
  getFeaturedPosts(currentPage.value)
  const res = await $$91porn_TodayHot()
  console.log(res)
  latestFeatured.value = res.data.latestFeatured
  latestLiked.value = res.data.latestLiked
  weeklyHot.value = res.data.weeklyHot
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
