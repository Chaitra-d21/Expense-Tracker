import "./SearchBar.css";   //Imports the CSS file so the styles defined in SearchBar.css are applied to this component.
function SearchBar({
  searchBy,                //Stores selected search field
  setSearchBy,             //Updates search field
  searchText,              //Stores entered search text
  setSearchText,           //Updates search text
  setShowForm              //Opens Add Expense form
}) {
  return (
    <div className="search-row"> //Acts as the main wrapper for the search section. Contains:Left side → Search controls,Right side → Add Expense button

      <div className="search-left">   //Groups:Dropdown,Search textbox
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}    //Allows the user to choose what field to search.
        >
          <option value="expenseName">Expense Name</option>
          <option value="category">Category</option>
          <option value="expenseDate">Date</option>
          <option value="amount">Amount</option>
        </select>

        <input
          type="text"               // Creates a text field where users type search values.
          placeholder={`Search by ${searchBy}`}    // Changes automatically.
          value={searchText}    //Connects textbox to React state.
          onChange={(e) => setSearchText(e.target.value)}   // Updates the selected dropdown value.
        />
      </div>

      <div className="search-right">  //Contains the Add Expense button.
        <button onClick={() => setShowForm(true)}>  //Opens the expense form popup.
          + Add Expense
        </button>
      </div>

    </div>
  );
}

export default SearchBar;