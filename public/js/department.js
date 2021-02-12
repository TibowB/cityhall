getDepartmentsFromAPI();

function getDepartmentsFromAPI() {
  var urlParams = new URL(window.location);
  var regionCode = urlParams.searchParams.get("code");
  if (regionCode < 10) {
    regionCode = "0" + regionCode;
  }
  var url = `https://geo.api.gouv.fr/regions/${regionCode}/departements?fields=nom,code`;
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
      var departments = request.response;
      if (departments.length === 1) {
        goToCity(departments[0]["code"]);
      }
      populateDepartments(departments);
    };
  });
}

function populateDepartments(departments) {
  var departmentContainer = document.querySelector(".department__container");

  for (let i = 0; i < departments.length; i++) {
    var departmentDiv = document.createElement("div");
    var departmentCode = departments[i]["code"].toString();

    departmentDiv.textContent = departments[i]["nom"];
    if (departmentCode === "2A" || departmentCode === "2B") {
      departmentDiv.setAttribute("data-department", `${departmentCode}`);
      departmentDiv.setAttribute("onclick", `goToCorsicaCity()`);
    } else {
      departmentDiv.setAttribute("onclick", `goToCity(${departmentCode})`);
    }
    departmentDiv.classList.add("department__card");
    departmentContainer.append(departmentDiv);
  }
}

function goToCity(code) {
  // Checking for Paris
  var codeToString = code.toString();
  if (codeToString.slice(0, 2) === "75") {
    window.location.href = `/paris.html?code=${code}`;
  } else {
    window.location.href = `/city.html?code=${code}`;
  }
}

// Special function for Corsica
// 2A and 2B created a bug
function goToCorsicaCity() {
  var code = event.target.dataset.department;
  window.location.href = `/city.html?code=${code}`;
}
