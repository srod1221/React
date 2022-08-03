import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as jobsService from "../services/jobsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function JobsForm() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "unique5",
    statusId: "Active",
    techCompanyId: 48735,
    skills: [],
  });

  const mapSkills = (skills) => {
    return skills.name;
  };

  useEffect(() => {
    if (location.state !== null) {
      setFormData((prevState) => {
        const newFormData = {
          ...prevState.formData,
          id: location.state.id,
          title: location.state.title,
          description: location.state.description,
          summary: location.state.summary,
          pay: location.state.pay,
          slug: location.state.slug,
          statusId: location.state.statusId,
          techCompanyId: location.state.techCompany.contactInformation.entityId,
          skills: location.state.skills.map(mapSkills),
        };
        return newFormData;
      });
    }
  }, []);
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

    if (location.state !== null) {
      const id = location.state.id;
      console.log(id);

      jobsService
        .updateById(id, formData)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      //not working ??? i am so lost
      jobsService.addJob(formData).then(onAddSuccess).catch(onAddError);
    }
  };

  const onAddSuccess = (response) => {
    console.log(response);
    toast.success("Job added successfully");
  };

  const onAddError = (error) => {
    console.log(error);
    toast.error("Job could not be added. Please try again");
  };

  const onUpdateSuccess = (response) => {
    console.log(response);
    toast.success("Updated job successfully");
  };
  const onUpdateError = (error) => {
    console.log(error);
    toast.error("Job could not be updated. Please try again");
  };
  return (
    <React.Fragment>
      <h1>Job Info</h1>

      <div className="container student">
        <div className="row" id="friendForm">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <h1>Add or Edit Job</h1>
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
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Write interesting facts about job posting"
                    value={formData.description}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <input
                    type="text"
                    name="summary"
                    className="form-control"
                    placeholder="Write a short description about job requirements"
                    value={formData.summary}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pay</label>
                  <input
                    name="pay"
                    type="text"
                    className="form-control"
                    placeholder="Write a salary amount"
                    value={formData.pay}
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
                    placeholder="Job Status"
                    value={formData.statusId}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company ID</label>
                  <input
                    type="text"
                    name="techCompanyId"
                    className="form-control"
                    placeholder="Enter Company ID"
                    value={formData.techCompanyId}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="Enter skills"
                    value={formData.skills}
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

export default JobsForm;
