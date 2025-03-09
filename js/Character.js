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
        //додаємо обробник події при кліку по імені персонажа
        name.addEventListener('click', () => this.openDetails());

        const img = document.createElement('img');
        img.src = this.image;
        //Додаємо стилі та елементи до картки
        characterCard.classList.add('card');
        characterCard.append(img, name);
        return characterCard;
    }

    openDetails() {
        //створюємо елемент Модальне вікно
        const modal = document.createElement('div');
        modal.classList.add('modal');

        //створюємо елементи для картки персонажа та надаємо стилі
        const img = document.createElement('img');
        img.src = this.image;
        img.classList.add('modal-img');
        
        const name = document.createElement('h3');
        name.textContent = this.name;
        name.classList.add('modal-name');

        const status = document.createElement('p');
        status.textContent = `Status: ${this.status}`;

        const species = document.createElement('p');
        species.textContent = `Species: ${this.species}`;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.classList.add('modal-btn');

        //створюємо картку модального вікна, стилізуємо та додаємо дочірні елементи
        const modalCard = document.createElement('article');
        modalCard.classList.add('modal-card');
        modalCard.append(img, name, status, species, closeBtn);

       //додаємо картку до модального вікна
        modal.append(modalCard);

        //додаємо модальне вікно на сторінку
        document.body.append(modal);

         //додаємо обробник події на закриття модального вікна
         closeBtn.addEventListener('click', () => {
            modal.remove()
         })
    }
}

export default Character;