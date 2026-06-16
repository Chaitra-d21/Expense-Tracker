function ExpenseTable({
  expenses,
  searchBy,
  searchText,
  editExpense,
  deleteExpense
}) {

  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Expense</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {expenses
          .filter((item) => {

            if (!searchText) {
              return true;
            }

            return String(item[searchBy])
              .toLowerCase()
              .includes(searchText.toLowerCase());

          })
          .map((item, index) => (

            <tr key={item.id}>

              <td>{index + 1}</td>
              <td>{item.expenseName}</td>
              <td>{item.category}</td>
              <td>₹ {item.amount}</td>
              <td>{item.expenseDate}</td>

              <td>

                <button
                  onClick={() => editExpense(item)}
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => deleteExpense(item.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

      </tbody>
    </table>
  );
}

export default ExpenseTable;

