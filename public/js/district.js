getCityHallFromAPI();

function getCityHallFromAPI() {
  var urlParams = new URL(window.location);
  var cityCode = urlParams.searchParams.get("code");
  var url = `https://etablissements-publics.api.gouv.fr/v3/communes/${cityCode}/mairie`;
  asyncFunction(url);
}

function asyncFunction(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "json";
    request.onload = () => resolve(request.responseText);
    request.onerror = () => reject(request.statusText);
    request.send();
    request.onload = function () {
      var cityHall = request.response;
      populateCityHall(cityHall);
    };
  });
}

function populateCityHall(cityHall) {
  console.log(cityHall["features"][0]["properties"]["adresses"][0]);
  // Title
  var cityHallTitleContainer = document.querySelector(".cityhall__title");
  const cityName = cityHall["features"][0]["properties"]["nom"];

  cityHallTitleContainer.textContent = cityName;

  // Address
  var cityHallAddressContainer = document.querySelector(".cityhall__address");
  var cityHallAddress =
    cityHall["features"][0]["properties"]["adresses"][0]["lignes"][0];
  var cityHallAddressCode =
    cityHall["features"][0]["properties"]["adresses"][0]["codePostal"];

  cityHallAddressContainer.textContent = `${cityHallAddress} ${cityHallAddressCode} Paris`;

  // Google Maps
  var cityHallGoogleMaps = document.querySelector(".cityhall__link");
  var cityHallLatitude =
    cityHall["features"][0]["properties"]["adresses"][0]["coordonnees"][0];
  var cityHallLongitude =
    cityHall["features"][0]["properties"]["adresses"][0]["coordonnees"][1];

  cityHallGoogleMaps.setAttribute(
    "href",
    `https://www.google.fr/maps/@${cityHallLongitude},${cityHallLatitude},15z`
  );

  // Email
  var cityHallEmailContainer = document.querySelector(".cityhall__email");
  var cityHallEmail = cityHall["features"][0]["properties"]["email"];

  cityHallEmailContainer.textContent = cityHallEmail;

  // Telephone
  var cityHallPhoneContainer = document.querySelector(".cityhall__phone");
  var cityHallPhone = cityHall["features"][0]["properties"][
    "telephone"
  ].replaceAll(" ", ".");

  cityHallPhoneContainer.textContent = cityHallPhone;

  // Website
  var cityHallWebsiteContainer = document.querySelector(".cityhall__website");
  var cityHallWebsite = cityHall["features"][0]["properties"]["url"];

  cityHallWebsiteContainer.textContent = cityHallWebsite;
  cityHallWebsiteContainer.setAttribute("href", `${cityHallWebsite}`);

  // Favorites Button
  generateFavoritesButton();
}

getCityHallFromAPI();

// Generate favorites button based on localstorage
function generateFavoritesButton() {
  // Current city name
  var cityName = document.querySelector(".cityhall__title").textContent;

  // Get all cities already in favorites
  var favorites = [];
  for (let i = 0; i < localStorage.length; i++) {
    favorites.push(localStorage.key(i));
  }
  // Button container
  var favoritesButtonContainer = document.querySelector(".cityhall__button");

  if (favorites.includes(cityName)) {
    favoritesButtonContainer.textContent = "Retirer des favoris";
    favoritesButtonContainer.setAttribute("onclick", "removeFromFavorites()");
  } else {
    favoritesButtonContainer.textContent = "Ajouter aux favoris";
    favoritesButtonContainer.setAttribute("onclick", "saveToFavorites()");
  }
}

// Remove item from favorites
function removeFromFavorites() {
  var cityName = document.querySelector(".cityhall__title").textContent;
  localStorage.removeItem(`${cityName}`);
  generateFavoritesButton();
  document.location.reload();
}

// Add city to favorites
function saveToFavorites() {
  var cityName = document.querySelector(".cityhall__title").textContent;
  var urlParams = new URL(window.location);
  var cityCode = urlParams.searchParams.get("code");
  localStorage.setItem(`${cityName}`, `${cityCode}`);
  generateFavoritesButton();
  document.location.reload();
}
