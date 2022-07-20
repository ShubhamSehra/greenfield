import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import Stprofile from './Stprofile';
import axios from 'axios';


function StudentProfile() {



  const {studentId} = useParams();
  
  const [studentData, setStudent ] = useState([]);


    const getStudent = () =>{
      
      axios.get('/students')
      .then( (response) => {
          const res = (response.data).find((found)=> found._id === studentId)
          setStudent(res)
      })
      .catch(function (error) {
        console.log(error);
      })
    }

      useEffect(getStudent,[studentId])
  
  
  
  return (
    
    
    
    <div className='container mt-4' >
      
        
        
        <Stprofile 
        studentData = {studentData}
          id = {studentData._id}
          fname = {studentData.fname}
          lname = {studentData.lname}
          photo = {studentData.photo}
          fathername = {studentData.fathername}
          stndrd = {studentData.stndrd}
          dob = {studentData.dob}
          gender = {studentData.gender}
          enroll = {studentData.enrollDate}
          phone = {studentData.phone}
          address = {studentData.address}
          occupation = {studentData.occupation}
        />
        
        </div>
    )

}

export default StudentProfile;