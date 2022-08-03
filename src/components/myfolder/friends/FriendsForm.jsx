import React, { useEffect, useState } from "react";
import * as friendsService from "../services/friendsService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function FriendsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: "",
  });
  //will grab the payload from the friend by id
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    //if the value is not null, load the card data
    if (location.state !== null) {
      setFormData((prevState) => {
        const newFormData = {
          ...prevState.formData,
          title: location.state.title,
          bio: location.state.bio,
          summary: location.state.summary,
          headline: location.state.headline,
          slug: location.state.slug,
          statusId: location.state.statusId,
          primaryImage: location.state.primaryImage.imageUrl,
        };

        return newFormData;
      });
    }
  }, []); //need the empty array or it will produce an infinite loop

  const onFormFieldChange = (event) => {
    //console.log("onChange", formData);

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setFormData((prevState) => {
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

  const onSubmitClicked = (e) => {
    e.preventDefault();
    console.log("update clicked", location.state);
    //if the state is not null, update the card
    if (location.state !== null) {
      const id = location.state.id;
      console.log(id);

      friendsService
        .updateById(id, formData)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      friendsService.addFriend(formData).then(onAddSuccess).catch(onAddError);
    }
  };

  const onAddSuccess = (response) => {
    console.log(response);
    toast.success("Friend added successfully");
  };
  const onAddError = (error) => {
    console.log(error);
    toast.error("Friend could not be added. Please try again");
  };

  const onUpdateSuccess = (response) => {
    console.log(response);
    toast.success("Friend updated successfully");
    navigate("/friends");
  };
  const onUpdateError = (error) => {
    console.log(error);
    toast.error("Friend could not be updated. Check all fields and try again");
  };
  return (
    <React.Fragment>
      <h1>Friend Info</h1>

      <div className="container student">
        <div className="row" id="friendForm">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <h1>Add or Edit Friend</h1>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="enter title"
                    value={formData.title}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    className="form-control"
                    placeholder="Write interesting facts about your friend"
                    value={formData.bio}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <input
                    type="text"
                    name="summary"
                    className="form-control"
                    placeholder="Write a short description about your friend"
                    value={formData.summary}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Headline</label>
                  <input
                    name="headline"
                    type="text"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Write a quality that stands out"
                    value={formData.headline}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    name="slug"
                    type="text"
                    className="form-control"
                    placeholder="Create a URl"
                    value={formData.slug}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    name="statusId"
                    className="form-control"
                    placeholder="Friend Status"
                    value={formData.statusId}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Primary Image</label>
                  <input
                    type="text"
                    name="primaryImage"
                    className="form-control"
                    placeholder="Picture URL"
                    value={formData.primaryImage}
                    onChange={onFormFieldChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmitClicked}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendsForm;
