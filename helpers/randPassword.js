module.exports = genPassword = digit =>{
    const char = '1234567890qwertyuiopasdfghjklzxcvbnm'
    let password = ''
    for (let i = 0; i < digit; i++) {
        password += char[Math.floor(Math.random()*char.length)]
    }
    return password
}