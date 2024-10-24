import instance from './index'

// 获取91porn今日热门视频
export const $$91porn_TodayHot = async () => {

    // /api/91porn/today-hot
    return instance.get('/api/91porn/today-hot', {})
}

export const $$91porn_PostContent = async (tid) => {
    return instance.get('/api/91porn/post-content', { params: { tid } })
}

// /api/91porn/update-saved-imgs
export const $$91porn_UpdateSavedImgs = async (tid, savedImgs) => {
    return instance.post('/api/91porn/update-saved-imgs', { tid, savedImgs })
}

// /api/91porn/get-featured-posts
export const $$91porn_GetFeaturedPosts = async (page = 1, pageSize = 20) => {
    return instance.post('/api/91porn/get-featured-posts', { page, pageSize })
}

// /api/91porn/toggle-favorite
export const $$91porn_ToggleFavorite = async (tid) => {
    return instance.post('/api/91porn/toggle-favorite', { tid })
}

// /api/91porn/insert-sexyjpg
export const $$91porn_InsertSexyjpg = async (tid, sql) => {
    return instance.post('/api/91porn/insert-sexyjpg', { tid, sql })
}