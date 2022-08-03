import React, { useState } from "react";
import * as productService from "./services/productService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Product() {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",

    cost: 0,
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
  const onSubmitClicked = (e) => {
    e.preventDefault();
    console.log("add clicked");
    productService.addProduct(formData).then(onAddSuccess).catch(onAddError);
  };

  const onAddSuccess = (response) => {
    console.log(response.id);
    toast.success(`Product Added successfully. id: ${response.id}`);
  };

  const onAddError = (error) => {
    console.log(error);
    toast.error("Try Again");
  };
  return (
    <React.Fragment>
      <h1>Add Product</h1>

      <div className="container student">
        <div className="row">
          <div className="col">
            <form id="registerForm">
              <div className="form-group">
                <h1>Add a New Product</h1>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="enter name"
                    value={formData.name}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Manufacturer</label>
                  <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    className="form-control"
                    placeholder="enter manufacturer"
                    value={formData.manufacturer}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="enter description"
                    value={formData.description}
                    onChange={onFormFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cost</label>
                  <input
                    type="text"
                    name="cost"
                    id="cost"
                    className="form-control"
                    placeholder="enter product cost"
                    value={formData.cost}
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

export default Product;
