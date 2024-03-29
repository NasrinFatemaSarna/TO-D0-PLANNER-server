var jwt = require("jsonwebtoken");

const UserModel = require ('../models/UsersModel')
const OtpModel = require ('../models/OtpModel')
const SendEmailUtility = require ('../utility/SendEmailUtility')


// registration start

exports.Registration = async (req, res)=>{
try {
  const reqBody = req.body;
  const user = await UserModel.create(reqBody);
  res.status(200).json({status: 'success', data: user});
}
catch (error) {
  res.status(200).json({status: 'fail', data: error});
}
};



// registration end


// login start

exports.Login = async (req, res)=>{
  try {
    const reqBody = req.body;
    let user = await UserModel.findOne({email: reqBody.email});

    if(!user){
      res.status(200).json({status: 'fail', data: 'user not found'});
    }

    if(user.password !== reqBody.password){
      res.status(200).json({status: 'fail', data: 'wrong password'});
    }
    else {
      let payload = {exp: Math.floor(Date.now() / 1000) + (60 * 60), data: user['email'] };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).json({ status: 'success', data: user, token: token });
     
  }

}
   
  catch (error) {
    res.status(200).json({status: 'fail', data: error});
  }

};



// login end


// profile update start
exports. profileUpdate = async (req, res)=>{
  try {
   let email = req.headers.email
   let body = req.body
   let query = {email: email}
   let user = await UserModel.updateOne(query, body)
   res.status(200).json({status: 'success', data: user});
  }
  
  catch (error) {
    res.status(200).json({status: 'fail', data: error});
  }
}



// // profile update end

// exports profile details start
exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers.email
    let user = await UserModel.findOne({email: email})
      res.status(200).json({status: 'success', data: user});

}

catch (error) {
  res.status(200).json({status: 'fail', data: error});
}
}

// profile details end

// recover and verify send email otp start

exports.recoverVerifyEmail= async (req, res) => {
  let email = req.params.email;
  let otp = Math.floor(Math.random() * 1000000);

  try {
      let user = await UserModel.findOne({ email: email });

      if (!user) {
          return res.status(200).json({ status: 'fail', data: 'User not found' });
      }
      else{
        let createOtp = await OtpModel.create({ email: email, otp: otp });

        let sendEmail = await SendEmailUtility(email, `Your OTP is ${otp}`, 'To-do-Planner Password Verify');
  
        return res.status(200).json(({ status: 'success', data: "otp send successfully" }))
      }


     
  } 
  catch (error) {
      console.error(error);
      res.status(200).json({ status: 'fail', data: error.message });
  }
};
// recover and verify send email otp end

// verify otp start

exports.verifyOtp = async (req, res) => {
  let email = req.params.email;
  let otp = req.params.otp;
  let status = 0;
  let updateStatus = 1;

  try {
      let otpCheck = await OtpModel.aggregate(
        [
          { $match: { email: email, otp: otp, status: status } },
          { $count: 'total' }
      ]
      );

      if (otpCheck.length > 0) {
          let otpUpdate = await OtpModel.updateOne({ email: email, otp: otp }, { status: updateStatus });
         return res.status(200).json({ status: 'success', data: otpUpdate });
      }


          
        
       else {
         return res.status(200).json({ status: 'fail', data: 'Otp not matched' });
      }
  } catch (error) {
      console.error(error);
      res.status(200).json({ status: 'fail', data: error.message });
  }
};
// verify otp end

// reset password start
exports.ResetPassword = async (req, res) => {
  let email = req.body.email;
  let otp = req.body.otp;
  let status = 0;
  let updateStatus = 1;
  let newPassword = req.body.password;

  try{

    let otpCheck = await OtpModel.aggregate(
      [
        { $match: { email: email, otp: otp, status: updateStatus } },
        { $count: 'total' }
      ]
    );
    if(otpCheck.length > 0){
      let updatePassword = await UserModel.updateOne({ email: email }, { password: newPassword });
      return res.status(200).json({ status: 'success', data: updatePassword });
    }
    else{
      return res.status(200).json({ status: 'fail', data: 'Otp not matched' });
    }

  }

  catch(error){
    res.status(200).json({ status: 'fail', data: error });

  }


  
}



// otp reset password end

                                                                                                                                                                                    