import configuration from './config.js';

const formLogin = document.getElementById('login')

formLogin.addEventListener('submit', event => {
    const email = formLogin.email.value
    const password = formLogin.password.value

    const data = { email, password }

    const options = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        
    }

    event.preventDefault()

    fetch(`${configuration.url}/users/login`, options)
    
    .then( res => {
        console.log(res);
        return res.json()
    })
    .then( data  => {
        
        localStorage.setItem('token', data.token)
        
    })
    .catch( error => {
        
        console.log(error);
    }) 

})