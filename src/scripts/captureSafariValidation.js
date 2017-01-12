export default function (inputs, errorObj) {
  const formErrors = {
    nameInvalid: 'Name is required',
    emailInvalid: 'Email is required and must be valid',
    pubkeyInvalid: 'Public Key is required - create one first',
    atomsInvalid: 'Atom count must be more than zero'
  }

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      if (inputs[i].classList.contains('cf-name')) {
        errorObj.active = true
        errorObj.message = formErrors.nameInvalid
      }

      if (inputs[i].classList.contains('cf-email')) {
        errorObj.active = true
        errorObj.message = formErrors.emailInvalid
      }

      if (inputs[i].classList.contains('cf-pubkey')) {
        errorObj.active = true
        errorObj.message = formErrors.pubkeyInvalid
      }

      if (inputs[i].classList.contains('cf-atoms')) {
        errorObj.active = true
        errorObj.message = formErrors.atomsInvalid
      }
      inputs[i].focus()
      return false
    }
  }
}
