import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

function CompaniesForm() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: "Active",
    images: [],
    urls: [],
    tags: [],
    friends: [],
  });

  console.log(location.state.friends);
  useEffect(() => {
    if (location.state !== null) {
      setFormData((prevState) => {
        const newFormData = {
          ...prevState.formData,
          name: location.state.name,
          profile: location.state.profile,
          summary: location.state.summary,
          headline: location.state.headline,
          contactInformation: location.state.contactInformation.data,
          slug: location.state.slug,
          statusId: location.state.statusId,
          images: location.state.images[0].imageUrl,
          urls: location.state.urls[0].url,
          tags: location.state.tags[0].tagName,
          friends: location.state.friends[0].id,
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
  };
  return (
    <React.Fragment>
      <h1>Add or Edit Company</h1>

      <div className="container student">
        <div className="row">
          <div className="col-md-6">
            <Form inline>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="enter name"
                  type="text"
                  value={formData.name}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Profile</Label>
                <Input
                  id="profile"
                  name="profile"
                  placeholder="enter profile info"
                  type="text"
                  value={formData.profile}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Summary</Label>
                <Input
                  id="summary"
                  name="summary"
                  placeholder="enter summary"
                  type="text"
                  value={formData.summary}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">HeadLine</Label>
                <Input
                  id="headline"
                  name="headline"
                  placeholder="enter headline"
                  type="text"
                  value={formData.headline}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Contact Information</Label>
                <Input
                  id="contactInformation"
                  name="contactInformation"
                  placeholder="enter email"
                  type="text"
                  value={formData.contactInformation}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="enter email"
                  type="text"
                  value={formData.slug}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Status</Label>
                <Input
                  id="statusId"
                  name="statusId"
                  placeholder="enter URL"
                  type="text"
                  value={formData.statusId}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Picture URL</Label>
                <Input
                  id="images"
                  name="images"
                  placeholder="enter image URL "
                  type="text"
                  value={formData.images}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Website Url</Label>
                <Input
                  id="urls"
                  name="urls"
                  placeholder="enter url"
                  type="text"
                  value={formData.urls}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Tag Name</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="enter tag"
                  type="text"
                  value={formData.tags}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2">Friends</Label>
                <Input
                  id="friends"
                  name="friends"
                  placeholder="enter email"
                  type="text"
                  value={formData.friends}
                  onChange={onFormFieldChange}
                />
              </FormGroup>
              <Button
                type="button"
                className="btn btn-primary"
                onClick={onSubmitClicked}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompaniesForm;
