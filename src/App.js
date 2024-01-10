import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import { Switch } from "@mantine/core";
import SetnewPawsdPage from "./pages/SetnewPawsdPage";
import HomePage from "./pages/HomePage";
import Head from "./components/dashboard Header/Head";
import { useState } from "react";
import Home from "./components/Home";
import MydetailsPage from "./pages/MydetailsPage";
import EditDetailsPage from "./pages/EditDetailsPage";
import ChangePaswdPage from "./pages/ChangePaswdPage";
import TransactionPage from "./pages/TransactionPage";
import Mycourses from "./components/MyCourses/Mycourses";
import CoursePage from "./pages/CoursePage";
import Quiz_test from "./components/quizComp/Quiz_test";
import { QuizScoreRed } from "./components/quizComp/QuizScoreColor";
import QuizPage from "./pages/QuizPage";
import MycoursesPage from "./pages/MycoursesPage";
import ForgotPassword from "./pages/ForgotPswdPage";
import MobileHead from "./components/dashboard Header/MobileHead";



function App() {
  // var isLoggedIn = window.localStorage.getItem("encsrftok")
  return (
    <div className="App">

      <Router>

        <Routes>
          {/* 
          <Route path="/green" Component={QuizScoreRed} />
          <Route path="/header" Component={Head} />
          <Route path="/courseplayer" Component={CoursePage} /> */}

          <Route path="/mobileHead" Component={MobileHead} />
          <Route path="/" Component={LoginPage} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/set-new-password" Component={SetnewPawsdPage} />
          <Route path="/home" exact Component={HomePage} />
          <Route path="/courseplayer/:courseid/:lessonid" Component={CoursePage} />
          {/* <Route path="/home/:courseid" Component={CoursePage} /> */}
          {/* <Route path="/home/courseplayer/:course_name" Component={CoursePage} /> */}
          <Route path="/mydetails" Component={MydetailsPage} />
          <Route path="/mydetails/editdetails" Component={EditDetailsPage} />
          <Route path="/changepassword" Component={ChangePaswdPage} />
          <Route path="/trainingsubscriptions" Component={TransactionPage} />
          <Route path="/mycourses"
            // @ts-ignore
            exact Component={MycoursesPage} />
          {/* <Route path="/mycourses/:courseid" Component={CoursePage} /> */}
          {/* <Route path="/:courseid/:lessonid" Component={CoursePage} /> */}
          {/* <Route path="/quiz" Component={Quiz_test} /> */}
          <Route path="/quiz/:courseid/:lessonid" Component={QuizPage} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
