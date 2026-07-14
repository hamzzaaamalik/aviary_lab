/**
 * BudgetManager class handles budgeting operations for the system.
 * It tracks income, expenses, and allocates resources accordingly.
 * @class
 */
class BudgetManager {
    /**
     * Creates an instance of BudgetManager.
     * Initializes income, expenses, and budget.
     */
    constructor() {
        this.income = 0;
        this.expenses = 0;
        this.budget = 0;
    }

    /**
     * Adds income to the budget.
     * @param {number} amount - The amount of income to add.
     * @throws {Error} Will throw an error if the amount is negative.
     */
    addIncome(amount) {
        if (amount < 0) throw new Error('Income must be a positive value.');
        this.income += amount;
        this.updateBudget();
    }

    /**
     * Adds expense to the budget.
     * @param {number} amount - The amount of expense to add.
     * @throws {Error} Will throw an error if the amount is negative.
     */
    addExpense(amount) {
        if (amount < 0) throw new Error('Expense must be a positive value.');
        this.expenses += amount;
        this.updateBudget();
    }

    /**
     * Updates the current budget based on income and expenses.
     */
    updateBudget() {
        this.budget = this.income - this.expenses;
    }

    /**
     * Gets the current budget status.
     * @returns {object} An object containing income, expenses, and budget.
     */
    getBudgetStatus() {
        return {
            income: this.income,
            expenses: this.expenses,
            budget: this.budget,
        };
    }

    /**
     * Checks if the budget is balanced (income >= expenses).
     * @returns {boolean} True if the budget is balanced, false otherwise.
     */
    isBudgetBalanced() {
        return this.income >= this.expenses;
    }
}

module.exports = BudgetManager;
