class Word {
    constructor(wordValue, hintValue, meanings) {
        this.word = wordValue;
        this.hintValue = hintValue;

        /*
            [{ type: string, value: string }]
        */
        this.meanings = meanings;
    }
}

const month = [
    "January", "February", "March", "April", "May", "June", 
    "Jule", "August", "September", "October", "November", "December"
];

class Day {
    constructor(number, words, date) {
        this.number = number;
        this.wordsNumber = words.length;
        
        this.word1 = words[0].word;
        if(words[1]) this.word2 = words[1].word; else this.word2 = "";
        if(words[2]) this.word3 = words[2].word; else this.word3 = "";

        // Дата
        const today = new Date();

        if(date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            if(date.getDate() === today.getDate())
                this.date = "Today";

            else if(date.getDate() + 1 === today.getDate())
                this.date = "Yesterday";
        }

        if(!this.date)
            this.date = month[date.getMonth()] + ", " + date.getDate();
        
        this.year = date.getFullYear();
    }
}