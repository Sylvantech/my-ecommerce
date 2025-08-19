const leoProfanity = require("leo-profanity");

// Charger le dictionnaire français
leoProfanity.loadDictionary("fr");

// Ou charger plusieurs langues
// leoProfanity.loadDictionary(['en', 'fr']);

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

function checkObsenity(text) {
  if (!text || typeof text !== "string") {
    return false;
  }
  return leoProfanity.check(text);
}

module.exports = { checkInput, checkUpdateInput, checkObsenity };
