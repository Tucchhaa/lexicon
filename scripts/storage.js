const datesKey = "Dates";

class Storage {
    // Возвращает список дней для отображения
    async getDays() {
        const dates = this._get(datesKey);
        const days = [];

        for(let i=0; i < dates.length; i++) {
            const words = this._get(dates[i]);
            const date  = new Date(dates[i]);

            const day = new Day(i+1, words, date);

            days.push(day);
        }

        return days;
    }

    // Получить все слова дня под номером dayNumber
    async getDay(dayNumber) {
        const dates = this._get(datesKey);
        const dayKey = dates[Number(dayNumber)-1];
        
        return this._get(dayKey);
    }

    // Добавить слово в текущий день
    async addWord(word) {
        if(word instanceof Word === false)
            throw new Error("parameter provided to method Storage.AddWord(word) is not an instance of class Word");

        const key = new Date().toDateString();

        let day = this._get(key);

        day.push(word);

        this._set(key, day);
        
        // сохранить день в списке
        const dates = this._get(datesKey);

        if(dates.indexOf(key) === -1) {
            dates.push(key);
            
            this._set(datesKey, dates);
        }
    }

    _get(key) {
        const value = localStorage.getItem(key);
        
        return value === null ? [] : JSON.parse(value);
    }

    _set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const storage = new Storage();