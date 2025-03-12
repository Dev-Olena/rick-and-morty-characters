import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";
import * as utils from "./js/utils.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character';

//отримуємо доступ до елементів
const charactersList = document.querySelector('#list');
const loader = document.querySelector('#loader');
const btnMore = document.querySelector('#btn-more');
const search = document.querySelector('.input');

//створюємо екземпляр APIHandler з базовою url
const api = new APIHandler(BASE_URL);
const quantityForHomePage = 4;

//змінна для відстеження першого натискання по кнопці See more
let isFirstLoad = true;

//додаємо обробник події на клік по кнопці See more
btnMore.addEventListener('click', displayAllCharacters);

//додаємо обробник події на поле пошуку
search.addEventListener('input', displaySearchResult);
// search.addEventListener('search', () => {
//     charactersList.innerHTML='';
//     btnMore.hidden = false;
//     displayCharacters();
// });


// функція для відображення збережених або рандомних персонажів
async function displayCharacters() {
    try {
        utils.showElement(loader);

        //перевіряємо наявність збережених карток в sessionStorage
        const savedResults = sessionStorage.getItem('charactersList');
      
        

        if(savedResults) {
            utils.displaySavedList('charactersList', renderCharacterCards);
        } else {
            const charactersArray = await api.getRandomCharacters(quantityForHomePage);

            renderCharacterCards(charactersArray);
        }
    } catch (error) {
        console.log(error)
    } finally {
        utils.removeElement(loader);
    }
}

//функція для відображення всіх персонажів з пагінацією
async function displayAllCharacters() {
    try {
        utils.showElement(loader);
        //очищаємо список лише при першому натисканні кнопки See more
        if(isFirstLoad) {
            charactersList.innerHTML= '';
            isFirstLoad = false;
        }

        const charactersArray = await api.getAllCharacters();

        if(charactersArray.length){
            renderCharacterCards(charactersArray);
            //зберігаємо результати в sessionStorage
            utils.saveListToSessionStorage(charactersArray, 'charactersList');  
        } 
    } catch (error) {
        console.log(error)
    } finally {
        utils.removeElement(loader);
        //ховаємо кнопку See more коли завантажилась остання сторінка з персонажами
        if(api.nextPageUrl === null) {
            btnMore.hidden = true;
        }
    }
}

//функція для відображення результатів пошуку
async function displaySearchResult () {
    try {
        const request = search.value.trim();
        //перевірка на порожній рядок
        if(request) {
            //очищаємо попередній список персонажів
            charactersList.innerHTML= '';

            utils.showElement(loader);

            const name = request.toLowerCase();
            console.log(request)

            //передаємо значення введене в поле пошуку в метод пошуку персонажів за ім'ям
            const charactersArray= await api.getCharactersByName(name);
           
            if(charactersArray.length) {
                //передаємо масив даних отриманих з API до функції для створення та відображення карток
                renderCharacterCards(charactersArray);

                //зберігаємо список персонажів в sessionStorage
                utils.saveListToSessionStorage(charactersArray, 'charactersList');
            } else {
                utils.displayMessage('No results. Please, try again.', 'p', 'message', charactersList);
                btnMore.hidden = true;
            }
        }
    } catch (error) {
        console.log(error)
    }finally {
        utils.removeElement(loader);
    }
}

//функція для створення та відображення карток персонажів 
const renderCharacterCards = (dataArray) => {      
    const cards = dataArray.map(data => {
        const character = new Character(data);
        return character.render();
    });
    //відображаємо картки в charactersList
    charactersList.append(...cards);
}

displayCharacters()



