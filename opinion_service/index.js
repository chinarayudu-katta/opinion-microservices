const express = require('express');
const dotenv = require('dotenv');
const mogoose = require('mongoose');
const opRoute = require("./routes/opRoutes")
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8003;
app.use(express.json());

mogoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection failed", err);
});

app.use("/opinion", opRoute)

    app.listen(PORT, () => {
    console.log(`Opinion Service is running on port ${PORT}`);
})