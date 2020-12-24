const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopRating: {
    type: String,
    default: "No Ratings",
  },
  contactNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  servicesProvided: {
    type: [String],
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  daysOpened: {
    type: [String],
  },
  waitingQueue: {
    type: [String],
  },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
