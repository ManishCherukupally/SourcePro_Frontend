import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import { Space, Switch } from "@mantine/core";
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
import CourseMobileComp from "./components/CourseComp/CourseMobileComp";
import Test from './test'
import LoginHCTPage from "./HCT/HCTpages/LoginHCTPage";
import DashboardHCTPage from "./HCT/HCTpages/DashboardHCTPage";
import ForgetPasswordHCTPage from "./HCT/HCTpages/ForgetPasswordHCTPage";
import HCTSetNewpasswordPage from "./HCT/HCTpages/HCTSetNewpasswordPage";
import UserManagementPage from "./HCT/HCTpages/UserManagementPage";
import TemplatePage from "./HCT/HCTpages/TemplatePage";
import BroadcastPage from "./HCT/HCTpages/BroadcastPage";

function App() {

  // var isLoggedIn = window.localStorage.getItem("encsrftok")
  return (

    <div className="App">
      {/* <Test />
      <Space h={'10rem'} /> */}
      <Router>

        <Routes>
          {/* 
          <Route path="/green" Component={QuizScoreRed} />
          <Route path="/header" Component={Head} />
          <Route path="/courseplayer" Component={CoursePage} /> */}

          <Route path="/" element={window.localStorage.getItem("userStatus") ? (<Navigate to={"/home"} />) : (<Navigate to={"/login"} />)} />
          <Route path="/mobilevideo" Component={CourseMobileComp} />
          <Route path="/login" Component={LoginPage} />
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
          <Route path="/mycourses" exact Component={MycoursesPage} />
          {/* <Route path="/mycourses/:courseid" Component={CoursePage} /> */}
          {/* <Route path="/:courseid/:lessonid" Component={CoursePage} /> */}
          {/* <Route path="/quiz" Component={Quiz_test} /> */}
          <Route path="/quiz/:courseid/:lessonid" Component={QuizPage} />

          {/* HCT Routes*/}
{/* 
          <Route path="/hct/login" Component={LoginHCTPage} />
          <Route path="/hct/forgot-password" Component={ForgetPasswordHCTPage} />
          <Route path="/hct/set-new-password" Component={HCTSetNewpasswordPage} /> */}
          <Route path="/dashboard" Component={DashboardHCTPage} />
          <Route path="/usermanagement" Component={UserManagementPage} />
          <Route path="/template" Component={TemplatePage} />
          <Route path="/broadcast" Component={BroadcastPage} />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
