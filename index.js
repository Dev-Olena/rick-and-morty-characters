import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character';

//отримуємо доступ до елементів
const charactersList = document.querySelector('#list');
const loader = document.querySelector('#loader');
const btnMore = document.querySelector('#btn-more');


//створюємо екземпляр APIHandler з базовою url
const api = new APIHandler(BASE_URL);
const quantityForHomePage = 4;

//змінна для відстеження першого натискання по кнопці See more
let isFirstLoad = true;

//додаємо обробник події на клік по кнопці See more
btnMore.addEventListener('click', displayAllCharacters);

// відображення рандомних 4 персонажей при завантаженні застосунку
async function displayCharacters() {
    try {
        showLoader();
        const charactersArray = await api.getRandomCharacters(quantityForHomePage);
        const cards = charactersArray.map(characterData => {
            const character = new Character(characterData);
            return character.render();
        });
        //відображаємо картки в charactersList
        charactersList.append(...cards);
    } catch (error) {
        console.log(error)
    } finally {
        removeLoader();
    }
}

async function displayAllCharacters() {
    try {
        showLoader();
        //очищаємо список лише першому натисканні кнопки See more
        if(isFirstLoad) {
            charactersList.innerHTML= '';
            isFirstLoad = false;
        }

        const charactersArray = await api.getAllCharacters();

        //перевіряємо чи масив даних не є порожнім
        if(charactersArray.length) {
            const cards = charactersArray.map(characterData => {
                const character = new Character(characterData);
                return character.render();
            });
            //відображаємо картки в charactersList
            charactersList.append(...cards);
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoader();
        //ховаємо кнопку See more коли завантажилась остання сторінка з персонажами
        if(api.nextPageUrl === null) {
            btnAll.hidden = true;
        }
    }
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



