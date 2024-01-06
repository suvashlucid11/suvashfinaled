import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';

const Vehicle = ({ vehicle, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!vehicle) {
    return null;
  }

  const { imageurls = [], name, mileage, number, type } = vehicle;

  return (
    <div>
      <div className="row bs">
        <div className="col-md-4">
          {imageurls.length > 0 && (
            <img src={imageurls[0]} className='smallimg' alt="Vehicle" />
          )}
        </div>
        <div className='col-md-7'>
          <h1>{name}</h1>
          <b>
            <p>Mileage: {mileage}</p>
            <p>Mobile Number: {number}</p>
            <p>Type: {type}</p>
          </b>
          <div style={{ float: "right" }}>
            <button className='btn btn-primary' onClick={handleShow}>View details</button>
            {(fromdate && todate) && (
              <Link to={`/book/${vehicle._id}/${fromdate}/${todate}`}>
                <button className='btn btn-primary'>Book Now</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{vehicle.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigimg" src={url} alt={`Image ${index}`} />
                <p>{vehicle.description}</p>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Vehicle;
