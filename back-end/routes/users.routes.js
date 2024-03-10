const router = require("express").Router();
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  User,
  validateUser,
  validateEditUser,
  validateLogin,
} = require("../models/user.model");
const { auth } = require("../middlewere/auth.mw");

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .catch((err) => console.log(err));
  if (!user) {
    res
      .status(400)
      .send(`We sorry but the user with ID ${req.params.id} not found`);
    return;
  }
  console.log(chalk.green(user));
  res.json(user);
});

router.get("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.find().select("-password");
    if (!users) {
      res.send("No users to show");
      return;
    }

    res.json(users);
    return;
  }
  res.status(400).send("Need to be Admin to continue");
});

router.post("/login", async (req, res) => {
  //validate user input
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invalid email ");
    console.log(chalk.bgRed("Invalid email"));
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).send("Invalid password");
    console.log(chalk.bgRed("Invalid password"));
    return;
  }
  //process
  const token = user.generateAuthToken();
  console.log(chalk.green("You got a token"));

  //response
  res.json({ token });
});

router.post("/", async (req, res) => {
  //validate user input
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const user = await User.findOne({ email: req.body.email }).catch((err) =>
    console.log(err.message)
  );
  if (user) {
    console.log(chalk.bgRed("User already exist"));
    res.status(400).send("User already exist");
    return;
  }

  //process
  const newUser = new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12),
    name: {
      first: req.body.first,
      surname: req.body.surname,
    },
    image: {
      url:
        req.body.url ??
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      alt: req.body.alt ?? "User Image",
    },
    address: {
      state: req.body.state,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
    },
  });
  await newUser.save();

  //response
  res.json(_.pick(newUser, ["_id", "name", "email", "phone"]));
});

router.put("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const users = await User.findOne({ email: req.body.email }).catch((err) =>
    console.log(err.message)
  );
  if (users) {
    console.log(chalk.bgRed("User already exist"));
    res.status(400).send("User already exist");
    return;
  }
    const change = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 12),
        ...(req.body.first && { "name.first": req.body.first }),
        ...(req.body.surname && { "name.surname": req.body.surname }),
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.phone && { phone: req.body.phone }),
        ...(req.body.state && { "address.state": req.body.state }),
        ...(req.body.city && { "address.city": req.body.city }),
        ...(req.body.street && { "address.street": req.body.street }),
        ...(req.body.houseNumber && {
          "address.houseNumber": req.body.houseNumber,
        }),
        ...(req.body.url && { "image.url": req.body.url }),
        ...(req.body.alt && { "image.alt": req.body.alt }),
      },
      { new: true }
    );
    return res.status(200).json(change);
    
  }

  const { error } = validateEditUser(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  const users = await User.findOne({ email: req.body.email }).catch((err) =>
    console.log(err.message)
  );
  if (users) {
    console.log(chalk.bgRed("User already exist"));
    res.status(400).send("User already exist");
    return;
  }
  if (req.params.id !== req.user._id) {
    res.status(400).send("You cannot edit another User");
    return;
  }
    const change = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 12),
        ...(req.body.first && { "name.first": req.body.first }),
        ...(req.body.surname && { "name.surname": req.body.surname }),
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.phone && { phone: req.body.phone }),
        ...(req.body.state && { "address.state": req.body.state }),
        ...(req.body.city && { "address.city": req.body.city }),
        ...(req.body.street && { "address.street": req.body.street }),
        ...(req.body.houseNumber && {
          "address.houseNumber": req.body.houseNumber,
        }),
        ...(req.body.url && { "image.url": req.body.url }),
        ...(req.body.alt && { "image.alt": req.body.alt }),
      },
      { new: true }
    );
    return res.status(200).json(change);
});

router.patch("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const user = await User.findOne({ _id: req.params.id }).catch((err) =>
      console.log(err.message)
    );
    if (!user) {
      res.status(400).send("No such User for this ID");
      return;
    }
    const turnAdmin = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isAdmin: !user.isAdmin },
      { new: true }
    )
      .select("-password")
      .catch((err) => console.log(err.message));
    //console.log(turnAdmin);
    res.json(turnAdmin);
    return;
  }

  res.status(400).send("Need to be admin to continue");
  return;
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    const user = await User.findOne({ _id: req.params.id })
      .select("-password")
      .catch((err) => console.log(err.message));
    if (!user) {
      res.status(400).send("User not found");
      return;
    }
    await user.deleteOne().select("-password");
    res.json(user);
    return;
  }

  const user = await User.findOne({ _id: req.params.id })
    .select("-password")
    .catch((err) => console.log(err.message));
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  if (req.params.id !== req.user._id) {
    console.log(user._id);
    console.log(req.user._id);
    res.status(400).send("You cannot delete another User");
    return;
  }
  const deleteUser = await User.deleteOne({ _id: req.user._id }).select(
    "-password"
  );
  console.log(user);

  res.json(user);

  return;
});

module.exports = router;
