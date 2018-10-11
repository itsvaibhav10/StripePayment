var express = require("express");
var router = express.Router();
// Enter Your Secret Key Here
var stripe = require("stripe")("SECRET KEY HERE");
/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "StripeJs" });
});
router.get("/success", function(req, res) {
  res.render("success", { title: "StripeJs" });
});
router.post("/charge", (req, res) => {
  const amount = 2500;
  // Create a new customer and then a new charge for that customer:
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Web Devlopment Book",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});
module.exports = router;
