import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
//import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

import Friend from "./Friend";
import * as friendsService from "../services/friendsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Friends() {
  const [current, setCurrent] = useState({
    //grabbed from api
    pageIndex: 0,
    pageSize: 4,
    totalCount: 11,
    totalPages: 3,
  });
  const onPageChange = (page) => {
    setCurrent((prevState) => {
      return { ...prevState, pageIndex: page - 1 };
    });
  };

  const [searchData, setSearchData] = useState({
    searchWord: "",
  });
  const [pageData, setPageData] = useState({
    friendArray: [],
    friendComponents: [],
  });
  console.log(pageData);
  const [showCard, setShowCard] = useState(true);
  const navigate = useNavigate();
  //const [count, setCount] = useState(0);
  const onDeleteRequested = useCallback((myFriend, e) => {
    e.preventDefault();
    //console.log(myFriend.id);
    const idToBeDeleted = myFriend.id;

    const handler = getDeleteSuccesshandler(idToBeDeleted);
    friendsService.deleteById(idToBeDeleted).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccesshandler = (idToBeDeleted) => {
    //console.log("getDeleteSuccessHandler", idToBeDeleted);
    return () => {
      setPageData((prevState) => {
        const pData = { ...prevState };
        pData.friendArray = [...pData.friendArray];

        const indexOf = pData.friendArray.findIndex((friend) => {
          let result = false;

          if (friend.id === idToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (indexOf >= 0) {
          pData.friendArray.splice(indexOf, 1);
          pData.friendComponents = pData.friendArray.map(mapFriend);
        }
        return pData;
      });
      toast.success("Friend Deleted");
    };
  };

  const onDeleteError = (error) => {
    console.error(error);
  };

  const mapFriend = (aFriend) => {
    //const id = friend.id;
    return (
      <Friend
        friend={aFriend}
        key={aFriend.id}
        onFriendClicked={onDeleteRequested}
      />
    );
  };
  useEffect(() => {
    // console.log("firing");
    friendsService
      .getPage(current.pageIndex, current.pageSize)
      .then(onGetPageSuccess)
      .catch(onGetPageError);
  }, [current]);

  const onGetPageSuccess = (response) => {
    var friends = response.data.item.pagedItems;
    // console.log(friends);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.friendArray = friends;
      pd.friendComponents = friends.map(mapFriend);
      console.log("this", pd.friendComponents);
      return pd;
    });
  };

  const onGetPageError = (error) => {
    console.error(error);
  };

  const onToggleFriendsClicked = (e) => {
    e.preventDefault();
    //console.log("toggle friends", showCard);
    return setShowCard(!showCard);

    //true or false for my statement
    //return setShow(!show)
  };
  const onAddFriendClicked = (e) => {
    e.preventDefault();
    //  console.log("this", e.currentTarget.dataset.page);
    navigate("/friends/new");
  };
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

  const onSearchClicked = (e) => {
    e.preventDefault();
    // console.log("search", searchData.searchWord, showCard);
    //takes in 3 params pageindex, page size, keyword or query
    var keyWord = searchData.searchWord;
    friendsService
      .search(0, 10, keyWord)
      .then(onSearchSuccess)
      .catch(onSearchError);
    return setShowCard(showCard); //equals true
  };

  const onSearchSuccess = (response) => {
    const searchItem = response.data.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      //pd.friendArray = pd.friendComponents;

      pd.friendComponents = searchItem.map(mapFriend);
      //  console.log("this", pd);
      return pd;
    });
    var searchedCard = searchItem.map(mapFriend);
    console.log("this", searchedCard);
  };
  const onSearchError = (error) => {
    console.log(error);
  };
  const onClearClicked = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      const pd = { ...prevState };

      pd.friendComponents = pd.friendArray.map(mapFriend);
      //  console.log("this", pd);

      return pd;
    });
    setSearchData((prevState) => {
      const sd = { ...prevState.searchData, searchWord: "" };
      return sd;
    });
  };

  return (
    <React.Fragment>
      <h1>Friends</h1>

      <div className="container student">
        <div className="row" id="toggleRow">
          <div className="col-md-3">
            <button
              type="button"
              id="addFriend"
              className="btn btn-danger"
              onClick={onToggleFriendsClicked}
            >
              Toggle Friends
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddFriendClicked}
            >
              Add Friend
            </button>
          </div>

          <div className="col-4">
            <div className="input-group mb-3" id="searchBar">
              <input
                type="text"
                name="searchWord"
                className="form-control search"
                placeholder="search friends"
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
        </div>
        {/*<h3 onClick={onHeaderClicked}>Rendering {count}</h3>*/}
        <div className="row">{showCard && pageData.friendComponents} </div>
      </div>

      <div className="container"></div>
    </React.Fragment>
  );
}

export default Friends;
