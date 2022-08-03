import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

function Job(props) {
  const [modal, setModal] = React.useState(false);

  const navigate = useNavigate();
  const aJob = props.job;
  const company = aJob.techCompany;

  // const mapImages = (images) => {
  //   return images.imageUrl;
  // };
  // const compPic = company.images.map(mapImages);
  // const url = compPic.toString();

  console.log(company);
  const onEditClicked = (e) => {
    e.preventDefault();
    navigate(`/jobs/${aJob.id}`, { state: { ...aJob } });
  };
  const onViewClicked = (e) => {
    e.preventDefault();
    console.log("view more clicked");
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <div className="col-md-3">
        <div
          className="card h-100 rounded-3 shadow-sm"

          // value={id}
        >
          <img className="card-img-top " alt="place holder" />
          <div className="card-body">
            <h5 className="card-title">{aJob.title}</h5>
            <p className="card-text">{aJob.pay}</p>
            <p className="card-text">{aJob.summary}</p>
            <button
              type="button"
              className="btn btn-info"
              onClick={onEditClicked}
            >
              Edit
            </button>
            <Button
              type="button"
              className="btn btn-primary"
              onClick={onViewClicked}
            >
              View More
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={onViewClicked}>
        <ModalHeader toggle={onViewClicked}>More Job Information</ModalHeader>
        <ModalBody>Company Name: {aJob.techCompany.name}</ModalBody>
        <ModalBody>Job Description: {aJob.description}</ModalBody>
        <ModalBody>Job Status: {aJob.statusId}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onViewClicked}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default React.memo(Job);
