const mongoose = require("mongoose");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  productDescription: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    required: true,
  },
  productId: {
    type: String,
    default: uuidv4,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productSize: {
    type: String,
    enum: ["P", "M", "G", "XL"],
    required: true,
  },
  productImage: {
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
  category:{
    type:String,
    required:true
  },
  available:{
    type: Number,
    required:true,
    default:0,
  },
  likes:[
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Product = mongoose.model("Product", productSchema, "products");

function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(2).max(255).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    productPrice: Joi.number().required(),
    available: Joi.number().valid(-1,0).required(),
    url: Joi.string().min(11).max(1024).allow(""),
    alt: Joi.string().min(2).max(255).allow(""),
    category: Joi.string().valid("hat","sneakers","sunglasses").required(),
    productSize: Joi.string().valid("P", "M", "G", "XL").required(),
  }).required();
  return schema.validate(product)
}

function validateEditProduct(product){
  const schema = Joi.object({
    productName: Joi.string().min(2).max(255).allow(""),
    productDescription: Joi.string().min(2).max(1024).allow(""),
    productPrice: Joi.number().allow(""),
    available: Joi.number().valid(-1,0).allow(""),
    url: Joi.string().min(11).max(1024).allow(""),
    alt: Joi.string().min(2).max(255).allow(""),
    category: Joi.string().valid("hat","sneakers","sunglasses").allow(""),
    productSize: Joi.string().valid("P", "M", "G", "XL").allow(""),
  }).required()
  return schema.validate(product)

}

module.exports = {
  Product,
  validateProduct,
  validateEditProduct,
};
