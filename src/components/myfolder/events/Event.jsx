import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";

function Event(props) {
  const [modal, setModal] = React.useState(false);
  const aEvent = props.event;
  const onViewClicked = (e) => {
    e.preventDefault();
    console.log("view more clicked");
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <div className="container student">
        <div className="row">
          <div className="col">
            <Card>
              <CardBody>
                <CardHeader className="danger">{aEvent.name}</CardHeader>
                <CardTitle>{aEvent.headline}</CardTitle>
                <CardText>{aEvent.summary} </CardText>
                <Button
                  type="button"
                  className="btn btn-clear"
                  onClick={onViewClicked}
                >
                  View More{" "}
                </Button>
                <Button type="button" className="btn btn-info">
                  Edit{" "}
                </Button>
              </CardBody>
            </Card>{" "}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={onViewClicked}
        className="modal-dialog modal-lg"
      >
        <ModalHeader toggle={onViewClicked}>Event</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  id="name"
                  name="name"
                  placeholder="enter event name"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="headline" sm={2}>
                Headline
              </Label>
              <Col sm={10}>
                <Input
                  id="headline"
                  name="headline"
                  placeholder="enter headline"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input
                  id="description"
                  name="description"
                  placeholder="enter event description"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="summary" sm={2}>
                Summary
              </Label>
              <Col sm={10}>
                <Input
                  id="summary"
                  name="summary"
                  placeholder="enter event summary"
                  type="text"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="slug" sm={2}>
                Slug
              </Label>
              <Col sm={10}>
                <Input id="slug" name="slug" type="file" />
              </Col>
            </FormGroup>
            <Row>
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4} id="checkboxCol">
                <FormGroup check>
                  <Label check>Active</Label>
                  <Input id="checkbox" type="checkbox" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input id="address" name="address" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="zipCode">Zip Code</Label>
                  <Input id="zipCode" name="zipCode" />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
          {"  "}

          <Button color="danger" onClick={onViewClicked}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
export default Event;
