function checkInputRegister(req) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return false;
  }
  return true;
}

module.exports = {
  checkInputRegister,
};
