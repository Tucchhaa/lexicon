document.getElementById("back-to-home").onclick = () => {
    window.location.href = "./index.html";
}

const params = new URLSearchParams(window.location.search);
const dayNumber = params.get("day-number");

(async() => {
    const map = {};

    const words = await storage.getDay(dayNumber);
    shuffleArray(words);
    
    const wordsEl = document.getElementsByClassName("words")[0];

    for(const word of words) {
        
        if(map[word.word] === 1) {
            continue;
        }

        map[word.word] = 1;

        let meaningsHtml = "";

        for(const meaning of word.meanings)
            meaningsHtml += meaningHtml(word.word, meaning);

        const wordBlock = document.createElement("div");
        wordBlock.className = "word-block";
        wordBlock.innerHTML = wordBlockHtml(meaningsHtml, word.hintValue);

        wordsEl.appendChild(wordBlock);
        colorGroupIn(wordBlock);
    }
})();

function meaningHtml(word, meaning) {
    if(meaning.value == "")
        return "";

    return `
    <div class="meaning color-group">
        <div class="left">
            <div class="word" data-prop="color">${word}</div>
            <div class="type" data-prop="color">${meaning.type}</div>
        </div>

        <div class="translate" data-prop="color">${meaning.value}</div>
    </div>`;
}

function wordBlockHtml(meaningsHtml, hint) {
    return `
        <div class="meanings">
            ${meaningsHtml}
        </div>

        <div class="hint color-group">
            <span data-prop="color">
                ${hint}
            </span>
        </div>`;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}