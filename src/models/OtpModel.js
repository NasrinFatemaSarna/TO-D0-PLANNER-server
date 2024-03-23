const mongoose = require('mongoose')
const otpSchema = new mongoose.Schema(
    {
    Email: {type: String},
    otp: {type: String},
    status: {type: Number, default: 0},
    cratedDate: {type: Date, default: Date.now()}
},

{ versionKey: false});

const OtpModel = mongoose.model('otps', otpSchema)
module.exports = OtpModel