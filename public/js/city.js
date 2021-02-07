function getCitiesFromAPI() {
  var urlParams = new URL(window.location);
  var departmentCode = urlParams.searchParams.get("code");
  if (departmentCode < 10) {
    departmentCode = "0" + departmentCode;
  }
  var url = `https://geo.api.gouv.fr/departements/${departmentCode}/communes`;
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
      var cities = request.response;
      populateCities(cities);
    };
  });
}

function populateCities(cities) {
  var cityContainer = document.querySelector(".city__container");
  for (let i = 0; i < cities.length; i++) {
    var cityDiv = document.createElement("div");
    var cityCode = cities[i]["code"];

    cityDiv.textContent = cities[i]["nom"];
    cityDiv.setAttribute("onclick", `goToCityHall(${cityCode})`);
    cityDiv.classList.add("city__card");
    cityContainer.append(cityDiv);
  }
}

getCitiesFromAPI();

function goToCityHall(code) {
  window.location.href = `/cityhall.html?code=${code}`;
}
