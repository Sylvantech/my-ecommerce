function checkInputRegister(req) {
  const { username, email, password } = req.body;
  return !(!username || !email || !password);
}

function checkInputLogin(req) {
  const { email, password } = req.body;
  return !(!email || !password);
}

module.exports = {
  checkInputRegister,
  checkInputLogin,
};
