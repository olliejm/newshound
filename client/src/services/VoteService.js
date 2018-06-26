import Api from '@/services/Api'

export default {
  show (responseId) {
    return Api().get(`vote/${responseId}`)
  },
  update (responseId, vote) {
    return Api().put(`vote/${responseId}`, vote)
  }
}
