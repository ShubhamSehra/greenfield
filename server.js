require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const studentModel = require("./model");
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//*** db has my id passs  **** */
const PORT = process.env.PORT || 3001;

const db = process.env.MONGODB_KEY || process.env.SERVER_KEY;

mongoose.connect(db);

// const studentSchema = new mongoose.Schema({
//   fname: String,
//   lname: String,
//   fathername: String,
//   occupation: String,
//   dob: String,
//   gender: String,
//   enrollDate: String,
//   stndrd: Number,
//   phone: Number,
//   address: String,
//   photo: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// const students = mongoose.model("students", studentSchema);

mongoose.connection.on("connected", () => {
  console.log("mongooose is connected");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// *********** app-post methods #1 ************

app.post("/api/postuser", upload.single("photo"), (req, res) => {

  try {

    const studentObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      fathername: req.body.fathername,
      occupation: req.body.occupation,
      dob: req.body.dob,
      gender: req.body.gender,
      enrollDate: req.body.enrollDate,
      stndrd: req.body.stndrd,
      phone: req.body.phone,
      address: req.body.address,
      photo: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
  

    studentModel.create(studentObj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
      }
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});



app.get("/students", (req, res) => {
  studentModel.find().then((foundUser) => res.json(foundUser));
});

app.put("/api/update", upload.single("photo"), async (req, res) => {
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

  await studentModel
    .findByIdAndUpdate(datatopass.id, connectData)
    .then((founditem) => res.json(founditem))
    .catch((err) => console.log(err));
});

app.delete("/students/delete/:id", async (req, res) => {
  const id = req.params.id;
  await studentModel.findByIdAndRemove(id).exec();
  res.send("/");
});

app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});
if (process.env.NODE_ENV === "production") {
}

app.listen(PORT, (req, res) => {
  console.log(`we are online at ${PORT}`);
});
