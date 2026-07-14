/**
 * GraduationLoop handles the main execution cycle of the PROTO system.
 * It coordinates the perception, reasoning, and action processes.
 * The loop runs continuously until explicitly stopped.
 */
class GraduationLoop {
    constructor(graduationManager) {
        this.graduationManager = graduationManager;
        this.running = false;
    }

    /**
     * Start the execution loop.
     */
    start() {
        this.running = true;
        this.loop();
    }

    /**
     * Stop the execution loop.
     */
    stop() {
        this.running = false;
    }

    /**
     * Main loop execution method.
     * It manages the perceive → think → act sequence.
     */
    async loop() {
        while (this.running) {
            try {
                // Step 1: Perceive
                const perceptionData = await this.graduationManager.perceive();
                // Step 2: Think
                const decisions = await this.graduationManager.think(perceptionData);
                // Step 3: Act
                await this.graduationManager.act(decisions);
                // Short delay for pacing
                await this.delay(100);
            } catch (error) {
                console.error('Error in GraduationLoop:', error);
                this.stop(); // Stop on critical errors
            }
        }
    }

    /**
     * Delay execution for a specified duration.
     * @param {number} ms - Duration to delay in milliseconds.
     * @returns {Promise<void>} - A promise that resolves after the delay.
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = GraduationLoop;