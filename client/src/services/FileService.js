import Api from '@/services/Api'

export default {
  avatarUri (userId) {
    return Api().get(`users/${userId}/avatar`)
  },
  responseUri (responseId) {
    return Api().post(`responses/${responseId}/file`)
  }
}
