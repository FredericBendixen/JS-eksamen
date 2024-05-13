function saveUserToAPI(user) {
    fetch('https://crudcrud.com/api/308d6cebc14e45c08c66531c4828cbf1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('An error occured when storing user.');
        }
        return response.json();
    })
    .then(data => {
        console.log('User stored in API', data);
    })
    .catch(error => {
        console.error('Error:', error)
    });
}