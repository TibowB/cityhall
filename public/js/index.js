getRegionsFromAPI();

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
    implementRegionElement(regionDiv, regionContainer, regionCode, regions, i);
  }
}

function implementRegionElement(
  regionDiv,
  regionContainer,
  regionCode,
  regions,
  index
) {
  regionDiv.textContent = regions[index]["nom"];
  regionDiv.classList.add("region__card");
  regionDiv.setAttribute("onclick", `goToDepartment(${regionCode})`);
  regionDiv.classList.add("region__card");
  regionContainer.append(regionDiv);
}

// Redirect to city.html for DOM/TOM
function goToDepartment(code) {
  code < 10
    ? (window.location.href = `/city.html?code=${code}`)
    : (window.location.href = `/department.html?code=${code}`);
}
