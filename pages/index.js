// @flow
import * as React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import axios from 'axios';

const PaypalButton = dynamic(import('../components/paypal/'));

const Payment = ({ env, client, ...props }) => (
  <div>
    <h1>Balance:</h1>
    <h4>Item: iPhone Case</h4>
    <PaypalButton
      paymentOptions={{
        amount: 10.0, // Required
      }}
      env={env}
      client={client}
      {...props}
    />
  </div>
);

type Props = {};

type State = {
  clientToken: ?string,
  payer: any,
  nonce: any,
};

export default class Index extends React.PureComponent<Props, State> {
  state = {
    clientToken: null,
    payer: null,
    nonce: null,
  };

  async componentDidMount() {
    const {
      data: { clientToken },
    } = await axios.get('/client-token');
    this.setState({ clientToken });
  }

  executePay = () => {
    const { nonce } = this.state;
    console.warn(nonce);
  };

  render() {
    const { payer, clientToken } = this.state;
    return (
      <React.Fragment>
        <Head key="one">
          <title>Express Checkout</title>
          <script
            src="https://www.paypalobjects.com/api/checkout.js"
            data-version-4
            log-level="warn"
          />
          <script src="https://js.braintreegateway.com/web/3.36.0/js/client.min.js" />
          <script src="https://js.braintreegateway.com/web/3.36.0/js/paypal-checkout.min.js" />
        </Head>
        {payer === null &&
          clientToken && (
            <Payment
              env="sandbox"
              client={{ sandbox: clientToken }}
              onPayerFetched={data => this.setState({ payer: data })}
              onSuccess={nonce => this.setState({ nonce })}
              onCancel={(data, actions) => console.warn(data, actions)}
              onError={err => console.warn(err)}
            />
          )}

        {payer !== null && (
          <div>
            <p>{JSON.stringify(payer)}</p>
            <h4>everythig looks good!</h4>
            <hr />
            <button
              type="button"
              onClick={this.executePay}
              style={{
                background: 'orange',
                fontSize: 20,
              }}
            >
              Pay Now
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
