let express = require("express");
let User = require("../models/User");

let router = express.Router();

function getJsonErr(err) {
  return {
    error: {
      message: err
    }
  };
}

router.post("/edit", function(req, res) {
  let { id } = req.body;
  User.findOne({ _id: id }).exec(function(err, user) {
    if (err) {
      res.json(getJsonErr(err));
    } else if (user) {
      user.set(req.body);
      user.save(function(err, updatedUser) {
        if (err) {
          res.json(getJsonErr(err));
        } else if (updatedUser) {
          res.json(updatedUser);
        } else {
          res.json({
            error: {
              message: "User not found"
            }
          });
        }
      });
    } else {
      res.json({
        error: {
          message: "User not found"
        }
      });
    }
  });
});

// Connexion
router.get("/:id", function(req, res) {
  let { id } = req.params;
  User.findOne({ _id: id }).exec(function(err, user) {
    if (err) {
      res.json(getJsonErr(err));
    } else if (user) {
      const { _id, account } = user;
      res.json({ _id, account });
    } else {
      res.json({
        message: "User not found"
      });
    }
  });
});

module.exports = router;
