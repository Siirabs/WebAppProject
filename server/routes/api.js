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
/* GET home page. */

router.get("/private", validateToken, (req, res, next) => {
  res.json({
    email: req.email,
  });
});

router.post("/comment", validateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    const snippet = await Snippet.findOne({ snippetId: req.body.snippetId });
    const comment = await Comment.findOne({ comment: req.body.comment });
    if (comment) {
      await Comment.updateOne(
        { user: comment.user },
        { snippetId: comment.snippetId },
        { $push: { comment: { $each: req.body.comment } } },
        { commentId: comment.commentId }
      );
    } else {
      await new Comment({
        user: user._id,
        snippetId: req.body.snippetId,
        comment: req.body.comment,
        commentId: idGen(),
      }).save();
    }
    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
});

router.get("/snippets", async (req, res, next) => {
  var snippets = await Snippet.find({});
  res.json(snippets);
});

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

router.post("/snippet", validateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    const snippet = await Snippet.findOne({ snippet: req.body.snippet });
    console.log(req.body.snippet);
    if (snippet) {
      await Snippet.updateOne(
        { user: snippet.user },
        { snippetId: snippet.snippetId },
        { $push: { snippet: { $each: req.body.snippet } } }
      );
    } else {
      await new Snippet({
        user: user._id,
        title: req.body.title,
        snippet: req.body.snippet,
        snippetId: idGen(),
      }).save();
    }
    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong");
  }
});

let idGen = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

module.exports = router;
