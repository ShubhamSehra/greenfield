import React from "react";
import { FloatingLabel, Form, Col } from "react-bootstrap";

const Input = (inpt) => {
  return (
    <Col>
      <FloatingLabel
        controlId="floatingInput"
        label={inpt.placeholder}
        className="mb-3"
      >
        <Form.Control
          type={inpt.type}
          name={inpt.name}
          placeholder={inpt.placeholder}
          value = {inpt.value}
          onChange={inpt.changes}
          style={{ textTransform: "uppercase" }}

          required
        />
      </FloatingLabel>
    </Col>
  );
};

export default Input;
