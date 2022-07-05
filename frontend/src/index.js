import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enroll from "./components/Enroll";
import Students from "./components/Students";
import StudentProfile from "./components/StudentProfile";
import Navbarr from "./components/Navbarr";
import Editpage from "./components/Editpage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbarr />
  <Routes>
    <Route path="/" element={<App />} />

    <Route path="/enroll" element={<Enroll />} />
    <Route path="/studentsdata" element={<Students />} />
    
    <Route path="students/:studentId" element={<StudentProfile />} />
   <Route path="/edit/:studentId"  element={<Editpage />}  />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <h1>there's nothing here</h1>
        </main>
      }
    />
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
