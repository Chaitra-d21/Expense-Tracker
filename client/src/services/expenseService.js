const API_URL = "http://localhost:5000/expenses";   // backend server address,/expenses → API endpoint for expense data

// GET
export const getExpenses = async () => {   //Creates a function to get expense data from backend,async means it works with server (slow operation)
    const response = await fetch(API_URL); //Sends a request to backend,fetch() = API call tool in JavaScript
    return await response.json();          //Converts backend response into usable JSON format
};

// ADD
export const addExpenseApi = async (expense) => {  //Function to add a new expense,expense = data coming from form
    return await fetch(API_URL, {                  //Sending request to backend API
        method: "POST",                            //POST = create new data
        headers: {
            "Content-Type": "application/json"      //Tells backend:I am sending JSON data
        },
        body: JSON.stringify(expense)     //Converts JavaScript object into JSON string,Sends expense data to backend
    });
};

// UPDATE
export const updateExpenseApi = async (id, expense) => {   //Function to update existing expense 
    return await fetch(`${API_URL}/${id}`, {                //Sends request to:backend 
        method: "PUT",                                     //PUT = update existing data
        headers: {
            "Content-Type": "application/json"                
        },
        body: JSON.stringify(expense)                  //Sends updated expense data to backend
    });
};

// DELETE
export const deleteExpenseApi = async (id) => {  //Function to delete a specific expense,id = which expense to remove
    return await fetch(`${API_URL}/${id}`, {     //Sends request
        method: "DELETE"                          // DELETE = removes data from backend
    });
};