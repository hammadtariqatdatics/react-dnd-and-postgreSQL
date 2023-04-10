const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const { emailHandler } = require("../../middleware/auth");
const { User } = db;
const { validateUserRequestHandler } = require("../../middleware/validate");

// Retrieve all Users
router.get("/", async (req, res) => {
  try {
    const data = await User.findAll({
      // order: [["position", "ASC"]],
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(400)
        .send({ message: "There is some error in getting Users data" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update a User with id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { position } = req.body;

  const updatedUser = {
    position: position,
  };

  try {
    const num = await User.update(updatedUser, {
      where: { id: id },
    });

    if (num == 1) {
      res.status(200).send({
        message: "User was updated successfully.",
      });
    } else {
      res.status(400).send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete a User with id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const num = await User.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(200).send({
        message: "User was deleted successfully!",
      });
    } else {
      res.status(400).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Create a new User
router.post(
  "/create",
  validateUserRequestHandler,
  emailHandler,
  async (req, res) => {
    try {
      const { name, email, phone, position } = req.body;
      // Save User in the database
      const data = await User.create({
        name: name,
        email: email,
        phone: phone,
        position: position,
      });
      res
        .status(200)
        .send({ message: "User created successfully...", data: data });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

module.exports = router;
