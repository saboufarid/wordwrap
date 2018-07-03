const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
let express = require("express");
let User = require("../models/User");

let router = express.Router();

function getJsonErr(err) {
  return {
    error: {
      message: "Erreur: " + err
    }
  };
}

// Sign up
router.post("/sign_up", function(req, res) {
  let { username, email, password, biography } = req.body;
  let salt = uid2(64);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = SHA256(uid2(64)).toString(encBase64);
  let user = new User({
    account: {
      username,
      biography
    },
    email,
    token,
    hash,
    salt
  });
  user.save(function(err, obj) {
    if (err) {
      res.json(getJsonErr(err));
    } else {
      const { _id, token, account } = obj;
      res.json({ _id, token, account });
    }
  });
});

function isPasswordCorrect(user, password) {
  const hash = SHA256(password + user.salt).toString(encBase64);
  return hash === user.hash;
}

// Connexion
router.post("/log_in", function(req, res) {
  let { email, username, password } = req.body;
  let filters = email ? { email } : { "account.username": username };
  User.findOne(filters).exec(function(err, user) {
    if (err) {
      res.json(getJsonErr(err));
    } else if (user && isPasswordCorrect(user, password)) {
      const { _id, token, account } = user;
      res.json({ _id, token, account });
    } else {
      res.json({
        error: {
          message: "Bad user or password"
        }
      });
    }
  });
});

// Check Token
exports.checkToken = function(req, res, next) {
  let authorization = req.headers.authorization;
  const bearer = "Bearer ";
  if (!authorization || !authorization.startsWith(bearer)) {
    res.status(401).json({
      error: {
        message: "Invalid token"
      }
    });
  } else {
    User.findOne({ token: authorization.substring(bearer.length) }, function(
      err,
      user
    ) {
      if (err) {
        res.json(getJsonErr(err));
      } else {
        if (user) {
          next();
        } else {
          res.status(401).json({
            error: {
              message: "Invalid token"
            }
          });
        }
      }
    });
  }
};

// module.exports = router;
exports.router = router;
