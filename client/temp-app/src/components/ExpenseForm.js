function ExpenseForm({
  showForm,
  editId,
  expenseName,
  setExpenseName,
  category,
  setCategory,
  amount,
  setAmount,
  expenseDate,
  setExpenseDate,
  addExpense,
  cancelForm
}) {
  if (!showForm) return null;

  return (
    <div style={styles.overlay}>
      
      <div style={styles.modal}>

        <h3>
          {editId ? "✏️ Update Expense" : "➕ Add Expense"}
        </h3>

        <div style={styles.field}>
          <label>Expense Name</label>
          <input
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div style={styles.field}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label>Date</label>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>

        <div style={styles.buttonRow}>
          <button onClick={addExpense}>
            {editId ? "Update" : "Save"}
          </button>

          <button onClick={cancelForm}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px"
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between"
  }
};

export default ExpenseForm;