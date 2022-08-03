import React from "react";
import { useNavigate } from "react-router-dom";

function Friend(props) {
  const navigate = useNavigate();

  const aFriend = props.friend;
  const onLocalPersonClicked = (e) => {
    e.preventDefault();
    props.onFriendClicked(aFriend, e);
  };

  const onEditClicked = (e) => {
    e.preventDefault();

    //navigate("url change here", pass state here)
    navigate(`/friends/${aFriend.id}`, { state: { ...aFriend } });

    /*
        useLocation and useNavigate

        react-router-dom v6 is what you're for if you'll be googling
        
    */
  };

  return (
    <div className="col-md-3">
      <div
        className="card h-100 rounded-3 shadow-sm"

        // value={id}
      >
        <img
          src={aFriend.primaryImage.imageUrl}
          className="card-img-top "
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{aFriend.title}</h5>
          <p className="card-text">{aFriend.summary}</p>
          <button
            type="button"
            className="btn btn-info"
            onClick={onEditClicked}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onLocalPersonClicked}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Friend);
