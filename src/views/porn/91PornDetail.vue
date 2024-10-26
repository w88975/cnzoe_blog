<template>
    <BoxView>
        <TitleLine :title="postInfo.title || '加载中...'">
            <template #right>
                <a-space>
                    <NvaButton type="primary" @click="toggleViewMode" :class="{ 'bg-red-500': isGridView }">
                        {{ isGridView ? '切换到列表模式' : '切换到看图模式' }}
                    </NvaButton>
                    <NvaButton type="primary" @click="toggleFavorite" :class="{ 'bg-red-500': isLiked }">
                        {{ isLiked ? '已收藏' : '收藏' }}
                    </NvaButton>
                    <NvaButton type="primary" @click="toggleLike" :class="{ 'bg-red-500': isJiping }">
                        {{ isJiping ? '已喜欢' : '喜欢' }}
                    </NvaButton>
                    <NvaButton type="primary" @click="saveDocument"
                        :disabled="isSaving === 'saving' || isSaving === 'saved'">
                        {{ getSaveButtonText() }}
                    </NvaButton>
                </a-space>
            </template>
        </TitleLine>
        <div v-if="isGridView" class="grid grid-cols-2 gap-4">
            <img v-for="(image, index) in postInfo.images" :key="index" :src="image" class="w-full h-auto" />
        </div>
        <div v-else>
            <div class="mb-4 text-sm text-gray-600">
                <p class="mb-1">
                    <span class="font-semibold">作者：</span>
                    <span @click="viewAuthor(postInfo.authorName)"
                        class="text-blue-600 cursor-pointer hover:underline">{{ postInfo.authorName }}</span>
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
            <div class="article-content" ref="articleContent">
                <div v-show="postInfo.content" v-html="postInfo.content"></div>
                <p v-show="!postInfo.content">加载中...</p>
            </div>
        </div>
    </BoxView>
</template>

<script setup>
import { $$91porn_PostContent, $$91porn_UpdateSavedImgs, $$91porn_ToggleFavorite, $$91porn_ToggleJiping } from '@/api/91porn'
import { uploadFileToR2 } from '@/utils/aws-r2'
import { saveUploadData } from '@/api/files'
import BoxView from '@/components/BoxView.vue'
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OSS_URL } from '@/config'

const route = useRoute()
const router = useRouter()

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
    is_like: false, // Add this line to include the is_like property
    is_jiping: false, // 新增属性来控制喜欢状态
})

const isSaving = ref('initial') // 'initial', 'saving', 'saved'
const isLiked = ref(false)
const isJiping = ref(false) // 新增状态来控制喜欢状态
const saveProgress = ref(0)
const totalImages = computed(() => postInfo.value.images?.length || 0)

const articleContent = ref(null)

const viewAuthor = (authorName) => {
    router.push({ name: 'favorite', query: { author: authorName } })
}

const toggleFavorite = async () => {
    const res = await $$91porn_ToggleFavorite(tid.value)
    isLiked.value = res.data.data.isLiked
}

const toggleLike = async () => {
    const res = await $$91porn_ToggleJiping(tid.value) // Assuming the API can handle this
    isJiping.value = res.data.data.is_jiping // Update the isJiping state based on the response
}

const isGridView = ref(true) // 新增状态来控制视图模式

const toggleViewMode = () => {
    isGridView.value = !isGridView.value // 切换视图模式
}

onMounted(async () => {
    tid.value = route.query.tid
    const res = await $$91porn_PostContent(tid.value)
    postInfo.value = res.data
    isLiked.value = postInfo.value.is_like === 1
    isJiping.value = postInfo.value.is_jiping === 1 // Initialize isJiping based on the postInfo
    // Replace old image URLs with new ones in the content
    if (postInfo.value.images && postInfo.value.images.length > 0 && postInfo.value.saved_imgs) {
        const oldImages = postInfo.value.images
        const newImages = postInfo.value.saved_imgs.split(',')

        if (oldImages.length === newImages.length) {
            postInfo.value.images = newImages
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

    // Replace img src with data-src in the content
    if (postInfo.value.content) {
        postInfo.value.content = postInfo.value.content.replace(
            /<img\s+src="([^"]+)"/gi,
            '<img class="lazy-img" data-src="$1" loading="lazy"'
        )
    }
    nextTick(() => {
        handleImageLoad()
    })
    // 
    if (postInfo.value.full_save) {
        isSaving.value = 'saved'
    } else {
        console.log('自动缓存')
        saveDocument()
    }

})

const getSaveButtonText = () => {
    switch (isSaving.value) {
        case 'saving':
            return `保存中 (${saveProgress.value}/${totalImages.value})`
        case 'saved':
            return '已保存'
        default:
            return '保存文档'
    }
}

const saveDocument = async () => {
    if (isSaving.value === 'saving' || isSaving.value === 'saved') return

    if (postInfo.value.images && postInfo.value.images.length > 0) {
        const basePath = `/porn91`
        try {
            isSaving.value = 'saving'
            saveProgress.value = 0
            const savedImgs = []

            // 创建一个数组来存储所有的上传 Promise
            const uploadPromises = postInfo.value.images.map(async (image, index) => {
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

                // 在这里更新 saveProgress
                saveProgress.value += 1 // 只增加 1
            })

            // 等待所有的上传 Promise 完成
            await Promise.all(uploadPromises)

            await $$91porn_UpdateSavedImgs(tid.value, savedImgs.join(','))
            console.log('文档保存成功！')
            isSaving.value = 'saved'
        } catch (error) {
            console.error('保存文档时出错：', error)
            alert('保存文档失败，请稍后重试。')
            isSaving.value = 'initial'
        } finally {
            saveProgress.value = 0
        }
    } else {
        alert('没有片需要保存')
    }
}

async function downloadAndUploadImage(imageUrl, basePath, prefix) {
    try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const fileName = prefix + (imageUrl.split('/').pop() || `image_${Date.now()}.jpg`)
        const file = new File([blob], fileName, { type: blob.type })

        const uploadResult = await uploadFileToR2(file, () => { }, basePath)

        // 删除 Blob 对象以释放内存
        URL.revokeObjectURL(imageUrl)

        return uploadResult
    } catch (error) {
        console.error('下载或上传图片时出错：', error)
        throw error
    }
}

const handleImageLoad = () => {
    console.log('handleImageLoad')
    const images = document.querySelectorAll('.article-content img[data-src]')
    const options = {
        root: null, // 使用视口作为根
        rootMargin: '0px',
        threshold: 0.1 // 当 10% 的图像可见时触发加载
    }

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src // 设置 src 属性
                img.onload = () => img.removeAttribute('data-src') // 加载移除 data-src
                imageObserver.unobserve(img) // 停止观察
            }
        })
    }, options)

    images.forEach(image => {
        imageObserver.observe(image) // 开始观察每个图像
    })
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

.lazy-img {
    width: 100%;
    height: auto;
    min-height: 5rem;
    background-color: #f0f0f0;
}

.bg-red-500 {
    background-color: #ef4444;
}
</style>
