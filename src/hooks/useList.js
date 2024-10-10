import { ref, onMounted } from 'vue'

export default function useList(api) {
    const list = ref([])
    const loading = ref(false)
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(10)

    const getList = () => {
        loading.value = true
        api({ page: page.value, pageSize: pageSize.value }).then(res => {
            list.value = res.data.data.list
            total.value = res.data.data.total
        }).finally(() => {
            loading.value = false
        })
    }

    const refresh = () => {
        page.value = 1
        getList()
    }

    onMounted(() => {
        getList()
    })

    return {
        list,
        loading,
        refresh,
    }
}
