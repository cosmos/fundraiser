const { Client } = require('cosmos-fundraiser')
const client = Client(process.env.COSMOS_API_URI)

const emptyUser = {
  displayName: '',
  email: '',
  photoUrl: '',
  uid: '',
  signedIn: false
}

const state = {
  request: '',
  user: JSON.parse(JSON.stringify(emptyUser)),
  client
}

const mutations = {
  signIn (state, user) {
    state.user = user
    state.user.signedIn = true
    console.log('signed in')
  },
  signOut (state) {
    state.user = JSON.parse(JSON.stringify(emptyUser))
    console.log('signed out')
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
  }
}

function loginRedirect (commit, sessionRequest, router) {
  if (sessionRequest) {
    router.push(sessionRequest)
    commit('setSessionRequest', '')
  } else {
    router.push('/')
  }
}

const actions = {
  signUp ({ commit, getters }, { user, router }) {
    client.register(user, (err) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Signup Error',
          body: 'An error occurred while signing up'
        })
      }
      commit('signIn', user)
      commit('notifySignUp')
      loginRedirect(commit, getters.sessionRequest, router)
    })
  },
  signIn ({ commit, getters }, { user, router }) {
    client.login(user, (err, user) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Login Error',
          body: 'Invalid login'
        })
      }
      commit('signIn', user)
      commit('notifySignIn', user)
      loginRedirect(commit, getters.sessionRequest, router)
    })
  },
  signOut ({ commit }, router) {
    client.logout((err) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Logout Error',
          body: 'Could not log out'
        })
      }
      commit('signOut')
      commit('notifySignOut')
      router.push('/')
    })
  },
  setSessionUserDisplayName ({ commit }, name) {
    client.updateName(name, (err) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Update Error',
          body: 'An error occurred while updating your display name'
        })
      }
      commit('setSessionUserDisplayName', name)
      commit('notifyCustom', {
        title: 'Display Name Updated',
        body: `Your display name has been succesfully changed to "${name}".`
      })
    })
  },
  setSessionUserEmail ({ commit }, email) {
    client.updateEmail(email, (err) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Update Error',
          body: 'An error occurred while updating your email address'
        })
      }
      commit('setSessionUserEmail', email)
      commit('notifyCustom', {
        title: 'Email Updated',
        body: `Your email has been succesfully changed to "${email}".`
      })
    })
  },
  setSessionUserPassword ({ commit }, password) {
    client.updatePassword(password, (err) => {
      if (err) {
        console.error(err)
        return commit('notifyError', {
          title: 'Update Error',
          body: 'An error occurred while updating your password'
        })
      }
      commit('notifyCustom', {
        title: 'Password Updated',
        body: 'Your password has been succesfully changed.'
      })
    })
  },
  submitBtcDonationWallet ({ commit, getters }, cb) {
    let { encryptedSeed } = getters.btcDonation
    client.backupWallet(encryptedSeed, (err) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Wallet Backup Error',
          body: 'An error occurred while backing up your wallet.'
        })
        if (cb) cb(err)
      }
      commit('notifyCustom', {
        title: 'Wallet Backed Up',
        body: 'Your encrypted wallet is now backed up in the Cosmos Fundraiser database.'
      })
      if (cb) cb(null)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
