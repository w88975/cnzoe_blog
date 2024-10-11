<template>
    <div>
        <!-- <p v-for="blog in blogList" :key="blog.id">{{ blog.title }}</p> -->
        <!-- <h1 class="text-2xl font-bold mb-4">Post List</h1> -->
        <TitleLine title="Post List">
            <template #right>
                <!-- 显示创建按钮 -->
                <a-button type="primary" @click="handleCreate">Create</a-button>
            </template>
        </TitleLine>


        <a-spin class="w-full" :loading="loading">
            <a-list>
                <a-list-item v-for="(blog, idx) in blogList" :key="idx">
                    <a-list-item-meta :title="blog.title" :description="blog.extra"></a-list-item-meta>
                    <template #actions>
                        <icon-edit />
                        <icon-delete @click="handleDelete(blog.id)" />
                    </template>
                </a-list-item>
            </a-list>
        </a-spin>
    </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { getBlogList, deleteBlog } from '@/api/blog'
import useList from '@/hooks/useList'
import IconEdit from '@arco-design/web-vue/es/icon/icon-edit'; // 导入图标组件
import IconDelete from '@arco-design/web-vue/es/icon/icon-delete'; // 导入图标组件
import { Modal } from '@arco-design/web-vue';
import { useRouter } from 'vue-router'

const router = useRouter()


const { list: blogList, loading, refresh } = useList(getBlogList)

const handleDelete = (id) => {
    Modal.confirm({
        title: 'Delete Blog',
        content: 'Are you sure you want to delete this blog?',
        onBeforeOk: async () => {
            await deleteBlog(id)
            refresh()
            return true
        }
    })
}

const handleCreate = () => {
    router.push('/admin/md-editor')
}
</script>