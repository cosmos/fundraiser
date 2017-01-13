export default function (inputs, errorObj) {
  const formErrors = {
    nameInvalid: 'Name is required',
    emailInvalid: 'Email is required and must be valid',
    selectInvalid: 'Select an option',
    pubkeyInvalid: 'Public Key is required - create one first',
    atomsInvalid: 'Atom count must be more than zero'
  }

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      errorObj.active = true
      if (inputs[i].classList.contains('cf-name')) {
        errorObj.message = formErrors.nameInvalid
      }
      if (inputs[i].classList.contains('cf-email')) {
        errorObj.message = formErrors.emailInvalid
      }
      if (inputs[i].tagName === 'SELECT') {
        errorObj.message = formErrors.selectInvalid
      }
      if (inputs[i].classList.contains('cf-pubkey')) {
        errorObj.message = formErrors.pubkeyInvalid
      }
      if (inputs[i].classList.contains('cf-atoms')) {
        errorObj.message = formErrors.atomsInvalid
      }
      inputs[i].focus()
      return false
    }
  }
}
