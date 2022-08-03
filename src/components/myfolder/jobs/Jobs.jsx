import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jobsService from "../services/jobsService";
import Job from "./Job";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

function Jobs() {
  const [current, setCurrent] = useState({
    //grabbed from api
    pageIndex: 0,
    pageSize: 4,
    totalCount: 6,
    totalPages: 2,
  });
  const onPageChange = (page) => {
    setCurrent((prevState) => {
      return { ...prevState, pageIndex: page - 1 };
    });
  };
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    jobArray: [],
    jobComponents: [],
  });

  console.log(pageData, setPageData);
  const mapJob = (aJob) => {
    return <Job job={aJob} key={aJob.id} />;
  };

  const [showCard, setShowCard] = useState(true);

  const [searchData, setSearchData] = useState({
    searchWord: "",
  });

  useEffect(() => {
    jobsService
      .getPage(current.pageIndex, current.pageSize)
      .then(onGetPageSuccess)
      .catch(onGetPageError);
  }, [current]);

  const onGetPageSuccess = (response) => {
    var jobs = response.data.item.pagedItems;
    console.log(response.data.item.pagedItems);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.jobArray = jobs;
      pd.jobComponents = jobs.map(mapJob);
      return pd;
    });
  };
  const onGetPageError = (error) => {
    console.log(error);
  };
  const onToggleJobsClicked = (e) => {
    e.preventDefault();
    console.log("toggle jobs");
    return setShowCard(!showCard);
  };

  const onAddJobClicked = (e) => {
    e.preventDefault();
    console.log("add job clicked");
    navigate("/jobs/new");
  };

  const onSearchBarChange = (event) => {
    const target = event.target;

    const value = target.value;

    const name = target.name;

    setSearchData((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[name] = value;

      return newUserObject;
    });
  };

  const onSearchClicked = (e) => {
    e.preventDefault();
    var keyWord = searchData.searchWord;
    jobsService
      .search(0, 10, keyWord)
      .then(onSearchSuccess)
      .catch(onSearchError);
    return setShowCard(showCard);
  };
  const onSearchSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    const searchItem = response.data.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.jobComponents = searchItem.map(mapJob);
      return pd;
    });
  };
  const onSearchError = (error) => {
    console.log(error);
  };
  const onClearClicked = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.jobComponents = pd.jobArray.map(mapJob);
      return pd;
    });
    setSearchData((prevState) => {
      const sd = { ...prevState.searchData, searchWord: "" };
      return sd;
    });
  };
  return (
    <React.Fragment>
      <h1>Jobs</h1>

      <div className="container student">
        <div className="row" id="toggleRow">
          <div className="col-md-3">
            <button
              type="button"
              id="addFriend"
              className="btn btn-danger"
              onClick={onToggleJobsClicked}
            >
              Toggle Jobs
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddJobClicked}
            >
              Add Job
            </button>
          </div>
          <div className="col-4">
            <div className="input-group mb-3" id="searchBar">
              <input
                type="text"
                name="searchWord"
                className="form-control search"
                placeholder="search jobs"
                value={searchData.searchWord}
                onChange={onSearchBarChange}
              />
              <button
                id="cmdSearch"
                type="button"
                className="btn btn-primary"
                onClick={onSearchClicked}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClearClicked}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-2">
            <Pagination
              onChange={onPageChange} //page navigation
              current={current.pageIndex + 1} //is the current page
              total={current.totalCount}
              pageSize={current.pageSize}
            />
          </div>
          <div className="row">{showCard && pageData.jobComponents} </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Jobs;
