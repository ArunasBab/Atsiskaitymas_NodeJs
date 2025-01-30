import userModel from "../models/userModel.js";

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({}, { __v: 0 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id, { __v: 0 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createNewUser(req, res) {
  const { name, email, age } = req.body;

  try {
    const newUser = new userModel({
      name,
      email,
      age,
    });

    const userResponse = await newUser.save();

    res.json(userResponse);
  } catch (error) {
    if (error.errors.model.name === "ValidatorError") {
      res.status(400).json({ error: "User validation failed" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function updateUserById(req, res) {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.age = age;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;

  try {
    const deleteUser = await userModel.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
