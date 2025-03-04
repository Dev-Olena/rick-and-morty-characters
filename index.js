import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character';

const charactersList = document.querySelector('#list');




//створюємо екземпляр APIHandler з базовою url
const api = new APIHandler(BASE_URL);
const quantityForHomePage = 4;


// відображення рандомних 4 персонажей при завантаженні застосунку
async function displayCharacters() {
    const charactersArray = await api.getRandomCharacters(quantityForHomePage);
    charactersArray.map(characterData => {
            const character = new Character(characterData);
            const card = character.render();
            charactersList.append(card)
        })
}

displayCharacters()



