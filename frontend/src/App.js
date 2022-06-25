import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import schoolLogo from "./logos/school_logo.svg";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";


function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <motion.img 
        animate={{ scale: 1.5 }}
        transition = {{duration: 0.5 }}
                  
          src={schoolLogo} width="150px" height="150px" alt="school"  />
        <div className="m-3" > 
        <Link  className="btn btn-outline-success btn-lg m-2" to={"enroll"} >Enroll New Student</Link>
          
          
          <Link to={"students"} className="btn btn-outline-success btn-lg m-2">
            Dashboard{" "}
          </Link>

        </div>
      </header>
    </div>
  );
}

export default App;
