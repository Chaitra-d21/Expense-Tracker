import React from "react";              /*importing React library*/
import "./DashboardCards.css";          /*importing CSS file*/

/*In JavaScript (and React), we use const to declare variables that won’t be reassigned. but we can replace, what's inside */

const DashboardCards = ({ expenses }) => {    /*Receives expense data from the parent component.*/
  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),   /*Number(item.amount) Converts text into a number.*/
    0
  );                                            /*Add all expense amounts together.*/

  const categories = [...new Set(expenses.map((e) => e.category))];  /*Find unique categories,new Set(...):Removes duplicates, [...]Converts Set back to Array.*/

  return (                                     /*Tells React what should appear on screen.*/
    <div className="dashboard-container">      /*Container holding all cards.*/

      <div className="card total">
        <h4>Total Expenses</h4>               /*Displays Total Expenses*/
        <p>₹ {totalExpense}</p>               /* Displays values like ₹ 5000*/
      </div>

      <div className="card count">
        <h4>Total Transactions</h4>          /* Displays Total Transactions*/
        <p>{expenses.length}</p>             /*expenses.length, Counts records. like 5*/
      </div>

      <div className="card categories">
        <h4>Categories</h4>                   /*Displays Categories*/
        <p>{categories.length}</p>            /categories.length Counts records. like 5*/
      </div>

    </div>
  );
};

export default DashboardCards;              /*Allows this component to be used in other files.*/