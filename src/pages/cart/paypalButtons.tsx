import { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  BraintreePayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const style = { label: "paypal", layout: "vertical" };
// const amount = "2";

interface IPaypalButtons {
  amount: string;
}
export default function PaypalButtons(props: IPaypalButtons) {
  const { amount } = props;
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          "https://braintree-sdk-demo.herokuapp.com/api/braintree/auth"
        )
      ).json();
      setClientToken(response?.client_token || response?.clientToken);
    })();
  }, []);

  return (
    <>
      {clientToken ? (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider
            options={{
              "client-id": "test",
              components: "buttons",
              // "data-user-id-token": "your-tokenization-key-here",
              "data-client-token": clientToken,
              intent: "capture",
              vault: false,
            }}
          >
            <BraintreePayPalButtons
              style={{ label: "paypal", layout: "vertical" }}
              disabled={false}
              fundingSource="" // Available values are: ["paypal", "card", "credit", "paylater", "venmo"]
              forceReRender={[style, amount]}
              createOrder={function (data, actions) {
                return actions.braintree
                  .createPayment({
                    flow: "checkout",
                    amount: amount, // Here change the amount if needed
                    currency: "USD", // Here change the currency if needed
                    intent: "capture",
                    enableShippingAddress: true,
                    shippingAddressEditable: false,
                    shippingAddressOverride: {
                      recipientName: "Scruff McGruff",
                      line1: "1234 Main St.",
                      line2: "Unit 1",
                      city: "Chicago",
                      countryCode: "US",
                      postalCode: "60652",
                      state: "IL",
                      phone: "123.456.7890",
                    },
                  })
                  .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                  });
              }}
              onApprove={function (data, actions) {
                return actions.braintree
                  .tokenizePayment(data)
                  .then((payload) => {
                    // Your code here after capture the order
                    console.log(JSON.stringify(payload));
                  });
              }}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <h1>Loading token...</h1>
      )}
    </>
  );
}
