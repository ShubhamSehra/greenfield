const mongoose = require ('mongoose')

const studentSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    fathername: String,
    occupation: String,
    dob: String,
    gender: String,
    enrollDate: String,
    stndrd: Number,
    phone: Number,
    address: String,
    photo: {
      data: Buffer,
      contentType: String,
    },
  });

  module.exports = new mongoose.model("students", studentSchema);