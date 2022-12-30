let nav = document.querySelector('nav');
let footer = document.querySelector('footer');

if(getCurrentUser()) {
    nav.className = "navigation logged-nav";
    nav.innerHTML = `
        <a href="note.html">My Notes</a>
        <a href="about.html" >About</a>
        <a href="profile.html" >My Profile</a>
        <a id="logout-btn" class="button" >Logout</a>
    `

    footer.innerHTML = `
    <img class="footerlogo" src="./images/nottaka_transparent.png" alt="Nottaka Logo">
      <ul class="footer-ul">
          <li>  
                <a href="note.html">My Notes</a>
                <a href="about.html" >About</a>
                <a href="profile.html" >My Profile</a>
          </li>
      </ul>
    `
  } else {
    nav.innerHTML = `
        <a href="register.html">Register</a>
        <a href="login.html" >Login</a>
        <a href="about.html" >About</a>
    `
    footer.innerHTML = `
    <img class="footerlogo" src="./images/nottaka_transparent.png" alt="Nottaka Logo">
      <ul class="footer-ul">
          <li>
              <a href="register.html">Register</a>
          </li>
          <li>
              <a href="login.html">Login</a>
          </li>
          <li>
              <a href="about.html" >About</a>
          </li>
      </ul>
    `
  }

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// getting current user function
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
export function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
}

let logo = document.getElementsByClassName("nottakalogo");
if(logo) logo[0].addEventListener('click', goToHome);

logo = document.getElementsByClassName("footerlogo");
if(logo) logo[0].addEventListener('click', goToHome);

function goToHome(e) {
    e.preventDefault();
    
    window.location.href = "about.html";
}

function getUsers(e) {
    e.preventDefault();

    fetch("http://localhost:3000/users")
    .then((res) => res.json())
   // .then((data) => console.log(data))
    .then((data) => {
        console.log(data);
        let ul = document.getElementById("allUsers");
        data.forEach((user) => {
            let li = document.createElement('li');
            let text = document.createTextNode(user.userName);
            li.appendChild(text);
            ul.appendChild(li);
        })

    }).catch((err) => console.log(`Error! ${err}`));

    document.getElementById("allUsers").innerHTML = '';
}