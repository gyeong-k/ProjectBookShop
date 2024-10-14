const express = require("express");
const router = express.Router();
const {
  addRoCart,
  getCartItems,
  removeCartItem,
} = require("../controller/CartController");

router.use(express.json());

router.post("/", addRoCart);
router.get("/", getCartItems);
router.delete("/:id", removeCartItem);

//router.post("/carts");
module.exports = router;
