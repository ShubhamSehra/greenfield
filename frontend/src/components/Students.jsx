import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./background.css";
import {  Form, InputGroup } from "react-bootstrap";

import { useSearchParams } from "react-router-dom";

function Students() {
  const [student, setStudent] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("students")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonres) => setStudent(jsonres));
  }, []);

  function createCard(stndt) {
    return (
      <Card
        id={stndt._id}
        fname={stndt.fname}
        lname={stndt.lname}
        photo={stndt.photo.data}
        father={stndt.fathername}
        stndrd={stndt.stndrd}
        phone={stndt.phone}
      />
    );
  }

  return (
    <div className="container">
     
      <div className="fixdshit" >

        <InputGroup className="m-3" size="lg " style={{width: "85%"}} >
          
          <Form.Control className=""
            value={searchParams.get("filter") || ""}
            onChange={(e) => {
              const filter = e.target.value;
              if (filter) {
                setSearchParams({ filter });
              } else {
                setSearchParams({});
              }
            }}
            placeholder="Search students..."
            
          />
        </InputGroup>
      </div>
     

      <br />
  

      {student
        .filter((student) => {
          const filter = searchParams.get("filter");
          if (!filter) return true;
          const name = student.fname.toLowerCase();
          return name.startsWith(filter.toLowerCase());
        })
        .map(createCard)}
    </div>
  );
}

export default Students;
