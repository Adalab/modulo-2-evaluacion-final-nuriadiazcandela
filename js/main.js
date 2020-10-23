'use strict';

const box = document.querySelector('.js-text');
const btn = document.querySelector('.js-btn');
const series = document.querySelector('.js-result');

let seriesResult = [];
let seriesFavourite = [];

function getSerie() {
  const serie = box.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${serie}`)
    .then((response) => response.json())
    .then((data) => {
      for (const list of data) {
        series.innerHTML += `<li>`;
        series.innerHTML += `<h3> ${list.show.name} </h3>`;
        series.innerHTML += `<img src = ${list.show.image.medium} alt = picture show >`;
        series.innerHTML += `</li>`;
      }
    });
}

btn.addEventListener('click', getSerie);
