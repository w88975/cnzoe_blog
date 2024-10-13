<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <BoxView>
      <TitleLine title="最新精华"></TitleLine>
      <!-- 渲染数据 -->
      <div class="space-y-2">
        <div v-for="item in latestFeatured" :key="item.id">
          <router-link :to="{ name: '91porn-detail', query: { tid: item.tid } }"
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
          <router-link :to="{ name: '91porn-detail', query: { tid: item.tid } }"
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
          <router-link :to="{ name: '91porn-detail', query: { tid: item.tid } }"
            :class="{ 'text-red-600 font-bold': item.isHighlighted, 'hover:text-blue-600': !item.isHighlighted }"
            class="cursor-pointer truncate block">{{ item.title }}</router-link>
        </div>
      </div>
    </BoxView>
  </div>
</template>

<script setup>
import { $$91porn_TodayHot } from '@/api/91porn'
import { onMounted, ref } from 'vue'
import BoxView from '@/components/BoxView.vue'

const latestFeatured = ref([])
const latestLiked = ref([])
const weeklyHot = ref([])

onMounted(async () => {
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