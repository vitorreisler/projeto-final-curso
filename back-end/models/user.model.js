const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
      first: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
      surname: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      minlength: 11,
      maxlength: 14,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
      required: true,
    },
    image: {
      type: Object,
      required: true,
      url: {
        type: String,
        minlength: 11,
        maxlength: 1024,
        required: true,
      },
      alt: {
        type: String,
        minlength: 2,
        maxlength: 255,
        default: "User profile image",
      },
    },
    address: {
      type: Object,
      required: true,
      state: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
      city: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
      street: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
      houseNumber: {
        type: Number,
        minlength: 2,
        required: true,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    methods: {
      generateAuthToken() {
        return jwt.sign(
          {
            _id: this._id,
            isAdmin: this.isAdmin,
          },
          process.env.JWT_SECRET
        );
      },
    },
  }
);

const User = mongoose.model("User", userSchema, "users");
function validateUser(user) {
  const schema = Joi.object({
    first: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .min(6)
      .max(255)
      .required(),
    phone: Joi.number().required(),
    url: Joi.string().min(11).max(1024).allow(""),
    alt: Joi.string().min(2).max(255).allow(""),
    password: Joi.string().min(8).max(255).required(),
    state: Joi.string().min(2).max(255).required(),
    city: Joi.string().min(2).max(255).required(),
    street: Joi.string().min(2).max(255).required(),
    houseNumber: Joi.number().min(2).required(),
  }).required();
  //FALTA REGEX NO PASSWORD

  return schema.validate(user);
}
function validateEditUser(user) {
  const schema = Joi.object({
    first: Joi.string().min(2).max(255).allow(""),
    surname: Joi.string().min(2).max(255).allow(""),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .min(6)
      .max(255)
      .allow(""),
    phone: Joi.number().allow(""),
    url: Joi.string().min(11).max(1024).allow(""),
    alt: Joi.string().min(2).max(255).allow(""),
    password: Joi.string().min(8).max(255).allow(""),
    state: Joi.string().min(2).max(255).allow(""),
    city: Joi.string().min(2).max(255).allow(""),
    street: Joi.string().min(2).max(255).allow(""),
    houseNumber: Joi.number().min(2).allow(""),
  }).required();
  //FALTA REGEX NO PASSWORD

  return schema.validate(user);
}
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .min(6)
      .max(255)
      .required(),
    password: Joi.string().min(8).max(255).required(),
  }).required();
  //FALTA REGEX NO PASSWORD

  return schema.validate(user);
}



module.exports = {
  User,
  validateUser,
  validateEditUser,
  validateLogin,
};
