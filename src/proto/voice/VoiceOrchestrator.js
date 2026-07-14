/**
 * VoiceOrchestrator - Manages vocal interactions across the system.
 *
 * This module integrates with the voice synthesis and utterance generation.
 * It coordinates vocal output based on commands from various agents in the ecosystem.
 *
 * @module VoiceOrchestrator
 */

class VoiceOrchestrator {
    constructor() {
        this.toneSynthesis = new ToneSynthesis();
        this.utteranceBuilder = new UtteranceBuilder();
    }

    /**
     * Generates and speaks an utterance based on the given command.
     *
     * @param {string} command - The command to be uttered.
     * @returns {Promise<void>} - A promise that resolves when the utterance is spoken.
     */
    async speak(command) {
        const utterance = this.utteranceBuilder.build(command);
        await this.toneSynthesis.synthesize(utterance);
    }

    /**
     * Handles vocal commands from agents and orchestrates their responses.
     *
     * @param {object} agent - The agent issuing the command.
     * @param {string} command - The command to be processed.
     */
    async handleAgentCommand(agent, command) {
        console.log(`Agent ${agent.id} issued command: ${command}`);
        await this.speak(command);
    }
}

// Export the VoiceOrchestrator class for use in other modules
module.exports = VoiceOrchestrator;