import Activity from "./Activity.js";

class BreathingActivity extends Activity {
    constructor() {
        super(
            "Breathing Activity",
            "This activity will help you relax by guiding you through a breathing exercise."
        );
    }

    runActivity() {
        const activityContainer = document.querySelector("#activity");
        let cycles = this.getDuration() / 10;

        const breathingCycle = () => {
            if (cycles > 0) {
                activityContainer.innerHTML = `<p>Breathe in...</p>`;
                setTimeout(() => {
                    activityContainer.innerHTML = `<p>Breathe out...</p>`;
                    setTimeout(() => {
                        cycles--;
                        breathingCycle();;
                    }, 5000);
                }, 5000);
            } else {
                this.displayEndingMessage();
            }
        };

        breathingCycle();
    }
}

export default BreathingActivity;