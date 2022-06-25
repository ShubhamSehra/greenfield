require ('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

app = express();

app.use(cors());

app.use(express.json());

//*** db has my id passs  **** */
const PORT = process.env.PORT || 3001

const db =  process.env.MONGODB_KEY || process.env.SERVER_KEY;

mongoose.connect(db);

mongoose.connection.on('connected',() =>{
  console.log("mongooose is connected");
})

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
  photo: String,
});

const students = mongoose.model("students", studentSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./frontend/public/photos");
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/newentry", upload.single("photo"), (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const fathername = req.body.fathername;
  const occupation = req.body.occupation;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const enrollDate = req.body.enrollDate;
  const stndrd = req.body.stndrd;
  const phone = req.body.phone;
  const address = req.body.address;
  const photo = req.file.filename;

  const newStudents = new students({
    fname: fname,
    lname: lname,
    fathername: fathername,
    occupation: occupation,
    dob: dob,
    gender: gender,
    enrollDate: enrollDate,
    stndrd: stndrd,
    phone: phone,
    address: address,
    photo: photo,
  });
  newStudents.save();
  res.redirect("/");
});

app.get("/students", (req, res) => {
  students.find().then((foundUser) => res.json(foundUser));
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.put("/students/update", upload.single("studentphoto"), async (req, res) => {
  const datatopass = {
    id: req.body.id,
    fname: req.body.fname,
    lname: req.body.lname,
    fathername: req.body.fathername,
    occupation: req.body.occupation,
    dob: req.body.dob,
    gender: req.body.gender,
    stndrd: req.body.stndrd,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.filename,
};


  const connectData = {
    fname: datatopass.fname,
    lname: datatopass.lname,
    fathername: datatopass.fathername,
    fathername: datatopass.fathername,
    occupation: datatopass.occupation,
    dob: datatopass.dob,
    gender: datatopass.gender,
    stndrd: datatopass.stndrd,
    phone: datatopass.phone,
    photo: datatopass.photo,
    address: datatopass.address,
  };

  await students
    .findByIdAndUpdate(datatopass.id, connectData)
    .then((founditem) => res.json(founditem));
});

app.delete("/students/delete/:id", async (req, res) => {
  const id = req.params.id;
  await students.findByIdAndRemove(id).exec();
  res.send("/");
});

if (process.env.MONGODB_KEY === 'production'){
  app.use(express.static('frontend/build'))
}

app.listen(PORT, (req, res) => {
  console.log("we are online at 3001");
});
