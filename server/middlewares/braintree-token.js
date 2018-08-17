const braintree = require('braintree');

module.exports = async (
  //
  req,
  res,
  // next,
) => {
  try {
    const gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.MERCHANTID,
      publicKey: process.env.PUBLICKEY,
      privateKey: process.env.PRIVATEKEY,
    });
    const { clientToken, success } = await gateway.clientToken.generate({});
    if (success) res.json({ clientToken });
    throw new Error('cant retrive token');
  } catch (error) {
    res.status(403);
  }
};
