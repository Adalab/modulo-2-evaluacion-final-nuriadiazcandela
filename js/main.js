'use strict';

const box = document.querySelector('.js-text');
const btn = document.querySelector('.js-button');
const addFavourites = document.querySelector('.js-favourite');
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const resultSeries = document.querySelector('.js-result');

let seriesResult = [];
let favouriteSeries = [];

// FUNCION PARA OBTENER DATOS DE LA API
function getSeries() {
  let searchinput = box.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchinput}`)
    .then((response) => response.json())
    .then((data) => {
      seriesResult = data;
      paintSerie();
      addListeners();
    });
}

// FUNCION PARA PINTAR LOS RESULTADOS EN HTML
function paintSerie() {
  let seriesCard;
  let i;
  let imageCard;
  resultSeries.innerHTML = '';
  for (i = 0; i < seriesResult.length; i++) {
    if (seriesResult[i].show.image === null) {
      imageCard = defaultImage;
    } else {
      imageCard = seriesResult[i].show.image.medium;
    }
    seriesCard = `<li class="js-serieCard serieCard" id="${seriesResult[i].show.id}">`;
    seriesCard += `<img class = "image" src="${imageCard}" alt="Imagen serie ${seriesResult[i].show.name}">`;
    seriesCard += `<h3>${seriesResult[i].show.name}</h3></li>`;
    resultSeries.innerHTML += seriesCard;
  }
}

function favouritesHandler(ev) {
  addToFavouritesArray(ev); //funcion para añadir favoritos al array
  addFavouriteSection(ev); // funcion para pintar favoritos
}

// FUNCION PARA AÑADIR FAVORITOS AL ARRAY
function addToFavouritesArray(ev) {
  ev.preventDefault();
  const clickedCardId = parseInt(ev.currentTarget.id);
  console.log(clickedCardId);
  const favId = favouriteSeries.findIndex((elemId) => elemId.show.id === clickedCardId);
  console.log(favId);
  if (favId === -1) {
    console.log(favId);
    const favElemnt = seriesResult.find((serie) => serie.show.id === clickedCardId);
    favouriteSeries.push(favElemnt);
    console.log(favElemnt);
  } else {
    alert('Esta serie ya está en favoritos');
    // favouriteSeries.splice(favId, 1);
  }
  updateLocalStorage();
}

// FUNCION PARA PINTAR FAVORITOS
function addFavouriteSection() {
  let seriesFav = '';
  let i;
  let favCard;
  addFavourites.innerHTML = '';
  for (i = 0; i < favouriteSeries.length; i++) {
    if (favouriteSeries[i].show.image === null) {
      favCard = defaultImage;
    } else {
      favCard = favouriteSeries[i].show.image.medium;
    }
    seriesFav += `<li class="js-serieFavCard serieFavCard" id="${favouriteSeries[i].show.id}">`;
    seriesFav += `<img src="${favCard}" alt="Imagen serie ${favouriteSeries[i].show.name}">`;
    seriesFav += `<h3>${favouriteSeries[i].show.name}</h3>`;
    seriesFav += `<button class="js-delete removeButton" id="${favouriteSeries[i].show.id}"> ✖️ </button></li>`;
    addFavourites.innerHTML = seriesFav;
  }
  removeFav();
}

// VACIAR MIS SERIES FAVORITAS
const btnReset = document.querySelector('.js-reset-all');
function resetAll() {
  localStorage.removeItem('favouriteSeries');
  favouriteSeries = [];
  updateLocalStorage();
  addFavouriteSection();
}

// ELIMINAR DE LA LISTA DE FAVORITOS
function resetOneFav(ev) {
  const buttonClickedId = parseInt(ev.currentTarget.id);
  const serieFavouriteId = favouriteSeries.find(
    (favourite) => favourite.show.id === buttonClickedId
  );
  const favIndex = favouriteSeries.indexOf(serieFavouriteId);
  if (favIndex > -1) {
    favouriteSeries.splice(favIndex, 1);
  }
  updateLocalStorage();
  addFavouriteSection();
}

//LOCAL STORAGE
// GUARDAR
const updateLocalStorage = () => {
  const jsonfavouriteSeries = JSON.stringify(favouriteSeries);
  localStorage.setItem('favouriteSeries', jsonfavouriteSeries);
};

// LEER DEL LOCAL STORAGE
const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('favouriteSeries'));
  if (data !== null) {
    favouriteSeries = data;
  }
  addFavouriteSection();
};

//FUNCION ESCUCHADORA, SOBRE QUIEN HAGO EL CLICK PARA AÑADIR A FAVORITOS
function addListeners() {
  let liElem = document.querySelectorAll('.js-serieCard');
  for (const li of liElem) {
    li.addEventListener('click', favouritesHandler);
  }
}

//FUNCION ESCUCHADORA, DE ELIMINAR DE MIS SERIES FAVORITAS LA SELECCIONADA
function removeFav() {
  const btnRemove = document.querySelectorAll('.js-delete');
  for (let removeButton of btnRemove) {
    removeButton.addEventListener('click', resetOneFav);
  }
}

btn.addEventListener('click', getSeries);
btnReset.addEventListener('click', resetAll);

// AL ARRANCAR LA PAGINA
getSeries();
getFromLocalStorage();
