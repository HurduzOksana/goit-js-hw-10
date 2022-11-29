import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

// // Робио доступ до елементів
const countryInput = document.querySelector(`#search-box`);
const countryList = document.querySelector(`.country-list`);
const countryInfo = document.querySelector(`.country-info`);

// // Вішаємо слухача подію інпуту та додаємо затримку
countryInput.addEventListener(`input`, debounce(onSearch,DEBOUNCE_DELAY));



// // Функція пошуку країни
function onSearch(event) {
    // Дістаємо значення інпуту
    let searchQuery = event.target.value.trim();
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

    fetchCountries(searchQuery)   
        .then((countries) => {
            if (countries.length === 1) {
                
                renderCountryCard(countries)
            } else if (countries.length >= 10) {
               
                onFetchWarning()
            } else if (countries.length >= 2 && countries.length < 10) {

                renderCountryList(countries)
            }
        })

        .catch(onFetchError)
}

// // Функція відмалювання в HTML списку країн
function renderCountryList(countries) {
    const markup = countries
    .map((country) => {
    return `<li class="country_list_elements">
    <img class="flags" src="${country.flags.svg}">
    <p class="country_title_list"> ${country.name.official}</p>
    </li>`
    })
    .join("");
    countryList.innerHTML = markup;
}

// // Функція відмалювання в HTML картки країни
function renderCountryCard(countries) {
    const markup = countries
    .map((country) => {
        return `<div>
        <img class="flags" src="${country.flags.svg}">
          <h2 class ="country_title"> ${country.name.official}</h2>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        </div>`;
    })
    .join("");
  countryInfo.innerHTML = markup;
}


// // Функція якщо помилка - країну не знайдено
function onFetchError(error) {
    Notify.failure(`Oops, there is no country with that name`);
}

// // Функція якщо надто багато співпадінь
function onFetchWarning(warning) {
    Notify.warning(`Too many matches found. Please enter a more specific name.`);
}
















    


