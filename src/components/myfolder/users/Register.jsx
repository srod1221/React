import React, { useState } from "react";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure();

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U03K0HZQGAU",
  });

  const onFormFieldChange = (event) => {
    console.log("onChange", formData);

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const value = target.value;

    //this is the name (so be sure to give your form fields a name attribute)
    const name = target.name;

    //set the new state using the old property name / object key and using the new value for formData
    setFormData((prevState) => {
      //console.log("updater onChange");

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[name] = value;
      //console.log(newUserObject);

      //in functional components the name of this object/variable does not matter
      return newUserObject;
    });
  };

  const onRegisterClicked = (e) => {
    e.preventDefault();
    console.log("register clicked");
    usersService
      .addUser(formData)
      .then(onRegisterSuccess)
      .catch(onRegisterError);
  };

  const onRegisterSuccess = (response) => {
    console.log(response);
    toast.success("User registered successfully");
    navigate("/login");
  };

  const onRegisterError = (error) => {
    console.log(error);
    toast.error("Registration Failed");
  };

  return (
    <React.Fragment>
      <h1>Register User</h1>

      <div className="container student">
        <div className="row">
          <div className="col">
            <form id="registerForm">
              <div className="form-group">
                <h1>Register a New User</h1>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="enter first name"
                    value={formData.firstName}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="enter last name"
                    value={formData.lastName}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="enter email address"
                    value={formData.email}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="enter password"
                    value={formData.password}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Re-enter Password</label>
                  <input
                    name="passwordConfirm"
                    type="password"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="confirm password "
                    value={formData.passwordConfirm}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile</label>
                  <input
                    type="text"
                    name="avatarUrl"
                    className="form-control"
                    placeholder="enter Profile URL"
                    value={formData.avatarUrl}
                    onChange={onFormFieldChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onRegisterClicked}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
