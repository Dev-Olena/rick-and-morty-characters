import Character from "./Character.js";

//функція для збереження списку в sessionStorage
export const saveListToSessionStorage = (list, name) => {
    //масив перетворюємо на JSON перед збереженням
    sessionStorage.setItem(name, JSON.stringify(list));
}

//функція для відображення збереженного списку з sessionStorage
export const displaySavedList = (name, render) => {
    const savedList = JSON.parse(sessionStorage.getItem(name));

    render(savedList);
    console.log(savedList);
};

//функція для виведення повідомлення користувачу
export const displayMessage = (message, element, clName,elementForRender) => {
    console.log('displayMessage is called');
    const mesParagraph = document.createElement(element);
    mesParagraph.textContent = message;
    mesParagraph.classList.add(clName);
    elementForRender.replaceChildren(mesParagraph);
};

//функція для відображення елемента
export const showElement = (el) => {
    el.classList.add('visible');
}

//функція для видалення лелементаоадера
export const removeElement = (el) => {
    el.classList.remove('visible');
}
