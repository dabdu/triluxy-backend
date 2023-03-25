const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();
const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://triluxy-web.vercel.app/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/hotel", require("./routes/hotelRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/taxi", require("./routes/taxiRoutes"));
app.use("/api/car", require("./routes/carRoutes"));
app.use("/api/rider", require("./routes/riderRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
