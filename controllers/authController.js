const userModel = require("../models/userModel");

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
    // create new user

    const addUser = await userModel.create({
      userName,
      email,
      password,
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

const loginController = async (req,res) => {



  try {
    const { email, password } = req.body;
    // validate email and password
console.log("hiii")
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide right email and password"
      });
    }

    // check user
    const user = await userModel.findOne({ email: email, password: password }).select("-password");

    console.log(user);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "USer not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Login sucessfully",
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
