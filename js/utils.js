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
        const mesParagraph = createElement(tagName, [clName], {}, message);
        elementForRender.replaceChildren(mesParagraph);
    }
};

//функція для відображення елемента
export const showElement = (el) => {
    el.classList.add('visible');
}

//приховування елемента 
export const hideElement = (el) => {
    el.classList.remove('visible');
}

//відображення кнопки "вгору" при позиції scrollY > 300
export const showBtnTop = (clName, id, elForRender) => {
    if(elForRender) {
        let btnTop = document.querySelector(`.${clName}`);
        if(!btnTop) {   
            btnTop = createElement('a', [clName], {href: id, 'aria-label': 'back to top'}, '↑');  
            elForRender.append(btnTop);
        }
        window.addEventListener('scroll' , () => {
            if(window.scrollY > 300) {
                btnTop.classList.add('visible')
                btnTop.setAttribute('tabIndex', '0');
            } else {
                btnTop.classList.remove('visible');
                btnTop.setAttribute('tabIndex', '-1');
            }
        })
    }
};

//відображення модального вікна з додатковою інформацією про персонажа
export const openDetails = (character) => {
   const {name, status, species, image} = character;

    //перевірка для уникнення повторного відкриття модального вікна
    if(document.querySelector('.modal')) return;

    //створюємо елементи для картки персонажа та надаємо стилі
    const imgEl = createElement('img', ['modal-img'], {src: image, alt: 'character`s image'});
    const nameEl = createElement('h3', ['modal-name'], {}, name);
    const statusEl = createElement('p', [], {}, `Status: ${status}`);
    const speciesEl = createElement('p', [], {}, `Species: ${species}`);
    const closeBtn = createElement('button', ['modal-btn'], {'arai-label': 'close character`s details information'}, 'X');

    //створюємо картку модального вікна, стилізуємо та додаємо дочірні елементи
    const modalCard = createElement('article', ['modal-card'], {}, imgEl, nameEl, statusEl, speciesEl, closeBtn);

    //створюємо елемент Модальне вікно та додаємо до нього картку
    const modal = createElement('div', ['modal'], {}, modalCard);

    //додаємо модальне вікно на сторінку
    document.body.append(modal);

    //закриття модального вікна по кліку на closeBtn
    closeBtn.addEventListener('click', () => {
        modal.remove()
    })

    //закриття модального вікна по кліку поза карткою
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//функція для побудови url наступної сторінки з врахуванням параметру пошуку 
export const buildNextSearchUrl = (paramName, param, url) => {
    try {
       //створюємо об'єкт URL для отриамння доступу до його параметрів та їх зміни
        const nextPage = new URL(url);
        //міняємо попереднє значення параметру на введене користувачем
        nextPage.searchParams.set(paramName, param);
        return nextPage.toString(); 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//створення елемента
const createElement = (type, classNames = [], attributes = {}, ...children) => {
    const el = document.createElement(type);
    if(classNames) {
      el.classList.add(...classNames);  
    }
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value);
    })
    el.append(...children);
    return el;
}