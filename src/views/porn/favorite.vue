<template>
    <BoxView>
        <a-spin :loading="loading" class="w-full h-full">
            <NvaTab :tabs="tabList" v-model:tabIndex="tabIndex"></NvaTab>

            <!-- 作者列表 -->
            <div v-if="tabIndex === 3" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div @click="viewAuthor(item, $event)" v-for="item in list" :key="item.author_name"
                    class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800 truncate">{{ item.author_name }}</h3>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{ item.post_count }}
                            帖子</span>
                    </div>
                </div>
            </div>
            <!-- 帖子列表 -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div @click="itemClick(item)" v-for="item in list" :key="item.id"
                    class="border border-gray-200 p-4 transition duration-300 cursor-pointer">
                    <div class="flex flex-wrap gap-2 mb-2">
                        <span v-if="item.full_save"
                            class="px-1 py-1 bg-blue-100 text-blue-800 text-xs font-semibold">存</span>
                        <span v-if="item.is_like"
                            class="px-1 py-1 bg-red-100 text-red-800 text-xs font-semibold">收藏</span>
                        <span v-if="item.is_hot"
                            class="px-1 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold">精</span>
                    </div>
                    <NvaTextScroll start="hover" class="text-sm font-semibold text-gray-800 mb-2">{{ item.title }}
                    </NvaTextScroll>
                    <div class="flex justify-between items-center text-xs text-gray-600">
                        <span class="flex items-center" @click="viewAuthor(item, $event)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {{ item.author_name }}
                        </span>
                        <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {{ item.post_time }}
                        </span>
                    </div>
                </div>
            </div>
            <NvaPagination :hook="ListHandle"></NvaPagination>
        </a-spin>
    </BoxView>
</template>

<script setup>
import { ref, watch } from 'vue'
import useDBSearch from '@/hooks/useDBSearch'
import { useRouter } from 'vue-router'

const router = useRouter()

import { useRoute } from 'vue-router'
const route = useRoute()
const author = ref(route.query.author)
const tabIndex = ref(author.value ? 4 : 0)
const tabList = ref(['已收藏', '已保存', '已缓存', '作者', '查询结果', '极品'])

const ListHandle = useDBSearch({
    tableName: 'PORN91',
    search: author.value ? {
        author_name: author.value,
        xx: {}
    } : {
        is_like: 1
    },
    order: 'desc'
})

const { list, loading, refresh } = ListHandle

const itemClick = (item) => {
    const route = router.resolve({ name: '91porn-detail', query: { tid: item.tid } })
    window.open(route.href, '_blank')
}

const viewAuthor = (item, event) => {
    event.stopPropagation()
    router.replace({ query: { ...route.query, author: item.author_name } })
    author.value = item.author_name
    tabIndex.value = 4
}

watch(tabIndex, (newVal) => {
    let params = {}
    if (newVal !== 4) {
        author.value = ''
        router.replace({ query: { ...route.query, author: undefined } })
    }
    switch (newVal) {
        case 0:
            params = { search: { is_like: 1 } }
            break
        case 1:
            params = { search: { full_save: 1 } }
            break
        case 2:
            params = { search: {} }
            break
        case 4:
            params = {
                search: {
                    author_name: author.value
                }
            }
            break
        case 5:
            params = { search: { is_jiping: 1 } }
            break
        case 3:
            params = {
                sql: `SELECT author_name, COUNT(*) AS post_count
                    FROM PORN91 WHERE author_name IS NOT NULL AND author_name !=''
                    GROUP BY author_name`,
                sort: 'post_count',
                order: 'desc'
            }
            break
    }
    refresh(params, true)
})
</script>
