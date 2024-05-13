const apiURL = 'https://crudcrud.com/api/ce930c17c22848b7b7e6ce9a009c48cc';

const registerBtn = document.getElementById('registerBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const responseInfo = document.getElementById('responseInfo');

window.onload = async function () {
    await fetchAccounts();
    await fetchOtherResources();
};

registerBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if(username && password) {
        try{
            const userData = { username, password };
            const response = await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });
            const responseData = await response.json();
            responseInfo.textContent = JSON.stringify(responseData);
            usernameInput.value = '';
            passwordInput.value = '';
            await fetchAccounts();
        } catch (error) {
            console.error('Failed registering account', error);
        }
    } else {
        alert('Username and password are required');
    }
});

async function fetchAccounts() {
    try {
        const response = await fetch(apiURL);
        const accounts = await response.json();
        // Here you can choose to do something with the accounts data if needed
    } catch (error) {
        console.error('Failed fetching accounts', error);
    }
}