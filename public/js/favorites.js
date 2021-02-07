const favoritesContainer = document.querySelector(".favorites__container");
const favorites = localStorage;

for (let i = 0; i < favorites.length; i++) {
  var favoriteName = localStorage.key(i);
  var favoriteCode = localStorage.getItem(favoriteName);
  var favoriteDiv = document.createElement("a");
  favoriteDiv.classList.add("favorites__item");
  favoriteDiv.setAttribute("href", `/cityhall.html?code=${favoriteCode}`);
  favoriteDiv.textContent = favoriteName;
  favoritesContainer.append(favoriteDiv);
}
