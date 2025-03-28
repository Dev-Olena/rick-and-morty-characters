import {fetchData} from './utils.js';

class APIHandler {
    constructor(url) {
        this.url = url;
        this.nextPageUrl = url;
        this.nextSearchPageUrl = url;
        this.currentRequest  = '';
    }

    //приватний метод класу для отримання загальної кількості персонажей з API та обирання рандомних id у кількості визначених змінною  amount
    async #getRandomIds(amount) {
        try{
            const data = await fetchData(this.url);
            const quantity = data.info.count;
            const randomIds = [];
            while(randomIds.length < amount) {
                let randomId = Math.floor(Math.random() * quantity) +1 ;
                if(!randomIds.includes(randomId)) {
                    randomIds.push(randomId);
                }
            } 
            return randomIds;
            } catch(error) {
            console.log(error);
            return [];
        }
    }

    // функція для отримання рандомних персонажей
    async getRandomCharacters(amount) {
        try{
            const randomIds = await this.#getRandomIds(amount);
            const url = `${this.url}/${randomIds}`;
            const data = await fetchData(url);
            return data;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    async getAllCharacters() {
        // перевіряємо чи існує сторінка
        if(this.nextPageUrl === null) return [];
        try {
            const data = await fetchData(this.nextPageUrl);
            //оновлюємо URL для наступного запиту
            this.nextPageUrl = data.info.next;
            return data.results;
        } catch (error) {
            console.log(error);
            return [];
        }   
    }

    async getCharactersByName(name) {
        try {
            // cкидаємо прапорець для визначення адреси запиту за умови нового запиту
            if(this.currentRequest !== name) {
                this.nextSearchPageUrl = `${this.url}?name=${name}`;
                this.currentRequest = name;
            }
            //перевіряємо чи існує сторінка
            if(this.nextSearchPageUrl === null) {
                return [];
            }
            const data = await fetchData(this.nextSearchPageUrl);

            //оновлюємо URL для наступної сторінки
            if(data.info.next) {
                //дістаємо з відповіді адресу наступної сторінки
                const nextPage = new URL(data.info.next);
                //виправляємо параметр name на введене користувачем
                nextPage.searchParams.set('name', name);
                this.nextSearchPageUrl= nextPage.toString();
            } else {
                this.nextSearchPageUrl = null;
            }
            
            return data.results
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default APIHandler;