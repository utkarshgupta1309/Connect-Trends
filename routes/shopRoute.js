const express = require("express");
const router = express.Router();
var fs = require("fs");

var path = require("path");
var multer = require("multer");
var fs = require("fs");
var storage = multer.memoryStorage();
var upload = multer({ dest: "uploads/", storage: storage });

const Shop = require("../modals/shop");

router.get("/", function (req, res) {
  Shop.find({ city: req.query.city }).then((result) => {
    res.render("view-shops", { shops: result, city: req.query.city });
  });
  console.log(req.query.city);
});
router.get("/:id", function (req, res) {
  const id = req.params.id;
  Shop.findById(id)
    .then((result) => {
      res.render("view-shop-details", { shop: result });
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/book-now", function (req, res) {
  const newEntry = req.body.name;
  const id = req.body.shopId;
  Shop.findById(id).then((result) => {
    result.waitingQueue.push(newEntry);
    console.log(result.waitingQueue.length);
    result.save().then((result) => {
      res.render("booking-done", { shop: result, user: newEntry });
    });
  });
});

router.post("/add-shop", (req, res, next) => {
  var obj = {
    city: req.body.city,
    shopName: req.body.shopName,
    contactNo: req.body.contactNo,
    address: req.body.address,
  };
  console.log(req.body);
  console.log(obj);
  Shop.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
});

module.exports = router;
