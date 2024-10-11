import instance from './index'

// 获取文件夹列表
export const getFileList = (params) => {
    return instance.get('/api/files/list', {
        params: {
            ...params
        }
    })
}

// 新建文件夹
export const createFolder = (data) => {
    return instance.post('/api/files/create-folder', { ...data })
}
