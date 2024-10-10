import instance from './index'

// tag list
export const getTagList = () => {
    return instance.get('/api/category/list/TAG')
}