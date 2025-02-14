const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")
// register function \
const registerController = async (req, res) => {
  try {
    const { userName, password, email, address, phone } = req.body;
    // validation

    if (!userName || !password || !email || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields"
      });
    }
    // check user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registerd please Login"
      });
    }
    // password hassing here

    let salt = bcrypt.genSaltSync(10);
    const haspassword = await bcrypt.hash(password, salt);

    // create new user

    const addUser = await userModel.create({
      userName,
      email,
      password: haspassword,
      address,
      phone
    });
    res.status(200).send({
      success: true,
      message: "New user Successfully Registerd",
      addUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error  In Register Api",
      error
    });
  }
};

// login function

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate email and password

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide right email and password"
      });
    }

    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found"
      });
    }

    // check user password | compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials"
      });
    }
// token 
const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{

  expiresIn: "7d"
});

    user.password=undefined

    res.status(200).send({
      success: true,
      message: "Login sucessfully",
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error  In login Api",
      error
    });
  }
};
module.exports = { registerController, loginController };
