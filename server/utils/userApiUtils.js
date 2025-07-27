function checkInputRegister(req) {
  const { username, email, password } = req.body;
  return !(!username || !email || !password);
}

function checkInputLogin(req) {
  const { email, password } = req.body;
  return !(!email || !password);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]{8,}$/;
  return passwordRegex.test(password);
}

module.exports = {
  checkInputRegister,
  checkInputLogin,
  isValidEmail,
  isValidPassword,
};
