import { ref, onMounted } from 'vue'

export default function useList(api, params = {}) {
    const list = ref([])
    const loading = ref(false)
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(20)
    const result = ref({})
    const initParams = ref(params)
    const defaultParams = ref(params)

    const getList = async (newParams) => {
        if (newParams.page) {
            page.value = newParams.page
        }
        if (newParams.pageSize) {
            pageSize.value = newParams.pageSize
        }
        loading.value = true
        await api({ page: page.value, pageSize: pageSize.value, ...newParams }).then(res => {
            list.value = res.data.data.list
            total.value = res.data.data.total
            result.value = res.data.data
        }).finally(() => {
            loading.value = false
        })
    }

    const refresh = async (newParams, isReset = false) => {
        page.value = 1
        if (isReset) {
            list.value = []
            defaultParams.value = { ...initParams.value, ...newParams }
        } else {
            defaultParams.value = { ...defaultParams.value, ...newParams }
        }
        await getList({ ...defaultParams.value })
    }

    const setParams = (newParams) => {
        defaultParams.value = { ...defaultParams.value, ...newParams }
    }

    onMounted(() => {
        getList(params)
    })

    return {
        list,
        loading,
        refresh,
        total,
        result,
        page,
        pageSize,
        setParams,
    }
}
