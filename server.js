const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);
console.log(process.env.STRIPE_TEST_API_KEY);

const app = express();

// create application/json parser
const jsonParser = bodyParser.json()

app.set("port", process.env.PORT || 3001);

app.post("/api/cubes", jsonParser, (req, res) => {
  console.log("SENDING DATA TO STRIPE");
  const response = (async () => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Sol Lewitt Cube Print",
          description: '8" x 10" archival quality print',
          images: ["//localhost:3000/cube.png"],
          amount: 75,
          currency: "usd",
          quantity: 1
        }
      ],
      success_url:
        "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://example.com/cancel"
    });
  })();
  // console.log('STRIPE RESPONSE', response);
  response.then((data) => {
    console.log('DATA', data);
    res.send(data);
  }).catch(e => {
    console.log(e);
  })
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
