import Activity from "./Activity.js";

class ReflectingActivity extends Activity {
    #prompts = [
        "Think of a time when you stood up for someone else.",
        "Think of a time when you did something really difficult.",
        "Think of a time when you were really proud of yourself.",
        "Think of a time when you helped someone in need.",
        "Think of a time when you did something truly selfless.",
        "Think of an experience where your perseverance led to success",
        "Reflect on a moment when you maintained your composure during a tough situation.",
        "Think of a time when your kindness made someone’s day better.",
        "Recall a moment when you showed courage in the face of fear.",
        "Think of a time when you turned failure into a valuable learning experience.",
        "Reflect on a moment when you positively impacted someone’s life."
    ];

    #questions = [
        "Why was this experience meaningful to you?",
        "Have you ever done anything like this before?",
        "How did you get started?",
        "How did you feel when it was complete?",
        "What made this time different than other times when you were not as successful?",
        "What is your favorite thing about this experience?",
        "What could you learn from this experience that applies to other situations?",
        "What did you learn about yourself through this experience?",
        "How can you keep this experience in mind in the future?",
        "What small details from this experience stand out the most to you, and why?",
        "How does this memory make you feel about your ability to handle future obstacles",
        "What did you find most surprising about this experience?",
        "In what ways have you changed or grown as a result of this experience?",
        "What advice would you give to someone facing a similar situation?",
        "How did this moment influence your values or priorities in life?",
        "If this experience became a story, what would the moral of the story be?",
        "Was there a particular decision or action that you feel made a significant difference? What was it?",
        "How did this experience give you a new perspective on yourself or others?",
        "What strengths did you rely on or discover during this moment?",
        "Who played a key role in this memory, and how did they impact the outcome?",
        "If you were to relive this experience, would you do anything differently?",
        "How might this experience shape your approach to future challenges?",
        "What emotions did you feel during this moment, and why?",
        "What challenges did you face during this experience, and how did you overcome them?"
    ];

    constructor() {
        super(
            "Reflecting Activity",
            "This activity will explore your inner strength and its impact on your life."
        )
    }

    getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * this.#prompts.length)
        return this.#prompts[randomIndex];
    }

    shuffleQuestions() {
        const shuffled = [...this.#questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

        }
        return shuffled;
    }

    runActivity() {
        const activityContainer = document.querySelector("#activity");
        const prompt = this.getRandomPrompt();
        const shuffledQuestions = this.shuffleQuestions();
        let questionIndex = 0;

        activityContainer.innerHTML = `
        <h2>${this.getName()}</h2>
        <p>${prompt}</p>
        <p id="question">${shuffledQuestions[questionIndex]}</p>
        <p id="timer">Time remaining: ${this.getDuration()} seconds</p>
        `;

        const startTime = Date.now();
        const duration = this.getDuration() * 1000;
        const timerElement = document.querySelector("#timer");
        const questionElement = document.querySelector("#question");

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, Math.ceil((duration - elapsedTime) / 1000));
            timerElement.innerText = `Time remaining: ${remainingTime} seconds`;

            if (elapsedTime >= duration) {
                clearInterval(interval);
                this.endActivity();
            } else if (elapsed % 15000 === 0) {
                questionIndex = (questionIndex + 1) % shuffledQuestions.length;
                questionElement.innerText = shuffledQuestions[questionIndex];
            }
        }, 1000);
    }

    endActivity() {
        const activityContainer = document.querySelector("#activity");
        activityContainer.innerHTML = `
        <h2>Activity Complete!</h2>
        <p>You completed the Reflection Activity.</p>
        `;
    }
}

export default ReflectingActivity;