import Api from '@/services/Api'

export default {
  index (postId) {
    return Api().get(`/posts/${postId}/responses`)
  },
  post (postId, response) {
    return Api().post(`/posts/${postId}/responses`, response)
  }
}
