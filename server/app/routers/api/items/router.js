const express = require("express");

const itemsRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/itemActions");

// Route to get a list of items
itemsRouter.get("/", browse);

itemsRouter.get("/", (req, res) => {
  res.json({ message: "Items API is working!" });
});
// Route to get a specific item by ID
itemsRouter.get("/:id", read);

// Route to add a new item
itemsRouter.post("/", add);

/* ************************************************************************* */

module.exports = itemsRouter;
