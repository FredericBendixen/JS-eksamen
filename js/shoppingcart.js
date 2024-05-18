const APIKEY = "c2879759b3ba4c1687f5210ee110629b";

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener for the "gameStored" event
  document.addEventListener("gameStored", async function (event) {
    const game = event.detail;
    // Render the stored game onto the shopping cart page
    await renderStoredGame(game);
  });

  async function renderStoredGame(game) {
    if (!game) {
      console.error("Game object is undefined", game);
      return;
    }
    //Checks if all information retrieved is correct
    if (!game || !game.name || !game.background_image || !game.platforms || !game.developers || !game.rating || !game.released) {
      console.error("Invalid game object", game);
      return;
    }
    // Create elements for the stored game
    const gameItemEl = document.createElement("div");
    gameItemEl.className = "col-lg-3 col-md-6 col-sm-12 item";
    // Add styling to the game item
    gameItemEl.style.backgroundColor = "#27292a";
    gameItemEl.style.padding = "30px 15px";
    gameItemEl.style.borderRadius = "23px";
    gameItemEl.style.marginBottom = "30px";
    gameItemEl.style.position = "relative";
    gameItemEl.style.overflow = "hidden";
    

    // Fixed height for the container
    const gameImageContainer = document.createElement("div");
    gameImageContainer.style.width = "100%";
    gameImageContainer.style.height = "250px";
    gameImageContainer.style.overflow = "hidden";

    // Create and style game image element
    const gameImage = document.createElement("img");
    gameImage.src = game.background_image;
    gameImage.alt = `${game.name} image`;
    gameImage.style.borderRadius = "23px"
    gameImage.style.width = "35%";
    gameImage.style.height = "35%";
    gameImage.style.objectFit = "contain";
    gameItemEl.appendChild(gameImage);

    // Create and style game name element
    const gameName = document.createElement("h4");
    gameName.className = "game-name";
    gameName.textContent = game.name;
    gameName.style.fontSize = "20px";
    gameName.style.color = "#C70039";
    gameName.style.marginTop = "20px";
    gameName.style.marginBottom = "0px";
    gameName.style.display = "inline-block";
    // Create and style platforms element
    const platformsSpan = document.createElement("span");
    platformsSpan.className = "platforms";
    // Change game.parent_platforms to game.platforms
    platformsSpan.textContent = await getPlatformStr(game.platforms);
    platformsSpan.style.color = "#900C3F";
    platformsSpan.style.display = "block";
    platformsSpan.style.marginTop = "7px";
    platformsSpan.style.fontWeight = "400";
    gameName.appendChild(document.createElement("br"));
    gameName.appendChild(platformsSpan);
    gameItemEl.appendChild(gameName);

    //Create and style developer details
    const developerSpan = document.createElement("span");
    developerSpan.className = "developer";
    developerSpan.textContent = `Developer: ${game.developers[0].name}`;
    developerSpan.style.color = "900C3F";
    developerSpan.style.display = "block";
    developerSpan.style.marginTop = "7px";
    developerSpan.style.fontWeight = "400";
    gameName.appendChild(developerSpan);

    // Create and style ul element for additional game details
    const ul = document.createElement("ul");
    ul.style.float = "right";
    ul.style.marginTop = "20px";

    const ratingLi = document.createElement("li");
    ratingLi.innerHTML = `&#9733; <span class="rating">${game.rating}</span>`;
    ratingLi.style.textAlign = "right";
    ratingLi.style.color = "#fffa86";
    ratingLi.style.fontSize = "14px";

    const dateLi = document.createElement("li");
    dateLi.innerHTML = `&#128197; <span class="date">${game.released}</span>`;
    dateLi.style.textAlign = "right";
    dateLi.style.color = "#fff";
    dateLi.style.fontSize = "14px";
    // Append rating and date li elements to ul
    ul.appendChild(ratingLi);
    ul.appendChild(dateLi);
    // Append ul to game item element
    gameItemEl.appendChild(ul);

    // Style game item element
    gameItemEl.style.marginBottom = "20px";
    gameItemEl.style.padding = "10px";
    gameItemEl.style.border = "1px solid #ccc";
    gameItemEl.style.borderRadius = "5px";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.style.position = "absolute";
    removeButton.style.top = "10px";
    removeButton.style.right = "10px";
    removeButton.style.backgroundColor = "#C70039";
    removeButton.style.color = "#fff";
    removeButton.style.border = "none";
    removeButton.style.padding = "10px";
    removeButton.style.borderRadius = "5px";
    removeButton.style.cursor = "pointer";
    // makes sure that the button is above other elements
    removeButton.style.zIndex = "1000";
    removeButton.addEventListener("click", () => removeGame(game.id, gameItemEl));
    gameItemEl.appendChild(removeButton);

    // Append the created game item to the cartItems container
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.appendChild(gameItemEl);
  }

  function removeGame(gameId, gameItemEl) {
    const storedGames = JSON.parse(localStorage.getItem("selectedGames")) || {};
    delete storedGames[gameId];
    localStorage.setItem("selectedGames", JSON.stringify(storedGames));
    gameItemEl.remove();
  }

  async function loadStoredGames() {
    try {
      const storedGames =
        JSON.parse(localStorage.getItem("selectedGames")) || {};
      const gameIds = Object.keys(storedGames);
      const gameDetails = await Promise.all(
        gameIds.map((gameId) => fetchGameDetails(gameId))
      );
      gameDetails.forEach((game) => {
        renderStoredGame(game);
      });
    } catch (error) {
      console.error("An error occurred while loading stored games:", error);
    }
  }
  // Find gameId for more info
  async function fetchGameDetails(gameId) {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${APIKEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching game details:", error);
      return null;
    }
  }

  async function getPlatformStr(platforms) {
    const platformStr = platforms.map((pl) => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
      return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
  }

  // Load stored games when the DOM is loaded
  loadStoredGames();
});
