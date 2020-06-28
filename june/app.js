const pageURL = "https://swapi.dev/api/vehicles/?page=";
let currentPage = "";
let heading = document.querySelector("#heading");
let pagination = document.querySelector(".pagination-container");
let mainContainer = document.querySelector(".main-container");
let homeSection = document.querySelector("#home");
let indiSection = document.querySelector("#indi");
let indiContainer = document.querySelector(".indi-vehicle-container");
let favList = document.querySelector(".fav-list");
// helper functions

// hide and show functions

const hide = (element) => {
  element.style.display = "none";
};

const show = (element) => {
  element.style.display = "block";
};

const flex = (element) => {
  element.style.display = "flex";
};

const showLoader = () => {
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("#loader").style.visibility = "visible";
};

const hideLoader = () => {
  document.querySelector("#loader").style.visibility = "hidden";
  document.querySelector("body").style.overflow = "scroll";
};
// change inner text cotent function

const changehtml = (element, newtext) => {
  element.innerHTML = "";
  element.innerHTML = newtext;
};

// My fetch function for list of all vehiclessss
const getPage = (pageNumber) => {
  showLoader();
  fetch(`${pageURL}${pageNumber}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let vehicleList = res.results;

      renderVehicles(vehicleList);
      changehtml(heading, "List of Vehicles");
      show(heading);
      flex(pagination);

      currentPage = pageNumber;
      hideLoader();
    })
    .catch((err) => {
      alert(`Error:${err}`);
    });
};

// Function to render list of vehiclessssss

const renderVehicles = (vehicleList) => {
  window.location.hash = "#home";
  hide(indiSection);
  show(homeSection);
  mainContainer.innerHTML = "";

  for (vehicle of vehicleList) {
    let classI = "fas fa-heart fav-but add-fav-button";
    // let lists = [];
    lists = document.querySelectorAll(".in-fav");

    // let boolean = lists.some((list) => {
    //   return list.getAttribute("id") === vehicle.url;
    // });

    // if (boolean) {
    //   classI = "fas fa-trash fav-but remove-fav-button";
    // }
    for (list of lists) {
      if (list.getAttribute("id") === vehicle.url) {
        classI = "fas fa-trash fav-but remove-fav-button";
      }
    }

    mainContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="vehicle-card" name="${vehicle.name}" id="${vehicle.url}">
    <div class="add-fav">
      
      <i class="${classI}" ></i>
    </div>
    <p class="vehicle-name-p">
      Vehicle Name: <span class="vehicle-name-span">${vehicle.name}</span>
    </p>
    <p class="model-name-p">
      Model Name: <span class="model-name-span">${vehicle.model}</span>
    </p>
    <p class="manu-name-p">
      Manufacturer: <span class="model-name-span">${vehicle.manufacturer}</span>
    </p>
    </div>
    `
    );
  }

  favourites();
};

// function tht adds and deletes active class on page numbers when they are slected accordingly
const activePage = (pageNumber) => {
  let allPages = document.querySelectorAll(".page-number");
  for (page of allPages) {
    page.classList.remove("active-page");
  }
  activeNow = `.page-number-${pageNumber}`;

  let activePageDiv = document.querySelector(activeNow);
  activePageDiv.classList.add("active-page");
};

// adding funcitons for pagination

const allPages = document.querySelectorAll(".page-number");

for (let page of allPages) {
  page.addEventListener("click", (event) => {
    let clicked = event.target;

    getPage(clicked.innerHTML);
    activePage(clicked.innerHTML);
  });
}

// this function loads when the app loads each time

const init = () => {
  if (window.location.hash === "#home") {
    getPage(currentPage);
  }
  getPage(1);

  activePage(1);
};

init();

// adding function to load my inidividual vehicle cardssssss

mainContainer.addEventListener("click", () => {
  if (event.target.matches(".add-fav-button, .remove-fav-button") === true) {
    return;
  }
  let clicked = event.target.matches(".vehicle-card , .vehicle-card *");
  if (clicked === true) {
    let vehicleCard = event.target.closest(".vehicle-card");
    indiURL = vehicleCard.getAttribute("id");

    getIndiPage(indiURL);
  }
});

const getIndiPage = (indiURL) => {
  showLoader();
  fetch(indiURL)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let indiList = res;

      renderIndiHtml(indiList);
      hideLoader();
    })
    .catch((err) => {
      alert(`Error:${err}`);
    });
};

// Fntion to render  my inidividuabl pages

