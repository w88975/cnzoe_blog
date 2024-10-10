import instance from './index'

// create blog
export const createBlog = (data) => {
    return instance.post('/api/blogs/add', data)
}

// get blog list
export const getBlogList = () => {
    return instance.get(`/api/blogs/list`)
}

// delete blog
export const deleteBlog = (id) => {
    return instance.post(`/api/blogs/delete/${id}`, { id })
}
