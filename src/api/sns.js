import instance from './index'
// authRouter('all', '/api/sns/list', $$SNS_List, true)
// authRouter('post', '/api/sns/publish', $$SNS_Publish, true)

// 获取sns列表
export const getSnsList = (params) => {
    return instance.post('/api/sns/list', { ...params })
}

// 发布sns
export const publishSns = (data) => {
    return instance.post('/api/sns/publish', { ...data })
}

// 删除sns
export const deleteSns = (data) => {
    return instance.post('/api/sns/delete', { ...data })
}
