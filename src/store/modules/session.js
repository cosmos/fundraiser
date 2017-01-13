const emptyUser = {
  displayName: '',
  email: '',
  photoUrl: '',
  uid: ''
}

const state = {
  request: '',
  user: JSON.parse(JSON.stringify(emptyUser))
}

const mutations = {
  setSessionRequest (state, url) {
    state.request = url
    // console.log('setting session request', url)
  },
  clearSessionUser (state) {
    state.user = JSON.parse(JSON.stringify(emptyUser))
    // console.log('setting session user')
  },
  setSessionUserDisplayName (state, value) {
    state.user.displayName = value
    // console.log('seting vuex user.displayName', value)
  },
  setSessionUserEmail (state, value) {
    state.user.email = value
  },
  setSessionUserPhotoUrl (state, value) {
    state.user.photoUrl = value
  },
  setSessionUserUid (state, value) {
    state.user.uid = value
  }
}

export default {
  state,
  mutations
}
