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
};

//функція для виведення повідомлення користувачу
export const displayMessage = (message, element, clName,elementForRender) => {
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

//функція для відображення кнопки "вгору"
export const showBtnTop = (clName, id, elForRender) => {
    if(!document.querySelector(`.${clName}`)) {
        
        const btnTop = document.createElement('a');
        btnTop.textContent = '↑';
        btnTop.href = id;
        btnTop.classList.add(clName);
        window.addEventListener('scroll' , () => {
            if(window.scrollY > 300) {
                btnTop.classList.add('visible');
            } else {
                btnTop.classList.remove('visible');
            }
        })
        elForRender.append(btnTop);
    }
    

}