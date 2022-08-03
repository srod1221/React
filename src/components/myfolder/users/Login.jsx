import React, { useState } from "react";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure();

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "U03K0HZQGAU",
  });

  const onFormFieldChange = (event) => {
    console.log("onChange", { formData });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const value = target.value;

    //this is the name (so be sure to give your form fields a name attribute)
    const name = target.name;

    //set the new state using the old property name / object key and using the new value for formData
    setFormData((prevState) => {
      // console.log("updater onChange");

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[name] = value;

      //in functional components the name of this object/variable does not matter
      return newUserObject;
    });
  };

  const onSignInClicked = (e) => {
    e.preventDefault();
    console.log("sign in clicked");
    usersService.login(formData).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = (response) => {
    console.log(response);
    navigate("/", { state: response });
    toast.success("User log-in Successful!");
  };
  const onLoginError = (error) => {
    console.log(error);
    toast.error("Log-in Failed! Verify email and password.");
  };

  return (
    <React.Fragment>
      <h1>User Login</h1>

      <div className="container student">
        <div className="text-center">
          <div className="row">
            <div className="col text-center">
              <main className="form-signin w-100 m-auto">
                <form id="login">
                  <div className="form-group">
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={onFormFieldChange}
                      />
                      <label>Email address</label>
                    </div>
                    <div className="form-floating">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onFormFieldChange}
                      />
                      <label>Password</label>
                    </div>

                    <div className="checkbox mb-3">
                      <label>
                        <input type="checkbox" value="remember-me" /> Remember
                        me
                      </label>
                    </div>
                    <button
                      className="w-100 btn btn-lg btn-primary"
                      type="submit"
                      onClick={onSignInClicked}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
