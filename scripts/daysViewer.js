(async () => {
    const container = document.getElementById("days-container");
    const days = await storage.getDays();

    let dayNumber = 0;

    for(const day of days.reverse()) {
        const element = document.createElement("div");

        element.className = "day-flex-space";
        element.innerHTML = getDayHtml(day);

        element.querySelector(".check-me > button").onclick = e => {
            window.location.href = "./day.html?day-number="+dayNumber;
        }

        colorGroup(element);

        container.appendChild(element);

        dayNumber++;
    }
})();

function getDayHtml(day) {
    return `<div class="day color-group">
                <div class="number" data-prop="color">Day ${day.number}</div>

                <div class="card" data-prop="borderColor">
                    <div class="date">
                        <div class="date-day">${day.date}</div>
                        <div class="date-year">${day.year}</div>
                    </div>

                    <div class="words-number">
                        <span class="number" data-prop="color">${day.wordsNumber}</span>
                        <span class="words" data-prop="color">${day.wordsNumber == 1 ? "word" : "words"}</span>
                    </div>

                    <div class="first-words">
                        <div data-prop="color">${day.word1}</div>
                        <div data-prop="color">${day.word2}</div>
                        <div data-prop="color">${day.word3}</div>
                    </div>

                    <div class="ellipsis">
                        <span data-prop="color">.</span><span data-prop="color">.</span><span data-prop="color">.</span>
                    </div>

                    <div class="check-me">
                        <button data-prop="backgroundColor" data-color-as="1">See more</button>
                    </div>
                </div>
            </div>`;
}