// Get user info

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
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

// Upadte user

const updateUserController = async (req, res) => {
  const id = req.body.id;



  // console.log(id);

  try {
    const user = await userModel.findById({ _id: id });
    //  validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found"
      });
    }

    // update

    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save user

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Update successfully"
    });
  } catch (error) {
    console.log(error);
   return res.status(500).send({
      success: false,
      message: "Error in update Api"
    });
  }
};
// update password 

const updatepassword = async(req,res) => {

  try {
    
    const {email,newpassword} = req.body

    if(!email || !newpassword){
    return  res.status(500).send({
        success: false,
        message: "All fields are require"
      });

    }

    const user = await userModel.findOne({email})

if(!user){
  return res.status(429).send({
    success: false,
    message: "This email not exist"
  });

}

let salt = bcrypt.genSaltSync(10);
const haspassword = await bcrypt.hash(newpassword, salt);

user.password = haspassword;

await user.save();
res.status(200).send({
success:true,
message :"Passowrd reset successfully"

})


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in update password Api"
    })
  }

}


module.exports = { getUserController, updateUserController , updatepassword};
