import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  
 

  
    return (
      <Link style={{ color: "transparent" }}
      to={`/studentsdata/${props.id}`} 
      key = {props.id}
      >

    <div className="containerz"  >
      <div className="card-container"  >
        <div className="image-container">
          <img src={`../build/photos/${props.photo}`} alt="..." />
        </div>
        <div style={{ textTransform: "uppercase" }} >
        
          <div className="card-fonts">
            {" "}
          <strong>  {props.fname} {props.lname} </strong> {" "}
          </div>
          <span>s/o {props.father} </span>
          <p>class: {props.stndrd} </p>

          
        </div>
      </div>
     
    </div>
      </Link>
  );
}

export default Card;
