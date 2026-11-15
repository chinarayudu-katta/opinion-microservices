const express = require('express');
const dotenv = require('dotenv');
const mogoose = require('mongoose');
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;
app.use(express.json());

mogoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection failed", err);
});


app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
})

