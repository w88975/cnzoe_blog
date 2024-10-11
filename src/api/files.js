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

// 上传文件
export const uploadFile = (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('dir', data.dir);

    return instance.post('/api/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
