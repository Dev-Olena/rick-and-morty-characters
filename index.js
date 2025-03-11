import APIHandler from "./js/APIHandler.js";
import Character from "./js/Character.js";


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
        showLoader();

        //перевіряємо наявність збережених карток в localStorage
        const savedResults = localStorage.getItem('charactersList');
        if(savedResults) {
            displaySavedCharacters();
        } else {
            const charactersArray = await api.getRandomCharacters(quantityForHomePage);
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
    }
}

//функція для відображення всіх персонажів з пагінацією
async function displayAllCharacters() {
    try {
        showLoader();
        //очищаємо список лише при першому натисканні кнопки See more
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

            //зберігаємо результати в localStorage
            saveCharacters(charactersArray);
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoader();
        //ховаємо кнопку See more коли завантажилась остання сторінка з персонажами
        if(api.nextPageUrl === null) {
            btnMore.hidden = true;
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

//функція для відображення результатів пошуку
async function displaySearchResult () {
    try {
        const request = search.value;
        //перевірка на порожній рядок
        if(request.trim()) {
            //очищаємо попередній список персонажів
            charactersList.innerHTML= '';

            showLoader();
            const name = request.toLowerCase().trim();
            console.log(request)

            //передаємо значення введене в поле пошуку в метод пошуку персонажів за ім'ям
            const charactersArray= await api.getCharactersByName(name);

            //перевіряємо чи масив даних не є порожнім
            if(charactersArray.length) {
                
                const cards = charactersArray.map(characterData => {
                    const character = new Character(characterData);
                    return character.render();
                });

                //відображаємо картки в charactersList
                charactersList.append(...cards);

                //зберігаємо список в localStorage
                saveCharacters(charactersArray);
            } else {
                displayMessage('No results. Please, try again.')
            }
    }
    } catch (error) {
        console.log(error)
    }finally {
        removeLoader();
    }
}

//функція для виведення повідомлення користувачу
const displayMessage = (message) => {
    const mesParagraph = document.createElement('p');
    mesParagraph.textContent = message;
    mesParagraph.classList.add('message');
    charactersList.replaceChildren(mesParagraph);
    btnMore.hidden = true;
}

//функція для збереження списку персонажів
// const saveCharacters = () => {
//     localStorage.setItem('charactersList', cards);
// }
const saveCharacters = (list) => {
    //масив перетворюємо на JSON перед збереженням
    localStorage.setItem('charactersList', JSON.stringify(list));
}

//функція для відображення збереженного списку персонажів
const displaySavedCharacters = () => {
    const savedList = JSON.parse(localStorage.getItem('charactersList'));
    const cards = savedList.map(characterData => {
        const character = new Character(characterData);
        return character.render();
    });
    //відображаємо картки в charactersList
    charactersList.append(...cards);
    console.log(savedList)

}

displayCharacters()



