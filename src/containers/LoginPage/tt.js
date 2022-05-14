const valueInput = { email: 'ss', password: '' }
let string = ''

if (valueInput.email === '' && valueInput.password === '') {
    string = 'btn-signIn active btn-disable'
} else {
    string = 'btn-signIn active'
}
console.log(string)
