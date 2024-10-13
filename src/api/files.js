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

// 设置文件别名
export const setFileAlias = (data) => {
    return instance.post('/api/files/set-alias', { ...data })
}

// 上传文件
// 废弃, 因为可以纯前端上传, 不受大小限制
export const uploadFile = (data) => {
  const fileKey = `${data.dir}/${data.file.name}`
  const { url, fields } = getR2UploadCredentials({ fileKey })
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('dir', data.dir);

    return instance.post('/api/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 上传完后保存上传数据
export const saveUploadData = (data) => {
    return instance.post('/api/files/save-after-upload', { ...data })
}

// 删除文件
export const deleteFile = (data) => {
    return instance.post('/api/files/delete', { ...data })
}
