//Add Expenses button
import "./ExpenseForm.css";
function ExpenseForm({        // Creates the ExpenseForm component.
  showForm,
  editId,
  expenseName,
  setExpenseName,
  category,
  setCategory,                // These are received from App.js.
  amount,
  setAmount,
  expenseDate,
  setExpenseDate,
  addExpense,
  cancelForm
}) {
  if (!showForm) return null;            // Show/Hide Popup 

  return (
    <div className="modal-overlay">      // Creates the dark background behind the popup.
      <div className="modal-card">       //Creates the white popup window.

        <h2>
          {editId ? "✏️ Update Expense" : "➕ Add Expense"}   // Changes title depending on operation.
        </h2>

        <div className="form-group">
          <label>Expense Name</label>
          <input
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}    // Stores expense name.
            placeholder="Enter expense name"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select                             // Allows category selection.
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}                                   //Captures expense amount.
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={expenseDate}                               //Allows user to select expense date.
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={addExpense}>  //Calls: addExpense()
            {editId ? "Update" : "Save"}             // If editing:Update,If adding:Save
          </button>

          <button className="cancel-btn" onClick={cancelForm}>   //Closes popup and clears fields.
            Cancel
          </button>                             //Calls:resetForm() from App.js.
        </div>

      </div>
    </div>
  );
}

export default ExpenseForm;          //Allows App.js to use this component.