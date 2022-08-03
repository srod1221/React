import React, { useEffect, useState } from "react";
import * as techCompaniesService from "../services/techcompaniesService";
import Company from "./Company";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Companies() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchWord: "",
  });
  const [pageData, setPageData] = useState({
    companyArray: [],
    companyComponents: [],
  });
  const onSearchBarChange = (event) => {
    // console.log("onChange", searchData);

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setSearchData((prevState) => {
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
  const [showCard, setShowCard] = useState(true);
  const mapCompany = (aCompany) => {
    const mapUrls = (urls) => {
      return urls.url;
    };

    return (
      <Company
        company={aCompany}
        key={aCompany.id}
        url={aCompany.urls.map(mapUrls)}
      />
    );
  };

  useEffect(() => {
    techCompaniesService
      .getPage(0, 10)
      .then(onGetPageSuccess)
      .catch(onGetPageError);
  }, []); //needs the empty array

  const onGetPageSuccess = (response) => {
    var companies = response.data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.companyArray = companies;
      pd.companyComponents = companies.map(mapCompany);
      //console.log("look here", pd.companyComponents);
      return pd;
    });
  };
  const onGetPageError = (error) => {
    console.log(error);
  };

  const onToggleClicked = (e) => {
    e.preventDefault();
    console.log("toggle clicked");
    return setShowCard(!showCard);
  };
  const onAddClicked = (e) => {
    e.preventDefault();
    console.log("add clicked");
    navigate("/companies/new");
  };
  const onSearchClicked = (e) => {
    e.preventDefault();
    console.log("on search clicked");
    var keyWord = searchData.searchWord;
    techCompaniesService
      .search(0, 10, keyWord)
      .then(onSearchSuccess)
      .catch(onSearchError);
    return setShowCard(showCard); //equals tru
  };
  const onSearchSuccess = (response) => {
    const searchItem = response.data.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      //pd.friendArray = pd.friendComponents;

      pd.friendComponents = searchItem.map(mapCompany);
      //  console.log("this", pd);
      return pd;
    });
    var searchedCard = searchItem.map(mapCompany);
    console.log("this", searchedCard);
  };
  const onSearchError = (error) => {
    console.log(error);
  };
  return (
    <React.Fragment>
      <h1>Companies</h1>

      <div className="container student">
        <div className="row">
          <div className="col">
            <Button
              type="button"
              className="btn btn-primary"
              onClick={onToggleClicked}
            >
              Toggle
            </Button>
            {"  "}
            <Button
              type="button"
              className="btn btn-warning"
              onClick={onAddClicked}
            >
              Add Company
            </Button>
            <div className="col-md-4">
              <Form inline>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                  <Label className="me-sm-2">Search</Label>
                  <Input
                    id="searchWord"
                    name="searchWord"
                    placeholder="enter search item"
                    type="text"
                    value={searchData.searchWord}
                    onChange={onSearchBarChange}
                  />{" "}
                  <Button onClick={onSearchClicked}>Search</Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
        {"  "}
        <div className="row">{showCard && pageData.companyComponents} </div>
      </div>
    </React.Fragment>
  );
}

export default Companies;
