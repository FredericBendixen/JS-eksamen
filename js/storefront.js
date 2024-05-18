const APIKEY = "c2879759b3ba4c1687f5210ee110629b";

class GameManager {
    constructor() {
        this.gameList = document.getElementById("gamesList");
        this.loadMoreGamesBtn = document.getElementById("showMoreBtn");
        this.loadMoreGamesBtn.style.display = "none";
    }
    
    async loadGames(apiURL) {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            const games = data.results;

            games.forEach(game => {
                this.appendGameToDOM(game);
            });

            if (data.next) {
                this.loadMoreGamesBtn.style.display = "block";
                this.loadMoreGamesBtn.dataset.nextUrl = data.next;
            } else {
                this.loadMoreGamesBtn.style.display = "none";
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    storeSelectedGame(game) {
        let storedGames = JSON.parse(localStorage.getItem('selectedGames')) || {};
        const gameId = game.id;
        storedGames[gameId] = game;
        localStorage.setItem('selectedGames', JSON.stringify(storedGames));
    
        // Trigger custom event indicating game has been stored
        const event = new CustomEvent('gameStored', { detail: game });
        document.dispatchEvent(event);
    }

    createButtonForGame(game) {
        const button = document.createElement('button');
        button.textContent = 'Buy';
        button.style.fontSize = "14px";
        button.style.padding = "5px 5px";
        button.addEventListener('click', () => {
            this.storeSelectedGame(game);
        });
        return button;
    }

    appendGameToDOM(game) {
        const gameItemEl = document.createElement('div');
        gameItemEl.className = 'col-lg-3 col-md-6 col-sm-12 item';
        gameItemEl.style.backgroundColor = "#27292a";
        gameItemEl.style.padding = "30px 15px";
        gameItemEl.style.borderRadius = "23px";
        gameItemEl.style.marginBottom = "30px"; 

        const gameImage = document.createElement('img');
        gameImage.src = game.background_image;
        gameImage.alt = `${game.name} image`;
        gameImage.style.borderRadius = "23px";
        gameImage.style.maxHeight = "250px";
        gameItemEl.appendChild(gameImage);

        const gameName = document.createElement('h4');
        gameName.className = 'game-name';
        gameName.textContent = game.name;
        gameName.style.fontSize = "20px";
        gameName.style.color = "#C70039";
        gameName.style.marginTop = "20px";
        gameName.style.marginBottom = "0px";
        gameName.style.display = "inline-block";
        const platformsSpan = document.createElement('span');
        platformsSpan.className = 'platforms';
        platformsSpan.textContent = this.getPlatformStr(game.parent_platforms);
        platformsSpan.style.color = "#900C3F";
        platformsSpan.style.display = "block";
        platformsSpan.style.marginTop = "7px";
        platformsSpan.style.fontWeight = "400";
        gameName.appendChild(document.createElement('br'));
        gameName.appendChild(platformsSpan);
        gameItemEl.appendChild(gameName);

        const ul = document.createElement('ul');
        ul.style.float = "right";
        ul.style.marginTop = "20px";
        const ratingLi = document.createElement('li');
        ratingLi.innerHTML = `&#9733; <span class="rating">${game.rating}</span>`;
        ratingLi.style.textAlign = "right";
        ratingLi.style.color = "#fffa86";
        ratingLi.style.fontSize = "14px";
        const dateLi = document.createElement('li');
        dateLi.innerHTML = `&#128197; <span class="date">${game.released}</span>`;
        dateLi.style.textAlign = "right";
        dateLi.style.color = "#fff";
        dateLi.style.fontSize = "14px";
        ul.appendChild(ratingLi);
        ul.appendChild(dateLi);
        gameItemEl.appendChild(ul);

        gameItemEl.style.marginBottom = "20px";
        gameItemEl.style.padding = "10px";
        gameItemEl.style.border = "1px solid #ccc";
        gameItemEl.style.borderRadius = "5px";

        // Create a button for storing the selected game
        const storeSelectedGameBtn = this.createButtonForGame(game);
        gameItemEl.appendChild(storeSelectedGameBtn);

        this.gameList.appendChild(gameItemEl);
    }

    getPlatformStr(platforms) {
        const platformStr = platforms.map(pl => pl.platform.name).join(", ");
        if (platformStr.length > 30) {
            return platformStr.substring(0, 30) + "...";
        }
        return platformStr;
    }
}

const gameManager = new GameManager();
const apiURL = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2024-01-01,2024-05-16&ordering=-added`;
gameManager.loadGames(apiURL);

gameManager.loadMoreGamesBtn.addEventListener("click", async () => {
    const nextUrl = gameManager.loadMoreGamesBtn.dataset.nextUrl;
    if (nextUrl) {
        await gameManager.loadGames(nextUrl);
    }
});