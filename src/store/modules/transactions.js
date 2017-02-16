import firebase from 'firebase'
let ref = firebase.database().ref('transactions')

const state = {
  all: []
}

ref.on('child_added', function (snapshot, prevChildKey) {
  let child = snapshot.val()
  child.id = snapshot.key
  state.all.push(child)
})

ref.on('child_changed', function (snapshot) {
  let newChild = snapshot.val()
  newChild.id = snapshot.key
  let oldChild = state.all.find(c => c.id === newChild.id)
  state.all.splice(state.all.indexOf(oldChild), 1, newChild)
})

ref.on('child_removed', function (snapshot) {
  // console.log('child removed!')
  let child = snapshot.val()
  child.id = snapshot.key
  state.all.splice(state.all.indexOf(child), 1)
})

const mutations = {
  addTransaction (state, transaction) {
    console.log('submitting transaction', transaction)
    ref.push(transaction)
  }
}

export default {
  state,
  mutations
}
