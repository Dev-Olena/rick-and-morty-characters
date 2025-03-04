class Character {
    constructor({name, status, species, image}) {
        this.name = name;
        this.status = status;
        this.species = species;
        this.image = image;
    }

    render() {
        console.log(this.name);
        const characterCard = document.createElement('article');
        const name = document.createElement('h3');
        name.textContent = this.name;
        const img = document.createElement('img');
        img.src = this.image;
        characterCard.append(img, name);
        return characterCard;
    }
}

export default Character;