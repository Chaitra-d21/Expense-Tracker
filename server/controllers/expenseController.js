const db = require("../config/database");

// Add Expense
exports.addExpense = (req, res) => {
  const { expenseName, category, amount, expenseDate } = req.body;

  db.run(
    "INSERT INTO Expenses (expenseName, category, amount, expenseDate) VALUES (?, ?, ?, ?)",
    [expenseName, category, amount, expenseDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Expense Added Successfully", id: this.lastID });
    }
  );
};

// Get All Expenses
exports.getExpenses = (req, res) => {
  db.all("SELECT * FROM Expenses ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Update Expense
exports.updateExpense = (req, res) => {
  const id = req.params.id;
  const { expenseName, category, amount, expenseDate } = req.body;

  db.run(
    `UPDATE Expenses SET expenseName=?, category=?, amount=?, expenseDate=? WHERE id=?`,
    [expenseName, category, amount, expenseDate, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Expense Updated Successfully" });
    }
  );
};

// Delete Expense
exports.deleteExpense = (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM Expenses WHERE id=?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Expense Deleted Successfully" });
  });
};
