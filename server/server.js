const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/", expenseRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));