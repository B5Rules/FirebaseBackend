import express from "express";

// PUBLISHABLE_KEY - pk_live_51KvNRAKNgHgd1DYNSpzYmkvWGiTLXmeG4qu3ei8sTHzxYdGMpkqBDBynmw5W7GgOq0he2sRTo3eInPwdHR9kQypt00qY8auki2
// SECRET_KEY      - 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
 
const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KvNRAKNgHgd1DYNECNL3IkZfcjDMJHNxedX6KNF854wrKXYGJupNvzqF1lL36f8X9OI1ky9NeDyZxKJ52dPcvrM00DsPmDs4r";
const PUBLISHABLE_KEY2 = "pk_test_51L2xjzAaEq4h44bRDHs8InXsG2Kiv2AStsAyTOmNrrRM0p9WeD1awNnEY2RsXq1xtqqib2KeoQSxwbEpHMMb8B9h00G0UHRzoY";

const SECRET_KEY = "sk_test_51KvNRAKNgHgd1DYNldSvt4QmoOTs9swpQwcUIkx3xvRW5THDGjMt6V3qy6JuiEdPQcNEWzW9ydqPy4YwOcIqjqG800a4jwZxda"; //test
// const SECRET_KEY = "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"; //live 
const SECRET_KEY2 = "sk_test_51L2xjzAaEq4h44bRQAur5TA0mU21bXMmYWTfoy9RSiPMBsphqQT1opSqn9flAektQa1NoXkyNMhd3N9YoiHkog8000WLe3H7Mj";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

function getAmount() {
  return 300;
}

const price = getAmount();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {

  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "ron",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    console.log(clientSecret);

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});