    const express = require("express");
    const controller = require("../controllers/opController");
    const middleware = require("../middlewares/userMiddleware")
    const app = express.Router();

    // post, get, put, delete

    app.post("/post-comment", middleware.userMiddleware, controller.createOp);

    module.exports = app;
