import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character';

//отримуємо доступ до елементів
const charactersList = document.querySelector('#list');
const loader = document.querySelector('#loader');




//створюємо екземпляр APIHandler з базовою url
const api = new APIHandler(BASE_URL);
const quantityForHomePage = 4;


// відображення рандомних 4 персонажей при завантаженні застосунку
async function displayCharacters() {
    showLoader();
    const charactersArray = await api.getRandomCharacters(quantityForHomePage);
    const cards = charactersArray.map(characterData => {
        const character = new Character(characterData);
        return character.render();
    });
    removeLoader();
    charactersList.append(...cards);
}


//функція для відображення лоадера
const showLoader = () => {
    loader.classList.add('visible');
}

//функція для видалення лоадера
const removeLoader = () => {
    loader.classList.remove('visible');
}




displayCharacters()



