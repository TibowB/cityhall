function getRegionsFromAPI() {
  var url = "https://geo.api.gouv.fr/regions?fields=nom,code";
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
      var regions = request.response;
      populateRegions(regions);
    };
  });
}

function populateRegions(regions) {
  var regionContainer = document.querySelector(".region__container");
  for (let i = 0; i < regions.length; i++) {
    var regionDiv = document.createElement("div");
    var regionCode = regions[i]["code"];

    regionDiv.textContent = regions[i]["nom"];
    regionDiv.setAttribute("onclick", `goToDepartment(${regionCode})`);
    regionDiv.classList.add("region__card");
    regionContainer.append(regionDiv);
  }
}

function goToDepartment(code) {
  // Redirect to city.html for DOM/TOM
  if (code < 10) {
    window.location.href = `/city.html?code=${code}`;
  }
  window.location.href = `/region.html?code=${code}`;
}
// Init
getRegionsFromAPI();
