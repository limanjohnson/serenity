import Activity from "./Activity.js";

class ListingActivity extends Activity {
    #prompts = [
        "Who are people that you appreciate?",
        "What are personal strengths of yours?",
        "Who are people that you have helped this week?",
        "When have you felt the Holy Ghost this month?",
        "Who are some of your personal heroes?"
    ];

    constructor() {
        super(
            "Listing Activity",
            "This activity helps you reflect on the good things in your life by listing as many items as you can about a given prompt."
        )
    }

    getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * this.#prompts.length);
        return this.#prompts[randomIndex];
    }

    runActivity() {
        const activityContainer = document.querySelector("#activity");
        const prompt = this.getRandomPrompt();
        activityContainer.innerHTML = `
        <h2>${this.getName()}</h2>
        <p>${prompt}</p>
        <div class="textbox">
        <textarea id="userResponses" placeholder="Start listing your responses here..."></textarea>
        <div>
        <p id="timer">Time remaining: ${this.getDuration()} seconds</p>
        `;

        const startTime = Date.now();
        const duration = this.getDuration() * 1000;
        const timerElement = document.querySelector("#timer");

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, Math.ceil((duration - elapsedTime) / 1000));
            timerElement.innerText = `Time remaining: ${remainingTime} seconds`;

            if (elapsedTime >= duration) {
                clearInterval(interval);
                this.endActivity();
            }
        }, 1000);
    }

    endActivity() {
        const userReponsees = document.querySelector("#userResponses").value.split("\n").filter(response => response.trim() !== "");
        const activityContainer = document.querySelector("#activity");
        activityContainer.innerHTML = `
            <h2>Activity Complete!</h2>
            <p>You listed ${userReponsees.length} items.</p>
            <p>Here are your responses:</p>
            <ul>
                ${userReponsees.map(response => `<li>${response}</li>`).join("")}
            </ul>
        `;
    }
}

export default ListingActivity;