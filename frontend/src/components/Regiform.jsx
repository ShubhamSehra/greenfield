import React, { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import "./background.css";

import swal from "sweetalert";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Regiform(props) {
  const [info, setInfo] = useState(props.id ? props.studentData : {});

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  // ******************* Handle Submit **********************

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(event.currentTarget);
    const imagefile = document.querySelector("#image");
    const data = {
      fname: info.fname,
      lname: info.lname,
      fathername: info.fathername,
      occupation: info.occupation,
      dob: info.dob,
      gender: info.gender,
      enrollDate: info.enrollDate,
      stndrd: info.stndrd,
      phone: info.phone,
      address: info.address,
      photo: imagefile.files[0],
    };

    if (props.id) {
      return handleEdit(event);
    }

    if (form.checkValidity() === false) {
      swal("Student Not Enrolled!", "", "error");
      event.preventDefault();
      event.stopPropagation();
    } else {
      swal("Student Enrolled!", "", "success");
      axios.post("/api/postuser", data, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(()=> {navigate("/")});
      
    }

    setValidated(true);
  };
  // ************ Handling Edit **********************************
  const handleEdit = async(e) => {
    const imagefile = document.querySelector("#image");
    
    const studata = {
      id: props.id,
      fname: info.fname,
      lname: info.lname,
      fathername: info.fathername,
      occupation: info.occupation,
      dob: info.dob,
      gender: info.gender,
      stndrd: info.stndrd,
      phone: info.phone,
      address: info.address,
      photo: imagefile.files[0],
    };
    try {
      
      swal({
        title: "Profile updated!",
        icon: "success",
      })
      await axios.put("/api/update", studata, {headers: {"Content-Type": "multipart/form-data"}}).then(()=> {navigate(-1)});
      
    } catch (error) {
      console.log(error)
    }
      
  };

  let d = new Date();
  let today = d.toLocaleDateString("en-IN");

  return (
    <div className="form-adj">
      <div>
        {props.id ? (
          <h1 className="fs-2 title">Edit Student</h1>
        ) : (
          <h1 className="fs-2 title">Enroll New Student</h1>
        )}
      </div>
      <Form onSubmit={handleSubmit}  validated={validated}>
        <Container>
          <Row>
          <Col sm>

            <Input
              type="text"
              value={info.fname}
              changes={hanldeChange}
              placeholder="First Name"
              name="fname"
            />

          </Col>
          <Col sm>

            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Last Name"
              name="lname"
              value={info.lname}
            />
          </Col>

          </Row>
          <Row>
          <Col sm>

            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Father's Name"
              name="fathername"
              value={info.fathername}
            />
          </Col>

          <Col sm>

            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Father's Occupation"
              name="occupation"
              value={info.occupation}
            />

          </Col>

          </Row>

          <Row>
          <Col sm>

            <Input
              type="date"
              changes={hanldeChange}
              placeholder="D.O.B"
              name="dob"
              value={info.dob}
            />

          </Col>

            <Col sm>
              <Form.Select
                aria-label="Gender"
                size="lg"
                required
                name="gender"
                value={info.gender}
                onChange={hanldeChange}
              >
                <option>Gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col sm>
              {!props.id && (
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enroling date"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="enrollDate"
                    readOnly
                    value={today}
                    onChange={hanldeChange}
                  />
                </FloatingLabel>
              )}
            </Col>
            <Col sm>
              <Form.Select
                aria-label="Classes"
                required
                name="stndrd"
                size="lg"
                value={info.stndrd}
                onChange={hanldeChange}
              >
                <option>Class</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
          <Col sm>

            <Input
              type="number"
              changes={hanldeChange}
              placeholder="Mobile Number"
              name="phone"
              value={info.phone}
            />
          </Col>

            <Col sm>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Student's Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  size="md"
                  id="image"
                  onChange={hanldeChange}
                  required
                />
              </Form.Group>
            </Col>

            <Row>
              <Col sm>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Permanent Address</Form.Label>
                  <Form.Control
                    name="address"
                    required
                    as="textarea"
                    rows={3}
                    value={info.address}
                    onChange={hanldeChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Row>
          {!props.id ? (
            <div className="adj-btn">
              <button
                // onClick={handleSubmit}
                type="submit"
                className="btn btn-outline-success btn-lg m-3"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-outline-success btn-lg m-3"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="adj-btn">
              <button
                className="btn btn-outline-success btn-lg m-3"
                type="submit"
                // onClick={() => handleEdit}
              >
                Update
              </button>
            </div>
          )}
        </Container>
      </Form>
    </div>
  );
}

export default Regiform;
