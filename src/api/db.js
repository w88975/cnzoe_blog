
import instance from './index'

// // db相关
// authRouter('all', '/api/db/tables', $$DB_GetTables)
// authRouter('all', '/api/db/table/:tableName', $$DB_GetTableStructure)


// 获取表列表
export const getTables = () => {
    return instance.get('/api/db/tables')
}

// 获取表结构
export const getTableStructure = (tableName) => {
    return instance.get(`/api/db/table/${tableName}`)
}

// 修改表结构
export const modifyTableStructure = (tableName, newStructure) => {
    return instance.post('/api/db/modify-table-structure', { tableName, newStructure })
}

// 获取表数据
export const getTableData = (data) => {
    const { tableName, ...params } = data
    return instance.post(`/api/db/table/data/${tableName}`, { ...params })
}

// 保存单行数据
export const updateTableData = (tableName, data) => {
    // const { tableName, ...params } = data
    return instance.post(`/api/db/table/update/${tableName}`, { ...data })
}

// 新建表
export const createTable = (tableName) => {
    return instance.post('/api/db/create/table', { tableName })
}

// 通用search, 支持模糊搜索, 支持分页, 支持排序
export const commonSearch = (data) => {
    return instance.post('/api/db/search', { ...data })
}
