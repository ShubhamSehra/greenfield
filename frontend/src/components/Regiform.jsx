import React, { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import "./background.css";

import swal from "sweetalert";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Regiform(props) {
  const [info, setInfo] = useState(props.id ? props.studentData : {});

  // const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  // ******************* Handle Submit **********************

  const handleSubmit =  (event) => {
    // const form = event.currentTarget;
    // event.preventDefault();

    console.log(info.fname, info);

     axios.post("/api/newentry", {
      fname : info.fname,
      lname : info.lname,
      fathername : info.fathername,
      occupation : info.occupation,
      dob : info.dob,
      gender : info.gender,
      enrollDate : info.enrollDate,
      stndrd : info.stndrd,
      phone : info.phone,
      address : info.address,
      photo : info.photo,
    }).then(res => console.log('posting data', res)).catch(err => console.log(err))
    // if (form.checkValidity() === false) {
    //   swal("Student Not Enrolled!", "", "error");
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   swal("Student Enrolled!", "", "success");
    // }

    // setValidated(true);
  };
  // ************ Handling Edit **********************************
  const handleEdit = async (e) => {
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
      photo: info.photo,
      address: info.address,
    };

    await axios.put("/api/update", studata);
    await swal({
      title: "Profile updated!",
      icon: "success",
      button: "Ok",
    })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <Form
        // action=""
        // method="POST"
        encType="multipart/form-data"
        // noValidate
        // validated={validated}
        
      >
        <Container>
          <Row>
            <Input
              type="text"
              value={info.fname}
              changes={hanldeChange}
              placeholder="First Name"
              name="fname"
            />

            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Last Name"
              name="lname"
              value={info.lname}
            />
          </Row>
          <Row>
            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Father's Name"
              name="fathername"
              value={info.fathername}
            />

            <Input
              type="text"
              changes={hanldeChange}
              placeholder="Father's Occupation"
              name="occupation"
              value={info.occupation}
            />
          </Row>

          <Row>
            <Input
              type="date"
              changes={hanldeChange}
              placeholder="D.O.B"
              name="dob"
              value={info.dob}
            />

            <Col>
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
            <Col>
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
            <Col>
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
            <Input
              type="number"
              changes={hanldeChange}
              placeholder="Mobile Number"
              name="phone"
              value={info.phone}
            />

            <Col>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Student's Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  size="md"
                  onChange={hanldeChange}
                />
              </Form.Group>
            </Col>

            <Row>
              <Col>
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
              onClick={handleSubmit}
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
                onClick={() => handleEdit}
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
