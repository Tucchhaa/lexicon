const form = document.getElementsByClassName("main-form")[0];
var validationOk;

form.onsubmit = async e => {  
    e.preventDefault();
    
    // get
    const word  = getValue("word");
    const hint  = getValue("hint");
    const meanings = getMeanings();

    // validate
    validationOk = true;

    validate(word, "word", isNotEmpty);

    for(var i=0; i < meanings.length-1; i++) {
        validate(meanings[i].type,  "type"+i,    isNotEmpty);
        validate(meanings[i].value, "meaning"+i, isNotEmpty);
    }

    if(validationOk === true) {
        // store
        const wordInstance = new Word(word, hint, meanings);
    
        await storage.addWord(wordInstance);
    }

    e.target.reset();
    resetMeanings();
}


// ======================
// Получение значений формы
// ======================

function getValue(name) {
    const input = form.querySelector("[name='" + name + "']");

    return input.value;
}

// Получить значения полей значения :)

function getMeanings() {
    const meanings = document.getElementsByClassName("meaning");

    const values = [];

    for(const meaning of meanings) {
        const input = meaning.querySelector("input");
        const select = meaning.querySelector("select");
    
        values.push({ type: select.value, value: input.value });
    }

    values.pop();

    return values;
}

// ======================
// Валидация
// ======================

function validate(value, name, validation) {
    if(validation(value) === false) {
        const invalid = form.querySelector("[name='" + name + "']");
        
        const defaultBorderColor = getComputedStyle(invalid).borderColor;
        invalid.setAttribute("data-border-color", defaultBorderColor);
        invalid.style.borderColor = "red";

        validationOk = false;
    }

}

function isNotEmpty(value) {
    return !!value.trim();
}

// ======================
// Восстановление цвета границы полей ввода
// ======================

const inputs = document.querySelectorAll("input");

for(const input of inputs) {
    input.oninput = e => {    
        const borderColor = e.target.dataset.borderColor;

        if(borderColor) {
            e.target.style.borderColor = borderColor;
    
            e.target.dataset.borderColor = null;
        }
    }
}

// ======================
// Поля значений
// ======================

const parentNode    = document.getElementsByClassName("meanings")[0];
var meanings    = [...document.getElementsByClassName("meaning")];
const meaningInsert = document.getElementById("insert");

const getMeaningHtml = index => 
`<div><input type="text" name="meaning${index}" autocomplete="off" data-prop="borderColor"></div>
<div class="type">
    <select name="type${index}" data-prop="borderColor" data-color-as="prev">>
        <option value="noun">noun</option>
        <option value="verb">verb</option>
        <option value="adjective">adjective</option>
        <option value="adverb">adverb</option>
        <option value="participle">participle</option>
    </select>
</div>`;

// ====
meanings[0].addEventListener("input",    onMeaningInput);
meanings[0].addEventListener("focusout", onMeaningFocusout);

function onMeaningInput(e) {
    if(e.target.tagName !== "INPUT")
        return;

    const meaning = e.target.parentElement.parentElement;

    var isLast     = Number(meaning.dataset.index) === meanings.length-1;
    var isNotEmpty = !!e.target.value.trim();

    // если есть значение И это последнее поле
    if(isNotEmpty && isLast) {
        // создать новое поле
        const newField = document.createElement("div")
            
        newField.className     = "meaning";
        newField.innerHTML     = getMeaningHtml(meanings.length);
        newField.dataset.index = meanings.length;

        newField.addEventListener("input",    onMeaningInput);
        newField.addEventListener("focusout", onMeaningFocusout);

        colorGroup(newField);

        parentNode.insertBefore(newField, meaningInsert);

        meanings.push(newField);
    }
}   

function onMeaningFocusout(e) {
    const meaning = e.target.parentElement.parentElement;

    var isLast     = Number(meaning.dataset.index) === meanings.length-1;
    var isNotEmpty = !!e.target.value.trim();

    // если значение пустое И это не последний элемент
    if(!isNotEmpty && !isLast) {
        // удалить элемент
        meaning.remove();

        // переопределить индексы
        meanings = [...document.getElementsByClassName("meaning")];

        for(var i=0; i < meanings.length; i++)
            meanings[i].dataset.index = i;
    }
}

function resetMeanings() {
    for(const meaning of meanings.reverse()) {
        meaning.remove();

        meanings = [...document.getElementsByClassName("meaning")];

        if(meanings.length === 1)
            break;
    }
}