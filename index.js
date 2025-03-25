import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";
import * as utils from "./js/utils.js";


const BASE_URL = 'https://rickandmortyapi.com/api/character/';

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
//змінна для відстеження активності пошуку
let isSearching = false;


//додаємо обробник події на клік по кнопці See more залежно від результату запиту
const setSeeMoreHandler = () => {
    btnMore.removeEventListener('click', displayAllCharacters);
    btnMore.removeEventListener('click', displaySearchResult);
    if(isSearching) {
        btnMore.addEventListener('click', displaySearchResult);
    }else {
        btnMore.addEventListener('click', displayAllCharacters)
    }
}

//додаємо обробник події на поле пошуку
search.addEventListener('input', displaySearchResult);

//обробник події на очищення поля пошуку
search.addEventListener('search', () => {
    //видаляємо збережені дані з sessionStorage
    sessionStorage.removeItem('charactersList');
    isSearching = false;
    charactersList.innerHTML='';
    //повертаємо користувача до домашньої сторінки з рандомними персонажами
    displayCharacters();
});


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
         //оновлюємо обробник подій для кнопки See more
        setSeeMoreHandler();
    } catch (error) {
        console.log(error)
    } finally {
        utils.hideElement(loader);
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
            //додоємо кнопку "вгору, якщо результатів >=20"
            if(charactersArray.length >= 20) {
                utils.showBtnTop('btnTop', '#top', charactersList);
            }  
        } 
         //оновлюємо обробник подій для кнопки See more
         setSeeMoreHandler();
    } catch (error) {
        console.log(error)
    } finally {
        utils.hideElement(loader);
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
        if(!request) return;

        const name = request.toLowerCase();
        console.log(request)
        //очищаємо попередній список персонажів у разі нового запиту, позначаємо стан пошуку 
        if(api.currentRequest !== name) {
            charactersList.innerHTML= '';
            isSearching = true;
        }
        
        utils.showElement(loader);

        //передаємо значення введене в поле пошуку в метод пошуку персонажів за ім'ям
        const charactersArray= await api.getCharactersByName(name);
        
        if(charactersArray.length) {
            //передаємо масив даних отриманих з API до функції для створення та відображення карток
            renderCharacterCards(charactersArray);

            //зберігаємо список персонажів в sessionStorage
            utils.saveListToSessionStorage(charactersArray,'charactersList');
            
            //додоємо кнопку "вгору", якщо результатів >=20
            if(charactersArray.length >= 20) {
                utils.showBtnTop('btnTop', '#top', charactersList);
            }             
        } else {
            isSearching = false;
            utils.displayMessage('No results. Please, try again.', 'p', 'message', charactersList);
            btnMore.hidden = true;
        }
        //оновлюємо обробник подій для кнопки See more
        setSeeMoreHandler();
    } catch (error) {
        console.log(error)
    }finally {
        utils.hideElement(loader);
        //ховаємо кнопку See more якщо це єдина / остання сторінка
        if(api.nextSearchPageUrl===null) {
            btnMore.hidden = true;
        }
    }
}

//функція для створення та відображення карток персонажів 
const renderCharacterCards = (dataArray) => {      
    const cards = dataArray.map(data => {
        const character = new Character(data);
        return character.render();
    });
    charactersList.append(...cards);
}

displayCharacters();





