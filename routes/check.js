const express = require("express");
const router = express.Router();

router.get("/", () => {
    console.log("Hello")
});

module.exports = router;