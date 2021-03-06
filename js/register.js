//@---------------------- Starts: Parámetros Endpoints ----------------------@//
const baseURL = "https://matter-app.herokuapp.com/api/v1";
const users = "/users";
const skills = "/skills";
const login = "/auth/login";

const getHeaders = {'Accept': 'application/json'};
const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

let status;
//@----------------------- Ends: Parámetros Endpoints -----------------------@//


const check = () => {
  const passwordConfirmation = document.getElementById("password-confirmation");
  if(passwordConfirmation) {
    if (document.getElementById('password').value === passwordConfirmation.value) {
    document.getElementById('message').style.color = 'white';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
  }
}


const register = document.getElementById('register');
if(register) {
  register.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userRegister = {name: name, email: email, password: password};
    // console.log(userRegister);
    postRegister(userRegister);
  })
}


const postRegister = (userRegister) => {
  fetch(`${baseURL}${users}`, {
    method: `POST`,
    headers: headers,
    body: JSON.stringify(userRegister)
  })
  .then(response => {
    status = response.status;
    // console.log(`POST register status: ${status}`);
    if(status !== 201) {
      alert(`Tu registro no se pudo llevar a cabo. Vuelve a intentar!! Error: ${status}`);
      document.getElementById('register').reset()
    };
    return response.json();
  })
  .then(data => showRegister(data))

  const showRegister = (data) => {
    // console.log(data);
    sessionStorage.setItem('authenticated', JSON.stringify({name: data.name, email: data.email}));
    location.replace('../index.html');
  };
}
