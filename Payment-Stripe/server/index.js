import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KvNRAKNgHgd1DYNECNL3IkZfcjDMJHNxedX6KNF854wrKXYGJupNvzqF1lL36f8X9OI1ky9NeDyZxKJ52dPcvrM00DsPmDs4r";
const SECRET_KEY = "sk_test_51KvNRAKNgHgd1DYNldSvt4QmoOTs9swpQwcUIkx3xvRW5THDGjMt6V3qy6JuiEdPQcNEWzW9ydqPy4YwOcIqjqG800a4jwZxda";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 199, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});


