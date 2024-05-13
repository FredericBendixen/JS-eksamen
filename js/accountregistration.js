class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const users = [];

function createUser(username, password) {
    const newUser = new User(username, password);
    users.push(newUser);
}

function registerUser(username, password) {
    const newUser = new User(username, password);
    saveUserToAPI(newUser);
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
  }

function login(username, password) {
    const user = users.find(user => user.username === username);
    if (user) {
        if (user.password === password) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            alert("Innlogging vellykket!");
        } else {
            alert("Feil passord!");
        }
    } else {
        alert("Brukeren eksisterer ikke!");
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    alert("Utlogging vellykket!")
}

function checkLogIn() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user && user.username) {
        alert(`Logget inn som: ${user.username}`);
      } else {
        alert("Brukerobjektet er ikke riktig formatert.");
      }
    } else {
      alert("Ingen brukere er logget inn.");
    }
  }

document.getElementById('createUserBtn').addEventListener('click', function() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    createUser(username, password);
});

document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    login(username, password);
});

document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('checkLoginBtn').addEventListener('click', checkLogIn);