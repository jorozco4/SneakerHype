const loginHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
 
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {'Content-Type': 'application/json'}
    })
  

   if (response.ok) {
      document.location.replace('/')
    } else {
      alert("Username or password is incorrect. Please try again.")
    }
  }

document
.querySelector('.login-class')
.addEventListener('submit', loginHandler);