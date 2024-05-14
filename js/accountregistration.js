/* class User {
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
    crudAPIHandler.saveUsersToAPI(newUser);
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

document.getElementById('checkLoginBtn').addEventListener('click', checkLogIn); */

class User {
  constructor(username, password) {
      this.username = username;
      this.password = password;
  }
}

// Function to create a user locally and save to API
async function registerUser(username, password) {
  const newUser = new User(username, password);
  try {
      // Save the user to the API
      await crudAPIHandler.saveUsersToAPI(newUser);

      // Store both username and password in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify({ username, password }));
      return newUser;
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
}
// Function to login using API
async function login(username, password) {
  try {
      const user = await crudAPIHandler.getUserFromAPI(username);
      if (user && user.password === password) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          alert("Login successful!");
      } else {
          alert("Incorrect username or password!");
      }
  } catch (error) {
      console.error('Error logging in:', error);
      throw error;
  }
}

// Function to logout
function logout() {
  sessionStorage.removeItem('currentUser');
  alert("Logout successful!");
}

// Function to check current login status
function checkLogIn() {
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user && user.username) {
          alert(`Logged in as: ${user.username}`);
      } else {
          alert("User object is not formatted correctly.");
      }
  } else {
      alert("No users are logged in.");
  }
}

// Event listeners
document.getElementById('createUserBtn').addEventListener('click', async function() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  try {
      await registerUser(username, password);
  } catch (error) {
      alert('Failed to create user. Please try again.');
  }
});

document.getElementById('loginBtn').addEventListener('click', function() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  login(username, password);
});

document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('checkLoginBtn').addEventListener('click', checkLogIn);
