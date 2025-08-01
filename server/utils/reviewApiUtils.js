function checkInput(req) {
  const { user_id, product_id, rating } = req.body;

  if (!user_id || !product_id || !rating) {
    return false;
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return false;
  }

  return true;
}

function checkUpdateInput(req) {
  const { id, rating } = req.body;

  if (!id) {
    return false;
  }

  if (rating !== undefined) {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return false;
    }
  }

  return true;
}

module.exports = { checkInput, checkUpdateInput };
