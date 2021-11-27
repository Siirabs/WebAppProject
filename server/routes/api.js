var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
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
    const snippet = await Snippet.findOne({ snippet: snippet._id });
    const comment = await Comment.findOne({ comment: user._id });
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
        snippetId: snippet._id,
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

router.get("/snippet", (req, res, next) => {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  var snippets = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("projectdb");
    dbo
      .collection("snippets")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        snippets = result;
        db.close();
      });
  });
  console.log(snippets);
  return { snippets };
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

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", upload.none(), (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email,
          };
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 1200,
            },
            (err, token) => {
              console.log(token);
              res.json({ success: true, token });
            }
          );
        } else {
          return res.status(403).json({ message: "Invalid credentials" });
        }
      });
    }
  });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post(
  "/register",
  upload.none(),
  body("email").isEmail().trim().escape(),
  body("password").isLength({
    min: 8,
  }) /*.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]\|\\;:"<>,.\/\?]).{8,}$/)*/,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ message: "Password is not strong enough" });
    }
    console.log(req.body);
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.status(403).json({ message: "Email already in use" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.create(
              {
                email: req.body.email,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.send({});
              }
            );
          });
        });
      }
    });
  }
);

module.exports = router;
