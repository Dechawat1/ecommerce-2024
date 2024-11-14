import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/payment/CheckoutFrom";
const stripePromise = loadStripe(
  "pk_test_51QDNXPLaNAwSENSfuPOkkgw9D3bUkC74wcQRNDr3rOYBhslyteJOHyALah4CHxvxEIBtDpY9Z3d7W64Wy0tL9Q7l00VXb52hFl"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const token = useEcomStore((s) => s.token);

  useEffect(() => {
    payment(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <>
      <div>
        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Payment;
