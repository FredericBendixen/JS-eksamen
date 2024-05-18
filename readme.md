# Gokstad Games shop

## Information about our services:
### Welcome to the not so official Gokstad Academy games shop! Here you can find games from the start of 2024 until the 16th of may!
### Just click buy and the games will automatically be placed in your shopping cart where you can accsess a little more information about your selected titles.

## API's Used =
### [RAWG API](https://rawg.io/) and [CrudCrud](https://www.crudcrud.com/).

## Features and how it works =
- A easy to use store front
    - Here you can find games and a little information about the game you want to purchase.
    - When you are clicking "buy" the game will be stored in the browsers localStorage capabilities and will then be accessible in the Shopping Cart page.
- A sorted shopping cart
    - Here the games you want to purchase will be displayed by order of which game was "purchased" first, and you can see developer information.
- A login page
    - Here you can make an user and the information will be stored in both the CrudCrud API and in the browsers sessionStorage.
    - The login function works through checking the stored information about the user that was created, and then verifying if the input value is correct when attempting to log in.
    - The sign out button works through removing the current user from the sessionStorage and alerting if no user is currently logged in.
    - The Check login status works through checking the username that is stored in the sessionStorage and displaying the name if it is there.

## Installation
- Clone the repository
    -  git clone https://github.com/FredericBendixen/JS-eksamen
- Get a API key from rawg.io to get accsess to the api's features.
- Create and check CrudCrud api endpoint.

## Created by Frederic Næss Bendixen