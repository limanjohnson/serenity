class Activity {
    #name;
    #description;
    #duration;

    activity
    startButton = document.querySelector(".start");
    cancelButton = document.querySelector(".cancel");

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        this.#duration = 0;
    }

    setDuration(duration) {
        if (duration >= 30 && duration <= 300) {
            this.#duration = duration;
        } else {
            throw new Error("Duration must be between 30 and 300 seconds.");
        }
    }

    getName() {
        return this.#name;
    }

    getDuration() {
        return this.#duration;
    }

    displayStartingMessage() {
        let activityContainer = document.querySelector("#activity")
        activityContainer.innerHTML = `
        <h2>${this.#name}</h2>
        <p>${this.#description}</p>
        <p>Select a duration to begin</p>
        <button data-duration="30">30 seconds</button>
        <button data-duration="60">1 minute</button>
        <button data-duration="120">2 minutes</button>
        <button data-duration="300">5 minutes</button>
        `;

        activityContainer.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (e) => {
                const duration = parseInt(e.target.dataset.duration);
                this.setDuration(duration);
                this.startActivity();
            });
        });
    }

    startActivity() {
        const activityContainer = document.querySelector("#activity");
        activityContainer.innerHTML = `
        <h1>${this.#name}</h1>
        <p>Starting for ${this.#description}</p>`;

        this.runActivity();
    }

    runActivity() {
        setTimeout(() => {
            this.displayEndingMessage();
        }, this.#duration * 1000);
    }

    displayEndingMessage() {
        const activityContainer = document.querySelector("#activity");
        activityContainer.innerHTML = `
        <h1>Well Done</h1>
        <p>You have completed ${this.#name} activity for ${this.#duration}</p>`;
    }
}

export default Activity;