var renderIndiHtml = (indiList) => {
  window.location.hash = `${indiList.url.replace(
    "http://swapi.dev/api/vehicles/",
    "#indi"
  )}`;

  hide(homeSection);
  show(indiSection);
  indiContainer.innerHTML = "";
  indiContainer.insertAdjacentHTML(
    "beforeend",

    `
    <i class="fas fa-chevron-circle-left back-button"></i>
    <div id="heading">${indiList.name}</div>
    <div class="vehicle-details">
          <div class="indi-vehicle-detail indi-vehicle-name">
            <p class="vehicle-name-p">
              Vehicle Name: <span class="model-name-span">${indiList.name}</span>
            </p>
          </div>
          <div class="indi-vehicle-detail indi-vehicle-length">
            <p class="manu-name-p">
              Vehicle Length: <span class="model-name-span">${indiList.length}</span>
            </p>
          </div>
          <div class="indi-vehicle-detail indi-vehicle-model">
            <p class="manu-name-p">
              Vehicle Model: <span class="model-name-span">${indiList.model}</span>
            </p>
          </div>
          <div class="indi-vehicle-detail indi-vehicle-crew">
            <p class="manu-name-p">
              Vehicle Crew: <span class="model-name-span">${indiList.crew}</span>
            </p>
          </div>
          <div class="indi-vehicle-detail indi-vehicle-manu">
            <p class="manu-name-p">
              Vehicle Manufacturer:
              <span class="model-name-span">${indiList.manufacturer}</span>
            </p>
          </div>
          <div class="indi-vehicle-detail indi-vehicle-cost">
            <p class="manu-name-p">
              Vehicle Cost:
              <span class="model-name-span"
                >${indiList.cost_in_credits}</span
              >
            </p>
          </div>
        </div>
        <!-- vehicle details container ends herererere -->

        <!-- movie apaearance container starts hererer -->

        <div class="appearance">
          <div><h2>Movie Appearances:</h2></div>
          <div class="apprearance-list"></div>
        </div>
    
    `
  );
  back();
  let films = indiList.films;
  for (let film of films) {
    nameCall(film);
  }
};

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#home") {
    getPage(currentPage);
  } else if (window.location.hash.slice(0, 5) === "#indi") {
    let url = window.location.hash.replace(
      "#indi",
      "http://swapi.dev/api/vehicles/"
    );
    getIndiPage(url);
  }
});
// api call to get film name

const nameCall = (url) => {
  showLoader();
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let filmdata = res;
      filmRender(filmdata.title);
      hideLoader();
    })
    .catch((err) => {
      alert(`Error: ${err}`);
    });
};

// renders films it appeared in

const filmRender = (name) => {
  document
    .querySelector(".apprearance-list")
    .insertAdjacentHTML("beforeend", `<h3>${name}</h3>`);
};

const back = () => {
  document.querySelector(".back-button").addEventListener("click", () => {
    window.location.hash = "#home";
    getPage(currentPage);
  });
};

// features adding to my favourite functionality

document.querySelector(".favourites").addEventListener("mouseover", () => {
  let favList = document.querySelector(".fav-list");
  show(favList);
});

document.querySelector(".favourites").addEventListener("mouseout", () => {
  let favList = document.querySelector(".fav-list");
  hide(favList);
});

// function that adds my favourites to the list

const addFavToList = (name, id) => {
  favList.insertAdjacentHTML(
    "beforeend",
    `
  <div class="in-fav" id="${id}">${name}</div>
  `
  );

  let lists = document.querySelectorAll(".in-fav");
  for (list of lists) {
    list.addEventListener("click", (event) => {
      id = event.target.getAttribute("id");
      getIndiPage(id);
    });
  }
};

const favourites = () => {
  let allButtons = document.querySelectorAll(".fav-but");
  for (but of allButtons) {
    but.addEventListener("click", (event) => {
      let itsClass = event.target.getAttribute("class");
      if (itsClass === "fas fa-heart fav-but add-fav-button") {
        event.target.className = "fas fa-trash fav-but remove-fav-button";
        let parent = event.target.closest(".vehicle-card");
        let name = parent.getAttribute("name");
        let id = parent.getAttribute("id");
        addFavToList(name, id);
      } else {
        event.target.className = "fas fa-heart fav-but add-fav-button";
        let parent = event.target.closest(".vehicle-card");
        let id = parent.getAttribute("id");
        let lists = document.querySelectorAll(".in-fav");
        for (list of lists) {
          let listId = list.getAttribute("id");
          if (listId === id) {
            list.remove();
          }
        }
      }
    });
  }
};
