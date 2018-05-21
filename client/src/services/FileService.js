import Api from '@/services/Api'

export default {
  avatarUri (userId) {
    return Api().get(`users/${userId}/avatar`)
  },
  responseUri (responseId) {
    return Api().get(`responses/${responseId}/file`)
  }
}
