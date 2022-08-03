import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/myfolder/generic/Home";
import Friends from "../src/components/myfolder/friends/Friends";
import Jobs from "../src/components/myfolder/jobs/Jobs";
import Companies from "../src/components/myfolder/techcompanies/Companies";
import Events from "../src/components/myfolder/events/Events";
import TestAndAjax from "../src/components/myfolder/generic/TestAndAjax";
import Register from "../src/components/myfolder/users/Register";
import Login from "../src/components/myfolder/users/Login";
import FriendsForm from "../src/components/myfolder/friends/FriendsForm";
import CompaniesForm from "./components/myfolder/techcompanies/CompaniesForm";
import * as usersService from "./components/myfolder/services/usersService";
import JobsForm from "./components/myfolder/jobs/JobsForm";
import SiteNav from "./components/myfolder/generic/SiteNav";
import Footer from "./components/myfolder/generic/Footer";

function App() {
  const [user, setUser] = useState({
    firstName: "Unknown",
    isConfirmed: false,
    lastName: "User",
    email: "",
  });

  useEffect(() => {
    usersService.current().then(onCurrentUserSuccess).catch(onCurrentUserError);
  }, []);
  //console.log(state);
  const onCurrentUserSuccess = (response) => {
    console.log(response.data.item.id);
    const currentId = response.data.item.id;
    usersService.getById(currentId).then(onGetIdSuccess).catch(onGetIdError);
  };
  const onCurrentUserError = (error) => {
    console.log(error);
  };
  const onGetIdSuccess = (response) => {
    console.log(response.data.item);
    const currentUser = response.data.item;
    if (currentUser.isConfirmed === true) {
      setUser((prevState) => {
        const loginUser = {
          ...prevState.user,
          firstName: currentUser.firstName,
          isConfirmed: currentUser.isConfirmed,
          lastName: currentUser.lastName,
          email: currentUser.email,
        };
        console.log(user, loginUser);
        return loginUser;
      });
    } else {
      return user;
    }
  };
  const onGetIdError = (error) => {
    console.log(error);
  };
  return (
    <React.Fragment>
      <SiteNav firstName={user.firstName} lastName={user.lastName}></SiteNav>
      <Routes>
        <Route
          path="/"
          element={<Home firstName={user.firstName} lastName={user.lastName} />}
        ></Route>

        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
        <Route path="/companies/new" element={<CompaniesForm />}></Route>
        <Route path="/companies/:companyId" element={<CompaniesForm />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/tests" element={<TestAndAjax />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/friends" element={<FriendsForm />}></Route>
        <Route path="/friends/new" element={<FriendsForm />}></Route>
        <Route path="/friends/:friendId" element={<FriendsForm />}></Route>

        <Route path="/jobs" element={<JobsForm />}></Route>
        <Route path="/jobs/new" element={<JobsForm />}></Route>
        <Route path="/jobs/:jobId" element={<JobsForm />}></Route>
      </Routes>
      <Footer></Footer>
    </React.Fragment>
  );
}
export default App;
