import {openDetails} from "./utils.js";

class Character {
    constructor({name, status, species, image}) {
        this.name = name;
        this.status = status;
        this.species = species;
        this.image = image;
    }

    render() {
        // Створюємо картку персонажа
        const characterCard = document.createElement('article');

        //Створюємо елементи картки та стилізуємо їх
        const name = document.createElement('h3');
        name.classList.add('character-name')
        name.textContent = this.name;

        //Відкриваємо модальне вікно при кліку по імені персонажа
        name.addEventListener('click', () =>  openDetails(this));

        const img = document.createElement('img');
        img.src = this.image;
        
        //Додаємо стилі та елементи до картки
        characterCard.classList.add('card');
        characterCard.append(img, name);
        return characterCard;
    }

}

export default Character;