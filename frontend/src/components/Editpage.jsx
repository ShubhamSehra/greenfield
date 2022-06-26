import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Regiform from "./Regiform";

const Editpage = () => {
  const { studentId } = useParams();

  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  const getStudent = () => {
    setLoading(true);
    axios
      .get("/students")
      .then((response) => {
        const res = response.data.find((found) => found._id === studentId);
        setStudentData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(getStudent, [studentId]);

  if (loading) return <div />;
  console.log(studentData, "hello");
 
  return (
    <div>
      <Regiform
        id={studentId}
        studentData = {studentData}
      />
    </div>
  );
};

export default Editpage;
