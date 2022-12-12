import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUser = ({ profile, user_id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedFirstname, setUpdatedFirstname] = useState(
    profile.firstname
  );
  const [updatedLastname, setUpdatedLastname] = useState(
    profile.lastname
  );
  const [updatedContactno, setUpdatedContactno] = useState(
    profile.contactno
  );
  const [updatedEmail, setUpdatedEmail] = useState(
    profile.email
  );

  const [errMsg, setErrMsg] = useState('');

  const editUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/users/update/${profile.user_id}`,
        JSON.stringify({
          firstname: updatedFirstname,
          lastname: updatedLastname,
          contactno: updatedContactno,
          email: updatedEmail
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true
        }
      );
      toast.success('Updated Successfully');
      window.location = '/Users';
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Failed to add product');
      }
    }
  };

  return (
    <>
      <Button
        className='"btn btn-primary'
        onClick={handleShow}
        controlledid={profile.user_id}
      >
        <i className="bi bi-pencil"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => editUser(e)}
            controlledid={profile.user_id}
          >
            <Form.Group className="mb-3" controlledid="updatedFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="updatedFirstname"
                defaultValue={updatedFirstname}
                onChange={(e) => setUpdatedFirstname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="updatedLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="updatedLastname"
                defaultValue={updatedLastname}
                onChange={(e) => setUpdatedLastname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="updatedContactno">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="updatedContactno"
                defaultValue={updatedContactno}
                onChange={(e) => setUpdatedContactno(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="updatedEmail">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="updatedEmail"
                defaultValue={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit">Update</Button>
              <Button className="btn btn-secondary" onClick={handleClose}>
                Back
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditUser;
