'use strict';

const box = document.querySelector('.js-text');
const btn = document.querySelector('.js-btn');
const series = document.querySelector('.js-result');
const seriesFavourites = document.querySelector('.js-favourite');

let seriesResult = [];
let seriesFavourite = [];

// FUNCION PARA OBTENER DATOS DE LA API
function getSerie() {
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
    // si se encuentra dentro de nuestro array de favoritos, se pinta, si no, se queda vacio
    let classFavourite;
    const favoClass = seriesFavourite.indexOf(i);
    const favourite = favoClass !== -1;
    if (favourite === true) {
      classFavourite = 'color_favourite';
    } else {
      classFavourite = '';
    }

    series.innerHTML += `<li class = "js-serie-item ${classFavourite}" id=${i}><h3> ${seriesResult[i].show.name}  </h3>`;
    series.innerHTML += `<div >`;
    series.innerHTML += `<img src = ${seriesResult[i].show.image.medium} alt = picture show >`;
    series.innerHTML += `</div>`;
    series.innerHTML += `</li>`;
  }
}

//FAVOURITES evento click sobre el "li"

const favouriteSerie = function (event) {
  const clicked = parseInt(event.currentTarget.id);
  const indexFav = seriesFavourite.indexOf(clicked);
  const isFavourite = indexFav !== -1;

  if (isFavourite === false) {
    seriesFavourite.push(clicked);
    console.log('lo meto');
  } else {
    seriesFavourite.splice(indexFav, 1);
    console.log('lo quito');
  }

  paintSerie();
  listenSerie();
  console.log(seriesFavourite);
};

//
function listenSerie() {
  const seriesItems = document.querySelectorAll('.js-serie-item');
  for (const seriesItem of seriesItems) {
    seriesItem.addEventListener('click', favouriteSerie);
  }
}

btn.addEventListener('click', getSerie);
