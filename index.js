import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character';

//отримуємо доступ до елементів
const charactersList = document.querySelector('#list');
const loader = document.querySelector('#loader');
const btnAll = document.querySelector('#btn-all');
const btnBlock = document.querySelector('.button-block');



//створюємо екземпляр APIHandler з базовою url
const api = new APIHandler(BASE_URL);
const quantityForHomePage = 4;


//додаємо обробник події на клік по кнопці See all
btnAll.addEventListener('click', displayAllCharacters);


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

async function displayAllCharacters() {
    charactersList.innerHTML= '';
    showLoader();
    const charactersArray = await api.getAllCharacters();
    const cards = charactersArray.map(characterData => {
        const character = new Character(characterData);
        return character.render();
    });
    removeLoader();
    charactersList.append(...cards);
    btnBlock.innerHTML = ""
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



