// Get user info

const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User NOt Found"
      });
    }
    // hidden password
    user.password = undefined;
    // respoinse

    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User Api ",
      error
    });
  }
};

module.exports = { getUserController };
