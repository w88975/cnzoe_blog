<template>
    <div class="flex flex-col md:flex-row md:space-x-4">
        <BoxView class="flex-1">
            <TitleLine title="SNS 动态"></TitleLine>
            <SNSView />
        </BoxView>
        <BoxView class="flex-1 mt-4 md:mt-0">
            <TitleLine title="Article List"></TitleLine>
            <!-- <div class="space-y-4">
        <article v-for="article in articles" :key="article.id"
          class="flex flex-col md:flex-row bg-white shadow-sm rounded-lg overflow-hidden">
          <div v-if="article.thumbnail" class="md:w-1/4 h-48 md:h-48 flex-shrink-0">
            <img :src="article.thumbnail" :alt="article.title" class="w-full h-full object-cover">
          </div>
          <div class="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
              <p class="text-gray-600 text-sm mb-2">{{ article.date }}</p>
              <p class="text-gray-700 line-clamp-3">{{ article.summary }}</p>
            </div>
            <a href="#" class="text-blue-600 hover:text-blue-800 self-start mt-2">Read more</a>
          </div>
        </article>
      </div> -->
        </BoxView>
    </div>

</template>

<script setup lang="js">
import BoxView from '@/components/BoxView.vue'
import SNSView from '@/views/sns/index.vue'
// 填充数据, 写一些mock数据
const articles = [
    { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1' },
    { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1', thumbnail: 'https://via.placeholder.com/150' },

    { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1', thumbnail: 'https://via.placeholder.com/150' }, { id: 1, title: 'Article 1', date: '2021-01-01', summary: 'This is the summary of article 1', thumbnail: 'https://via.placeholder.com/150' },
]
</script>