const router = require("express").Router();
const chalk = require("chalk");

const {
  Product,
  validateProduct,
  validateEditProduct,
} = require("../models/product.model");
const { auth } = require("../middlewere/auth.mw");

router.get("/category/:category", async (req, res) => {
  const product = await Product.find({ category: req.params.category }).catch(
    (err) => console.log(chalk.bgRed(err))
  );
  if (!product) {
    console.log(
      chalk.red(
        `We don't have a product with this category ${req.params.category}`
      )
    );
    res.status(400).send(
      `We don't have a product with this category ${req.params.category}`
    );
    return;
  }
  console.log(chalk.green(product));
  res.json(product);
  return;
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ productId: req.params.id }).catch(
    (err) => console.log(chalk.bgRed(err))
  );
  if (!product) {
    console.log(
      chalk.red(`We don't have a product with this ID ${req.params.id}`)
    );
    res.status(400).send(`We don't have a product with this ID ${req.params.id}`);
    return;
  }
  console.log(chalk.green(product));
  res.json(product);
  return;
});

router.get("/", async (req, res) => {
  const products = await Product.find().catch((err) =>
    console.log(chalk.bgRed(err))
  );
  if (!products) {
    res.send("No products to show");
    return;
  }
  console.log(chalk.green(products));
  res.json(products);
  return;
});

router.post("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const { error } = validateProduct(req.body);
    if (error) {
      console.log(chalk.bgRed(error.details[0].message));
      console.log(error)
      res.status(400).send(error.details[0].message);
      return;
    }

    const product = await Product.findOne({
      productName: req.body.productName,
      productSize: req.body.productSize,
    }).catch((err) => console.log(err.message));
    if (product) {
      console.log(chalk.bgRed("This product already exist"));
      res.status(400).send("This product already exist");
      return;
    }
    const newProduct = new Product({
      ...req.body,
      productImage: {
        url:
          req.body.url ??
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: req.body.alt ?? "Some Product Image",
      },
    });
    await newProduct.save();
    console.log(newProduct);

    res.json(newProduct);
    return;
  }
  console.log(chalk.bgRed("Need to be admin to access"));
  res.status(400).send("Need to be admin to access");
  return;
});

router.put("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    //validate user input
    const { error } = validateEditProduct(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    //validate system / process
    const product = await Product.findOneAndUpdate(
      { productId: req.params.id },
      {
        ...(req.body.productName && { productName: req.body.productName }),
        ...(req.body.category && { category: req.body.category }),
        ...(req.body.productDescription && {
          productDescription: req.body.productDescription,
        }),
        ...(req.body.productPrice && { productPrice: req.body.productPrice }),
        ...(req.body.available && { available: req.body.available }),
        ...(req.body.productSize && { productSize: req.body.productSize }),
        ...(req.body.url && { "productImage.url": req.body.url }),
        ...(req.body.alt && { "productImage.alt": req.body.alt }),
      },
      { new: true }
    ).catch((err) => console.log(err));
    if (!product) {
      res.status(400).send("we dont have this product");
      return;
    }

    //response
    res.json(product);
    return;
  }
  console.log(chalk.bgRed("Need to be admin to access"));
  res.status(400).send("Need to be admin to access");
  return;
});

router.patch("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ productId });

    if (!product) {
      res.status(400).send(`No product with ID ${productId}`);
      return;
    }

    // Check if user already likes the product
    const userLikesProduct = product.likes.includes(req.user._id);

    if (userLikesProduct) {
      // If user likes the product, unlike it
      const update = {
        $pull: { likes: req.user._id },
      };

      const unlikedProduct = await Product.findOneAndUpdate(
        { productId },
        update,
        { new: true }
      );

      console.log(chalk.green(unlikedProduct));
      res.json(unlikedProduct);
    } else {
      // If user doesn't like the product, like it
      const update = {
        $addToSet: { likes: req.user._id },
      };

      const likedProduct = await Product.findOneAndUpdate(
        { productId },
        update,
        { new: true }
      );

      console.log(chalk.green(likedProduct));
      res.json(likedProduct);
    }
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const product = await Product.findOneAndDelete({
      productId: req.params.id,
    }).catch((err) => console.log(chalk.bgRed(err)));
    if (!product) {
      res.status(400).send(`The product ${req.params.id} does not exist `);
      return;
    }
    console.log(chalk.green(product));
    res.json(product);
    return;
  }
  console.log(chalk.bgRed("Need to be admin to access"));
  res.status(400).send("Need to be admin to access");
});

module.exports = router;
