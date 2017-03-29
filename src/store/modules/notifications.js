const state = [
  {
    icon: 'sign-out',
    title: 'Temporary Notification',
    body: 'Just a test.',
    time: 1485839462000
  },
  {
    icon: 'smile-o',
    title: 'Permanent Notification',
    body: 'Just a test.',
    time: 1485833462000
  }
]

const mutations = {
  notifyCustom (state, data) {
    let note = data
    note.icon = 'check-circle'
    note.time = Date.now()
    state.push(note)
    // console.log('notifyCustom', note)
  },
  notifyWarn (state, data) {
    let note = data
    note.icon = 'bell'
    note.time = Date.now()
    note.type = 'warn'
    state.push(note)
    // console.log('notifyError', note)
  },
  notifyError (state, data) {
    let note = data
    note.icon = 'exclamation-triangle'
    note.time = Date.now()
    note.layout = 'alert'
    note.type = 'error'
    state.push(note)
    // console.log('notifyError', note)
  }
}

export default {
  state,
  mutations
}
