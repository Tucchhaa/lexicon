const colors = [
    "#FFDD59", "#2ED573", "#55E6C1", "#38ADA9", 
    "#7ED6DF", "#BADC58", "#BE2EDD", "#C4E538", 
    "#E056FD", "#EB4D4B", "#ED4C67", "#F9CA24", 
    "#FF3F34"
];

const groups = document.querySelectorAll(".color-group");

for(const group of groups) {
    colorGroup(group);
}

function colorGroupIn(el) {
    const groups = el.querySelectorAll(".color-group");

    for(const group of groups) {
        colorGroup(group);
    }
}

function colorGroup(group) {
    const colorElements = group.querySelectorAll("[data-prop]");
    
    const selectedColors = [];

    for(const element of colorElements) {
        // Имя свойство цвет которого нужно изменить
        const prop = element.dataset.prop;

        if(element.dataset.colorAs === "prev")
            element.style[prop] = selectedColors[selectedColors.length-1];
        
        // Если в data-color-as записано число
        else if(isNaN(Number(element.dataset.colorAs)) === false) {
            const index = Number(element.dataset.colorAs);

            element.style[prop] = selectedColors[index];
        }

        else {
            const color = getColor(selectedColors);

            selectedColors.push(color);

            element.style[prop] = color;
        }
    }
}

function getColor(except) {
    while(true) {
        const rand = Math.floor(Math.random() * 12);
        const color = colors[rand];

        if(except.indexOf(color) === -1)
            return color;
    }
}