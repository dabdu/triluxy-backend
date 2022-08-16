const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/hotel", require("./routes/hotelRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
