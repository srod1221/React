import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Company(props) {
  const navigate = useNavigate();
  const aCompany = props.company;
  const url = props.url;
  console.log("look at me", `${aCompany.images[0].imageUrl}`);

  const onEditClicked = (e) => {
    e.preventDefault();
    console.log("edit clicked");
    navigate(`/companies/${aCompany.id}`, { state: { ...aCompany } });
  };
  const onViewMoreClicked = (e) => {
    e.preventDefault();
    console.log("on view more clicked");
  };
  return (
    <React.Fragment>
      {" "}
      <div className="col-md-3">
        <Card>
          <img
            src={aCompany.images[0].imageUrl}
            className="card-img-top "
            alt="no pic"
          />
          <CardBody>
            <CardHeader className="danger">{aCompany.name}</CardHeader>
            <CardTitle>{aCompany.summary}</CardTitle>
            <CardText>{aCompany.headline}</CardText>
            <CardText>
              <a href={url[0]} target="_blank" rel="noreferrer">
                {url[0]}
              </a>
            </CardText>
            <Button
              type="button"
              className="btn btn-info"
              onClick={onEditClicked}
            >
              Edit
            </Button>
            {"   "}
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={onViewMoreClicked}
            >
              View More
            </Button>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Company;
