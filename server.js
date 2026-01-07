const express = require('express');
const dotenv = require('dotenv');
const sql = require("mssql")


dotenv.config();

const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users",require ("./routes/usersRoutes"))

app.get("/test", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        await connectDB();
        console.log("MSSQL DB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Startup failed:", error);
    }
}

startServer();
