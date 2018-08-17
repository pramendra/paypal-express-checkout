# Paypal Express Checkout

Paypal express checkoug using braintree. Retrive payer information such as email and shipping address.

## Flow

```
Buy with Paypal ->
Paypal login -> (verify shipping address)
Verify buyer information (email, shipping addess)
Recieve nonce on Pay Now click
```

## Setup in dev

```
$ git clone https://github.com/pramendra/paypal-express-checkout.git
$ cd paypal-express-checkout
$ yarn
$ yarn dev
```

## Demo

`https://paypal-express-checkout-fqyvgaccxh.now.sh/`
