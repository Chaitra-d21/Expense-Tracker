const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.get("/", (req, res) => res.send("Expense Tracker Backend Running"));
router.post("/expenses", expenseController.addExpense);
router.get("/expenses", expenseController.getExpenses);
router.put("/expenses/:id", expenseController.updateExpense);
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
