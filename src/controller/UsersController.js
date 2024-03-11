var jwt = require('jsonwebtoken');

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
      res.status(200).json({status: 'fail', data: 'password not match'});
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
  const email = req.params.email;
  const otp = Math.floor(Math.random() * 10000);

  try {
      const user = await UserModel.findOne({ email: email });

      if (!user) {
          return res.status(200).json({ status: 'fail', data: 'User not found' });
      }

      const createOtp = await OtpModel.create({ email: email, otp: otp });

      const sendEmail = await SendEmailUtility(email, `Your OTP is ${otp}`, 'Todo Planner Password Verify');

      res.status(200).json({ status: 'success', data: { email: email }, message: 'OTP sent successfully' });
  } catch (error) {
      console.error(error);
      res.status(200).json({ status: 'fail', data: error.message });
  }
};
// recover and verify send email otp end

// verify otp start

exports.verifyOtp = async (req, res) => {
  const email = req.params.email;
  const otp = req.params.otp;
  const status = 0;
  const updateStatus = 1;

  try {
      const otpCheck = await OtpModel.aggregate([
          { $match: { email: email, otp: otp, status: status } },
          { $count: 'total' }
      ]);

      if (otpCheck.length > 0) {
          const otpUpdate = await OtpModel.updateOne({ email: email, otp: otp }, { status: updateStatus });

          if (otpUpdate.nModified > 0) {
              res.status(200).json({ status: 'success', data: { updatedOtp: otpUpdate } });
          } else {
              res.status(200).json({ status: 'fail', data: 'OTP not updated' });
          }
      } else {
          res.status(200).json({ status: 'fail', data: 'OTP not matched' });
      }
  } catch (error) {
      console.error(error);
      res.status(200).json({ status: 'fail', data: error.message });
  }
};
// verify otp end

// reset password start
const OTP_STATUS_VERIFIED = 1;

exports.ResetPassword = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;

    try {
        const otpVerificationResult = await verifyOtp(email, otp, OTP_STATUS_VERIFIED);

        if (otpVerificationResult.success) {
            // Proceed with password reset logic
            // ...

            res.status(200).json({ status: 'success', data: 'Password reset successful' });
        } else {
            // OTP verification failed
            res.status(200).json({ status: 'fail', data: 'OTP not matched' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'fail', data: error.message });
    }
};

// Reusable function for OTP verification
async function verifyOtp(email, otp, updateStatus) {
    try {
        const otpCheck = await OtpModel.aggregate([
            { $match: { email: email, otp: otp, status: updateStatus } },
            { $count: 'total' }
        ]);

        if (otpCheck.length > 0) {
            const otpUpdate = await OtpModel.updateOne({ email: email, otp: otp }, { status: updateStatus });

            return { success: true, updatedOtp: otpUpdate };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
                                                                                                                                                                                    