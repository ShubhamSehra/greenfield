import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Logo from '../logos/school_logo.svg';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate, Link } from "react-router-dom";



function Stprofile(props) {

  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(props.photo?.data?.data))
  );

  const navigate = useNavigate();
 

    const handleDelete =  (id) =>{
      swal({
        title: "Are you sure?",
        text: "You want to deleted student profile?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then(async(willDelete) => {

        if  (willDelete) {
          try {
          await   axios.delete(`/students/delete/${id}`).then(()=> { navigate("/") }).catch((error)=>{(console.log(error))});
            
          } catch (error) {
            
            console.log(error);
          }
          swal( "Student's profile has been deleted!", {
            icon: "success",
          });
        } else {
          swal( "Student file is safe!");
        }
      });

  }

  console.log(props.photo?.data?.data);
  console.log(props.fname);
 

  return (
    <div>
     
      <Container fluid="md" id="printableArea" >
      <Row>
        <Col className="text-center" >
        <img
          alt="logo"
          src={Logo}
          width="50px"
          height="50px"
          className="d-inline-block "
        />{' '}
     <strong className='brand-name '> <span style={{color : "green"}} >GREEN FILED SR SEC SCHOOL</span></strong> 
        </Col>

      </Row>
        <Row>
          <Col md="auto" > 
          
          <img className="fixImg"
                src={`data:image/png;base64,${base64String}`}
                alt="..."
              />

          </Col>
          
          <Col>

          <Table striped bordered hover style={{ textTransform: "uppercase" }} >
        
        <tbody>
         
          <tr className="fs-4"  >
            <td>Name: </td>

            <td colSpan={3} >{props.fname} {props.lname}{" "}</td>
          </tr>
          <tr>
            <td>S/o:</td>
            <td className="fs-4" >{props.fathername}</td>
            <td>Occupation</td>
            <td>{props.occupation}</td>
          </tr>
          <tr>
            <td>Class:</td>
            <td >
              {props.stndrd} <sup>th</sup>{" "}
            </td>
            <td>Gender:</td>
            <td > {props.gender} </td>
          </tr>
          <tr>
            <td>DOB:</td>
            <td >{props.dob}</td>
            <td>Enroll Date:</td>
            <td > {props.enroll} </td>
          </tr>
          
          
          <tr>
            <td  >Phone:</td>
            <td colSpan={3}> {props.phone} </td>
          </tr>
          <tr>
            <td>Address:</td>
            <td colSpan={3}> {props.address} </td>
          </tr>
        </tbody>
      </Table>

          </Col>

        </Row>

    <Row>

      <Col></Col>
      <Col className="sing" >
      <img src={`/photos/sign.png`} style={{width: "120px"}} alt="sign"  />

      <span>Principal</span></Col>

    </Row>



      </Container>
    <Row>
      <Col> <button className="btn btn-lg btn-outline-success" onClick={()=>window.print()} > Print </button> </Col>
      <Col> <Link className="btn btn-lg btn-outline-success" to={`/edit/${props.id}`}> Edit </Link> </Col>
      <Col> <button className="btn btn-lg btn-outline-danger" onClick={()=> handleDelete(props.id)} > Delete </button> </Col>
      
      
    </Row>

    
    </div>
    
  );
 
}

export default Stprofile;
