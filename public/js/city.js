getCitiesFromAPI();

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
    var cityCode = cities[i]["code"].toString();
    // Check for Corsica
    if (cityCode.startsWith("2A") || cityCode.startsWith("2B")) {
      cityDiv.setAttribute("data-city", `${cityCode}`);
      cityDiv.setAttribute("onclick", `goToCorsicaCityHall()`);
    } else {
      var cityCode = parseInt(cities[i]["code"]);
      cityDiv.setAttribute("onclick", `goToCityHall(${cityCode})`);
    }

    cityDiv.textContent = cities[i]["nom"];
    cityDiv.classList.add("city__card");
    cityContainer.append(cityDiv);
  }
}

function goToCityHall(code) {
  var code = code.toString();
  if (code.length === 4) {
    code = "0" + code;
  }
  window.location.href = `/cityhall.html?code=${code}`;
}

// Special function for Corsica
// 2A and 2B created a bug
function goToCorsicaCityHall() {
  var code = event.target.dataset.city;
  window.location.href = `/cityhall.html?code=${code}`;
}
