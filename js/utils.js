import Character from "./Character.js";

//збереження списку персонажів під певним ключем — для відновлення після оновлення сторінки
export const saveListToSessionStorage = (list, name) => {
    sessionStorage.setItem(name, JSON.stringify(list));
}

//відображення збереженного списку з sessionStorage
export const displaySavedList = (name, render) => {
    const savedList = JSON.parse(sessionStorage.getItem(name));
    if(savedList) render(savedList);
};

//функція для виведення повідомлення користувачу
export const displayMessage = (message, tagName, clName, elementForRender) => {
    if(elementForRender) {
         const mesParagraph = document.createElement(tagName);
        mesParagraph.textContent = message;
        mesParagraph.classList.add(clName);
        elementForRender.replaceChildren(mesParagraph);
    }
};

//функція для відображення елемента
export const showElement = (el) => {
    el.classList.add('visible');
}

//функція для видалення лелементаоадера
export const hideElement = (el) => {
    el.classList.remove('visible');
}

//функція для відображення кнопки "вгору"
export const showBtnTop = (clName, id, elForRender) => {
    if(elForRender) {
        let btnTop = document.querySelector(`.${clName}`);
        if(!btnTop) {
        
            btnTop = document.createElement('a');
            btnTop.textContent = '↑';
            btnTop.href = id;
            btnTop.classList.add(clName);
            elForRender.append(btnTop);
        }
        window.addEventListener('scroll' , () => {
            if(window.scrollY > 300) {
                btnTop.classList.add('visible');
            } else {
                btnTop.classList.remove('visible');
            }
        })
    }
}