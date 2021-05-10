getDistrictsFromAPI();

function getDistrictsFromAPI() {
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
      var districts = request.response[0]["codesPostaux"];
      populateDistricts(districts);
    };
  });
}

function populateDistricts(districts) {
  var districtContainer = document.querySelector(".district__container");
  for (let i = 0; i < districts.length; i++) {
    var districtDiv = document.createElement("div");
    var districtCode = districts[i];
    implementDistrictElement(districtDiv, districtContainer, districtCode);
  }
}

function implementDistrictElement(
  districtDiv,
  districtContainer,
  districtCode
) {
  districtDiv.textContent = districtCode;
  districtDiv.setAttribute("onclick", `goToCityHall(${districtCode})`);
  districtDiv.classList.add("district__card");
  districtContainer.append(districtDiv);
}

function goToCityHall(code) {
  var codeToString = code.toString();
  window.location.href = `/district.html?code=751${codeToString.slice(-2)}`;
}
