var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
              expiresIn: 12000,
            },
            (err, token) => {
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
    min: 1,
  }) /*.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]\|\\;:"<>,.\/\?]).{8,}$/)*/,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ message: "Password is not strong enough" });
    }
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
