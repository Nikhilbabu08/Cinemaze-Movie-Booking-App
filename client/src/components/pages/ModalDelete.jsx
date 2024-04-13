import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDelete = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-dark'>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-dark'>Are you sure you want to delete this movie?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
