import React from "react";
import * as usersService from "../services/usersService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const setState = useState();
  const navigate = useNavigate();
  const onLogClicked = (e) => {
    e.preventDefault();
    console.log("log out");
    usersService.logout().then(onLogoutSuccess).catch(onLogoutError);
  };

  const onLogoutSuccess = (response) => {
    console.log(response);
    navigate("/");
    setState((prevState) => {
      const newProp = {
        ...prevState.props,
        firstname: props.firstName,
        lastName: props.lastName,
      };
      return newProp;
    });
  };
  const onLogoutError = (error) => {
    console.log(error);
  };
  return (
    <React.Fragment>
      <h1>
        Hello {props.firstName} {props.lastName}
      </h1>

      <div className="container student">
        <div className="row" id="toggleRow">
          <div className="col-md-3"></div>

          <div className="col-4"></div>
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onLogClicked}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
