function checkInput(req){
  const { name,description } = req.body;
  return !(!name || !description);
}

module.exports = {checkInput};