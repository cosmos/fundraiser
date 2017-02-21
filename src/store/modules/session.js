const emptyUser = {
  displayName: '',
  email: '',
  photoUrl: '',
  uid: '',
  signedIn: false
}

const state = {
  request: '',
  user: JSON.parse(JSON.stringify(emptyUser))
}

const mutations = {
  signIn (state, value) {
    state.user.email = value
  },
  signOut (state) {
    state.user = JSON.parse(JSON.stringify(emptyUser))
    console.log('signed out')
  },
  setSessionRequest (state, url) {
    if (['/signup', '/signin', '/settings'].includes(url)) {
      state.request = '/'
      console.log(`redirecting ${url} request to home`)
    } else {
      state.request = url
      console.log('setting session request', url)
    }
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
