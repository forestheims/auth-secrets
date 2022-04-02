module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const domain = email.split('@').pop();
    if (domain !== process.env.AUTHORIZED_DOMAIN) throw new Error();
    next();
  } catch (error) {
    error.message = 'Not Authorized';
    error.status = 401;
    next(error);
  }
};
