import "./ExpenseTable.css";

function ExpenseTable({
  expenses,
  searchBy,
  searchText,
  editExpense,
  deleteExpense
}) {
  return (
    <div className="table-wrapper">
      {/* Creates a container around the table */}

      <table className="expense-table">
        {/* Creates the expense table */}

        <thead>
          <tr>
            <th>No</th>
            <th>Expense</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {/* Creates a row for table headings */}
        </thead>

        <tbody>
          {/* Contains all expense records */}

          {expenses
            .filter((item) => {
              // To show only matching records

              if (!searchText) return true;
              // If user has not searched anything → show all records

              return String(item[searchBy])
                .toLowerCase()
                .includes(searchText.toLowerCase());
              // Case-insensitive search matching
            })

            .map((item, index) => (
              // Loops through all expenses and creates table rows

              <tr key={item.id}>
                {/* React uses id for efficient rendering */}

                <td>{index + 1}</td>
                {/* Serial Number */}

                <td>{item.expenseName}</td>
                {/* Expense Name */}

                <td>{item.category}</td>
                {/* Category */}

                <td>₹ {item.amount}</td>
                {/* Amount */}

                <td>{item.expenseDate}</td>
                {/* Date */}

                <td className="action-cell">
                  {/* Holds Edit and Delete buttons */}

                  <button
                    className="edit-btn"
                    onClick={() => editExpense(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
// Allows App.js to use this component