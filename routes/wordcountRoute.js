let express = require("express");
let Wordcount = require("../models/Wordcount");

let router = express.Router();

const nbCharByLine = 80;

function getJsonErr(message) {
  return {
    error: {
      message
    }
  };
}

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
}

function wrapText(text) {
  let wrapped = "";
  let index = 0;

  const ponctuation = [",", ".", "!", "?", " "];
  while (index + nbCharByLine < text.length) {
    wrapped += text.substring(index, index + nbCharByLine);
    if (
      ponctuation.indexOf(text[index + nbCharByLine - 1]) < 0 &&
      ponctuation.indexOf(text[index + nbCharByLine]) < 0
    ) {
      wrapped += "-";
    }
    wrapped += "\n";
    index += nbCharByLine;
  }
  wrapped += text.substring(index, text.length);
  return wrapped;
}

router.post("/api/word-wrap", function(req, res) {
  let { text } = req.body;
  let authorization = req.headers.authorization;
  let token = authorization.substring("Bearer ".length);
  let date = getCurrentDate();
  let nbWords = text.split(" ").length;
  const maxNbWordsPerDay = Number(process.env.MAX_NB_WORDS_BEFORE_PAYING);

  Wordcount.findOne({ token, date }).exec(function(err, wordcount) {
    if (err) {
      res.json(getJsonErr(err));
    } else if (wordcount) {
      if (wordcount.counter + nbWords > maxNbWordsPerDay) {
        res.status(402).json({
          error: {
            message: "Payment Required"
          }
        });
        return;
      }
      let counter = wordcount.counter + nbWords;
      wordcount.set({
        counter
      });
    } else {
      wordcount = new Wordcount({
        counter: nbWords,
        token,
        date
      });
    }

    wordcount.save(function(err, elt) {
      if (err) {
        res.json(getJsonErr(err));
      } else {
        let wrapped = wrapText(text);
        res.json(wrapped);
      }
    });
  });
});

module.exports = router;
