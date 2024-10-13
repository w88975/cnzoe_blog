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
