const express = require('express');
const dotenv = require('dotenv');
const mogoose = require('mongoose');
const topicRoutes = require("./routes/topicRoutes")
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8002;
app.use(express.json());

app.use("/topic", topicRoutes)

mogoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection failed", err);
});


app.listen(PORT, () => {
    console.log(`Topic Service is running on port ${PORT}`);
})
