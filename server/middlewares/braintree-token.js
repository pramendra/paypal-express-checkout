const braintree = require('braintree');

module.exports = async (
  //
  req,
  res,
  // next,
) => {
  const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANTID,
    publicKey: process.env.PUBLICKEY,
    privateKey: process.env.PRIVATEKEY,
  });
  const { clientToken, success } = await gateway.clientToken.generate({});
  if (success) res.json({ clientToken });
  res.send(404);
};
