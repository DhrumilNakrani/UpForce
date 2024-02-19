const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/Users");

userRouter.post("/create", async (req, res) => {
  const { firstName, lastName, email, mobile, gender, status, file, address } = req.body;

  const newUser = new userModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,
    gender: gender,
    status: status,
    image: file,
    address: address
  });

  try {
    await newUser.save();
    res.status(201).json({message: "user created successfully", newUser});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

userRouter.get("/", async (req, res) => {
  await userModel.find({})
    .then(users => {
      res.json(users)
    })
    .catch(err => res.json(err))
})

userRouter.get('/getUser/:id', async (req, res) => {
  const id = req.params.id;
  await userModel.findById({ _id: id })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err))
})

userRouter.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let obj = {};
  for(let d in data) {
    if(data[d] !== '' || data[d] !== undefined) {
      obj[d] = data[d];
    }
  }

  await userModel.findByIdAndUpdate({ _id: id }, obj)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
})

userRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete({ _id: id })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
})

module.exports = userRouter;