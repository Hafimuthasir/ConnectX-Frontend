import "./App.css";
// import SignupPage from "./Pages/SignupPage";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AdminHome from "./components/Admin/AdminHome";
import AdminLoginPage from "./Pages/AdminLoginPage";
import PrivateRouter from "./utis/PrivateRouter";
import AdPrivateRouter from "./utis/AdPrivateRouter";
import ChatPage from "./Pages/ChatPage";
import TestPage from "./Pages/TestPage";
import OthersProfile from "./Pages/OthersProfile";
import StoryView from "./Pages/StoryView";
import Reportman from "./Pages/Admin/Reportman";
import Postman from "./Pages/Admin/Postman";
import BussinessMan from "./Pages/Admin/BussinessMan";
import Verification from "./Pages/emailVerification";
import AlertModal from "./components/AlertSuccess"
import ErrorAlert from "./components/AlerError"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />

          <Route
            path="/home"
            element={
              <PrivateRouter>
                <HomePage />
              </PrivateRouter>
            }
          />

          <Route
            path="oprofile"
            element={
              <PrivateRouter>
                <OthersProfile />
              </PrivateRouter>
            }
          />
          <Route
            path="story"
            element={
              <PrivateRouter>
                <StoryView />
              </PrivateRouter>
            }
          />
          <Route exact path="/hometest" element={<HomePage />} />
          <Route
            path="/chat"
            element={
              <PrivateRouter>
                <ChatPage />
              </PrivateRouter>
            }
          />
          <Route path="/Signup" element={<SignupPage />} />
          <Route
            path="/emailverification/:id/:username"
            element={<Verification />}
          />

          <Route path="/test" element={<TestPage />} />

          {/* <Route path='/home' element={<HomePage/>}/> */}
          <Route path="/adminlogin" element={<AdminLoginPage />} />
          <Route
            path="/adminhome"
            element={
              <AdPrivateRouter>
                <AdminHome />
              </AdPrivateRouter>
            }
          />

          <Route
            path="reportman"
            element={
              <AdPrivateRouter>
                <Reportman />
              </AdPrivateRouter>
            }
          />

          <Route
            path="postman"
            element={
              <AdPrivateRouter>
                <Postman />
              </AdPrivateRouter>
            }
          />

          <Route
            path="bussinesrequests"
            element={
              <AdPrivateRouter>
                <BussinessMan />
              </AdPrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
      <AlertModal/>
      <ErrorAlert/>
    </>
  );
}

export default App;
