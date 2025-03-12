class APIHandler {
    constructor(url) {
        this.url = url;
        this.nextPageUrl = url;
        this.nextSearchPageUrl = url;
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
        // перевіряємо чи існує сторінка
        if(this.nextPageUrl === null) {
            return [];
        }
        try {
            const response =  await fetch(this.nextPageUrl);
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            console.log(data.results);

            //змінюємо URL для наступного запиту
            this.nextPageUrl = data.info.next;

            //повертаємо масив з даними персонажів
            return data.results;
        } catch (error) {
            console.log(error);
            return [];
        }   
    }

    async getCharactersByName(name) {
        //прапорець для визначення адреси запиту
        let isNext = false;
        try {

            //перевіряємо чи існує сторінка
            if(this.nextSearchPageUrl === null) {
                return [];
            }
            const url = isNext ? this.nextSearchPageUrl : `${this.url}?name=${name}`;
            
            const response = await fetch(url);   
            if(!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            console.log(data);

            //змінюємо URL для наступної сторінки
            if(data.info.next) {
                isNext = true;
                //дістаємо з відповіді адресу наступної сторінки
                const nextPage = new URL(data.info.next);
                //виправляємо параметр name на введене користувачем
                nextPage.searchParams.set('name', name);
                this.nextSearchPageUrl= nextPage.toString();
            } else {
                this.nextSearchPageUrl = null;
            }
            
            console.log(data.results);
            return data.results
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default APIHandler;