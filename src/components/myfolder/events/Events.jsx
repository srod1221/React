import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import * as eventsService from "../services/eventsService";
import Event from "./Event";

function Events() {
  const [pageData, setPageData] = useState({
    eventArray: [],
    eventComponents: [],
  });
  console.log(pageData.eventArray[0]);

  useEffect(() => {
    eventsService.getFeed(0, 10).then(onGetFeedSuccess).catch(onGetFeedError);
  }, []);

  const mapEvent = (aEvent) => {
    return <Event event={aEvent} key={aEvent.id} />;
  };

  const onGetFeedSuccess = (response) => {
    const events = response.data.item.pagedItems;
    console.log(events);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.eventArray = events;
      pd.eventComponents = events.map(mapEvent);
      console.log("this", pd.eventComponents);
      return pd;
    });
  };

  const onGetFeedError = (error) => {
    console.log(error);
  };
  return (
    <React.Fragment>
      <h1>Events</h1>{" "}
      <div className="container student">
        <div className="row">
          <div className="col-md-8">
            <Card>
              <img
                src="https://griffithobservatory.org/wp-content/uploads/2021/01/Observatory_full_building4.jpg"
                className="card-img-top "
                alt="no pic"
              />
              <CardBody>
                <CardHeader className="danger"></CardHeader>
                <CardTitle></CardTitle>
                <CardText></CardText>
                <CardText></CardText>
              </CardBody>
            </Card>{" "}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3">
            <Card>
              {" "}
              <Form>
                <Row>
                  <h4> Search event Dates</h4>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        placeholder="start date"
                        type="date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label> End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        placeholder="end date"
                        type="date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <Button type="button" className="btn btn-info">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
            {"   "}

            <div className="row" id="cardsRow">
              {pageData.eventComponents}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Events;
