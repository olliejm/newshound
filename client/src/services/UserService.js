import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  show (userId) {
    return Api().get(`users/${userId}`)
  }
}
