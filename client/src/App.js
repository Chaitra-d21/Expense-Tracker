import { useState, useEffect } from "react";

import Login from "./components/Login";
import DashboardCards from "./components/DashboardCards";
import SearchBar from "./components/SearchBar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseChart from "./components/ExpenseChart";
import MonthlyExpenseChart from "./components/MonthlyExpenseChart";
import UserProfile from "./components/UserProfile";

import {
  getExpenses,
  addExpenseApi,
  updateExpenseApi,
  deleteExpenseApi
} from "./services/expenseService";

import "./App.css";

function App() {

  // ---------------- LOGIN STATE ----------------
  const [isLoggedIn, setIsLoggedIn] = useState(false); // checks if user is logged in
  const [loggedInUser, setLoggedInUser] = useState(""); // stores username after login

  // ---------------- EXPENSE STATE ----------------
  const [expenses, setExpenses] = useState([]); // stores all expenses from backend
  const [loading, setLoading] = useState(false); // shows loading when API is called

  // form fields (used for add/edit expense)
  const [expenseName, setExpenseName] = useState(""); // expense name input
  const [category, setCategory] = useState(""); // category input
  const [amount, setAmount] = useState(""); // amount input
  const [expenseDate, setExpenseDate] = useState(""); // date input

  const [editId, setEditId] = useState(null); // stores id when editing expense

  // ---------------- SEARCH STATE ----------------
  const [searchText, setSearchText] = useState(""); // search input value
  const [searchBy, setSearchBy] = useState("expenseName"); // search filter type

  // ---------------- UI CONTROL ----------------
  const [showForm, setShowForm] = useState(false); // controls add/edit popup

  // ======================================================
  // FETCH EXPENSES FROM BACKEND (READ OPERATION)
  // ======================================================
  const fetchExpenses = async () => {
    setLoading(true); // show loading while fetching data

    try {
      const data = await getExpenses(); // API call to get expenses
      setExpenses(data); // store data in state
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }

    setLoading(false); // hide loading after response
  };

  // runs only once when page loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // ======================================================
  // ADD OR UPDATE EXPENSE (CREATE + UPDATE)
  // ======================================================
  const addExpense = async () => {

    // validation check
    if (!expenseName || !category || !amount || !expenseDate) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      expenseName,
      category,
      amount,
      expenseDate
    };

    try {

      if (editId) {
        // UPDATE existing expense
        await updateExpenseApi(editId, payload);
        setEditId(null); // reset edit mode
      } else {
        // ADD new expense
        await addExpenseApi(payload);
      }

      resetForm(); // clear form after save
      fetchExpenses(); // refresh list

    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  // ======================================================
  // RESET FORM VALUES
  // ======================================================
  const resetForm = () => {
    setExpenseName(""); // clear name
    setCategory(""); // clear category
    setAmount(""); // clear amount
    setExpenseDate(""); // clear date
    setEditId(null); // reset edit mode
    setShowForm(false); // close popup
  };

  // ======================================================
  // DELETE EXPENSE (DELETE OPERATION)
  // ======================================================
  const deleteExpense = async (id) => {

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteExpenseApi(id); // API call to delete
      fetchExpenses(); // refresh list
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // ======================================================
  // EDIT EXPENSE (LOAD DATA INTO FORM)
  // ======================================================
  const editExpense = (item) => {
    setExpenseName(item.expenseName); // set name
    setCategory(item.category); // set category
    setAmount(item.amount); // set amount
    setExpenseDate(item.expenseDate); // set date
    setEditId(item.id); // store id for update
    setShowForm(true); // open form
  };

  // ======================================================
  // LOGIN SCREEN
  // ======================================================
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(username) => {
          setLoggedInUser(username); // store username
          setIsLoggedIn(true); // move to dashboard
        }}
      />
    );
  }

  // ======================================================
  // DASHBOARD UI
  // ======================================================
  return (
    <div className="app-container">

      {/* HEADER SECTION */}
      <div className="header">
        <h1>Expense Tracker</h1>

        {/* USER PROFILE WITH DROPDOWN */}
        <UserProfile
          username={loggedInUser}
          onLogout={() => {
            setLoggedInUser(""); // clear user
            setIsLoggedIn(false); // logout user
            setExpenses([]); // clear data
          }}
        />
      </div>

      {/* LOADING MESSAGE */}
      {loading && <p className="loading">Loading expenses...</p>}

      {/* SEARCH BAR COMPONENT */}
      <SearchBar
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        searchText={searchText}
        setSearchText={setSearchText}
        setShowForm={setShowForm}
      />

      {/* SUMMARY CARDS */}
      <DashboardCards expenses={expenses} />

      {/* CHART SECTION */}
      <div className="charts-row">
        <div className="chart-card">
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="chart-card">
          <MonthlyExpenseChart expenses={expenses} />
        </div>
      </div>

      {/* EXPENSE TABLE */}
      <div className="table-wrapper">
        <ExpenseTable
          expenses={expenses}
          searchBy={searchBy}
          searchText={searchText}
          editExpense={editExpense}
          deleteExpense={deleteExpense}
        />
      </div>

      {/* ADD / EDIT FORM */}
      <ExpenseForm
        showForm={showForm}
        editId={editId}
        expenseName={expenseName}
        setExpenseName={setExpenseName}
        category={category}
        setCategory={setCategory}
        amount={amount}
        setAmount={setAmount}
        expenseDate={expenseDate}
        setExpenseDate={setExpenseDate}
        addExpense={addExpense}
        cancelForm={resetForm}
      />

    </div>
  );
}

export default App;