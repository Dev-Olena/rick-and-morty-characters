class APIHandler {
    constructor(url) {
        this.url = url;
    }

    //приватний метод класу для отримання загальної кількості персонажей з API та обирання рандомних id у кількості визначених змінною  amount
    async #getRandomIds(amount) {
        try{
            const response =  await fetch(this.url);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            const quantity = data.info.count;
            const randomIds = [];
            for(let i = 1; i<=amount; i++) {
                let randomId = Math.floor(Math.random() * quantity) +1 ;
                randomIds.push(randomId);
            } 
            console.log(randomIds)
            return randomIds;
            } catch(error) {
            console.log(error)
        }
    }

    // функція для отримання рандомних персонажей
    async getRandomCharacters(amount) {
        try{
            const randomIds = await this.#getRandomIds(amount);
            const url = `${this.url}/${randomIds}`;
            const response = await fetch(url);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            console.log(data)
            return data;
        }catch(error) {
            console.log(error)
        }
    }

    async getAllCharacters() {
        try {
            const response =  await fetch(this.url);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            console.log(data.results);
            return data.results;
        } catch (error) {
            console.log(error)
        }   
    }
}

export default APIHandler;