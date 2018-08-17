// @flow
/* global paypal:true braintree:true */
import * as React from 'react';
import ReactDOM from 'react-dom';

/* $FlowFixMe */
const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

type paypalContainerProps = {
  env: string,
  commit: boolean,
  client: any,
  onPayerFetched: Function,
  onSuccess: Function,
  onCancel: Function,
  onError: Function,
  paymentOptions: any,
  style: any,
};
const PaypalContainer = ({
  env,
  commit,
  client,
  onPayerFetched,
  onSuccess,
  onCancel,
  onError,
  paymentOptions,
  style,
}: paypalContainerProps) => (
  <PayPalButton
    env={env}
    /* $FlowFixMe */
    braintree={braintree}
    client={client}
    commit={commit}
    payment={(data, actions) => actions.braintree.create(paymentOptions)}
    onAuthorize={async (data, actions) => {
      const { payer } = await actions.payment.get();
      onPayerFetched(payer);
      const nonce = await actions.payment.tokenize();
      onSuccess(nonce);
    }}
    onCancel={onCancel}
    onError={onError}
    style={style}
  />
);

export default ({
  //
  env = 'sandbox',
  client = {},
  commit = true,
  style = {},
  paymentOptions = {},
  onPayerFetched,
  onSuccess,
  onCancel,
  onError,
}: paypalContainerProps) => (
  <div>
    <h3>Amount $10.00</h3>
    <PaypalContainer
      commit={commit}
      env={env}
      client={client}
      onPayerFetched={onPayerFetched}
      onSuccess={onSuccess}
      onCancel={onCancel}
      onError={onError}
      paymentOptions={{
        flow: 'checkout', // Required
        currency: 'USD', // Required
        enableShippingAddress: true,
        enableBillingAddress: true,
        ...paymentOptions,
      }}
      style={{
        label: 'checkout',
        size: 'small', // small | medium | large | responsive
        shape: 'pill', // pill | rect
        color: 'gold', // gold | blue | silver | black
        tagline: false,
        ...style,
      }}
    />
  </div>
);
