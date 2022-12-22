import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;


const refs = {
 searchBox: document.querySelector('#search-box'),
 countryList: document.querySelector('.country-list'),
 countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

function onCountriesFetch(event) {
    const name = event.target.value.trim();
    if (name.length === 0) {
        refs.countryList.innerHTML = '';
      return;
    } else {
      fetchCountries(name)
        .then(showCountries)
        .catch(error)
    }
  };

  function showCountries(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    if (countries.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', DEBOUNCE_DELAY)
    }
    if (countries.length >= 2) {
      ceatemMarkupInfo(countries);
    }
    if (countries.length === 1) {
        createmMarkupList(countries);
    }
  };
  
  function ceatemMarkupInfo(countries) {
    const markupInfo = countries.map(({ name, flags, }) => {
      return `<li><img src="${flags.svg}" alt="Flag of ${name.official}" style="height: 80px; width: 100px"> ${name.official}</li>`
    }).join('');
    refs.countryList.innerHTML = markupInfo;
  };
  
  function createmMarkupList(countries) {
    countries.map(({ name, capital, population, flags, languages }) => {
      const markup =
        `<h1><img src="${flags.svg}" alt="Flag of ${name.official}" style="height: 80px; width: 100px"> ${name.official}</h1>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p>`;
      refs.countryInfo.innerHTML = markup;
    })
  
  }
  function error() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return Notiflix.Notify.failure('Oops, there is no country with that name', DEBOUNCE_DELAY);
  };