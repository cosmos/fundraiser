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
  signIn (state, data) {
    state.user.email = data.email
    state.user.password = data.password
    state.user.signedIn = true
    console.log('signed in')
  },
  signOut (state) {
    state.user = JSON.parse(JSON.stringify(emptyUser))
    console.log('signed out')
  },
  signUp (state, data) {
    state.user.displayName = data.displayName
    state.user.email = data.email
    state.user.password = data.password
    state.user.signedIn = true
    console.log('signed up')
  },
  sendPasswordResetEmail (state, email) {
    console.log('TODO: send password reset email')
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
