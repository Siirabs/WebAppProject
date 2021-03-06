var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Snippet = require("../models/Snippet");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");

const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Post a new comment
router.post("/comment", validateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    const snippet = await Snippet.findOne({ snippetId: req.body.snippetId });
    const comment = await Comment.findOne({ comment: req.body.comment });

    await new Comment({
      user: user._id,
      snippetId: req.body.snippetId,
      comment: req.body.comment,
      commentId: idGen(),
    }).save();

    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
});

//Get comments for specific snippet
router.get("/comments/:snippetId", async function (req, res, next) {
  const { snippetId } = req.params;
  await Comment.find({ snippetId: req.params.snippetId }, (err, comment) => {
    if (err) {
      if (err.name === "CastError") {
        return res.json({ error: "comment not found" });
      }
      return next(err);
    }
    if (comment) {
      return res.json(comment);
    } else {
      return res.json({ error: "comment not found" });
    }
  });
});

//Get all snippets
router.get("/snippets", async (req, res, next) => {
  var snippets = await Snippet.find({});
  res.json(snippets);
});

//Get specific snippet with snippetId from params
router.get("/snippet/:snippet", async function (req, res, next) {
  const snippet = await Snippet.findOne(
    { snippetId: req.params.snippet },
    (err, snippet) => {
      if (err) {
        if (err.name === "CastError") {
          return res
            .status(404)
            .send(`Snippet ${req.params.snippet} not found`);
        }
        return next(err);
      }
      if (snippet) {
        return res.json(snippet);
      } else {
        return res.status(404).send(`Book ${req.params.snippet} not found`);
      }
    }
  );
});

//Post a new snippet
router.post("/snippet", validateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    const snippet = await Snippet.findOne({ snippet: req.body.snippet });
    console.log(req.body.snippet);

    await new Snippet({
      user: user._id,
      title: req.body.title,
      snippet: req.body.snippet,
      snippetId: idGen(),
    }).save((err, snippet) => {
      if (err) {
        return next(err);
      } else {
        return res.json(snippet);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
});

//Generates a random id for snippets and comments
let idGen = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

module.exports = router;
