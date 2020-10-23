'use strict';

const box = document.querySelector('.js-text');
const btn = document.querySelector('.js-btn');
const series = document.querySelector('.js-result');
const addFavourites = document.querySelector('.js-favourite');

let seriesResult = [];
let seriesFavourite = [];

// FUNCION PARA OBTENER DATOS DE LA API
function getSerie(ev) {
  ev.preventDefault();
  const serie = box.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${serie}`)
    .then((response) => response.json())
    .then((data) => {
      seriesResult = data;
      paintSerie(); // PINTAMOS LOS RESULTADOS
      listenSerie();
    });
}

// FUNCION PARA PINTAR LOS RESULTADOS EN HTML
function paintSerie() {
  for (let i = 0; i < seriesResult.length; i++) {
    let classFavourite;
    const favoClass = seriesFavourite.indexOf(i);
    const favourite = favoClass !== -1;
    if (favourite === true) {
      classFavourite = 'color-favourite js-fav-item';
    } else {
      classFavourite = '';
    }
    if (favourite) {
      addFavourites.innerHTML += `<li class = "js-fav-item ${classFavourite}" id=${i}><h3 class ="title"> ${seriesResult[i].show.name}</h3>`;
      addFavourites.innerHTML += `<div >`;
      addFavourites.innerHTML += `<img src = ${seriesResult[i].show.image.medium} alt = picture show >`;
      // addFavourites.innerHTML += `</div>`;
      // addFavourites.innerHTML += `</li>`;
    } else {
      series.innerHTML += `<li class = "js-serie-item ${classFavourite}" id=${i}><h3 class ="title"> ${seriesResult[i].show.name}</h3>`;
      series.innerHTML += `<div >`;
      series.innerHTML += `<img src = ${seriesResult[i].show.image.medium} alt = picture show >`;
      series.innerHTML += `</div>`;
      series.innerHTML += `</li>`;
    }
  }
}

//FAVOURITES evento click sobre el "li"

const favouriteSerie = function (event) {
  const clicked = parseInt(event.currentTarget.id);
  const indexFav = seriesFavourite.indexOf(clicked);
  const isFavourite = indexFav !== -1;

  if (isFavourite === false) {
    seriesFavourite.push(clicked);

    console.log(seriesFavourite);
    console.log('lo meto');
  } else {
    seriesFavourite.splice(indexFav, 1);
    console.log('lo quito');
  }
  paintSerie();
  listenSerie();
};

// FUNCION ESCUCHADORA SOBRE CADA UNA DE LAS SERIES DEL RESULTADO DE LA BUSQUEDA
function listenSerie() {
  const seriesItems = document.querySelectorAll('.js-serie-item');
  for (const seriesItem of seriesItems) {
    seriesItem.addEventListener('click', favouriteSerie);
  }
}
// FUNCION ESCUCHADORA SOBRE SERIE FAVORITA
function listenFavs() {
  const favItems = document.querySelectorAll('.js-fav-item');
  for (const favItem of favItems) {
    favItem.addEventListener('click', favouriteSerie);
  }
}

btn.addEventListener('click', getSerie);

paintSerie();
