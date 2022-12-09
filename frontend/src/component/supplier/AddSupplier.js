import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddSupplier() {
  const [businessName, setBusinessName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierContact, setSupplierContact] = useState('');
  const [representative, setRepresenative] = useState('');
  const [tin, setTin] = useState('');
  const [tax, setTax] = useState('');

  const [success, setSuccess] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setSuccess(true);
    setBusinessName('');
    setSupplierEmail('');
    setSupplierContact('');
    setRepresenative('');
    setTin('')
    setTax('');
  }, []);

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/suppliers/add',
        JSON.stringify({
          businessName,
          supplierEmail,
          supplierContact,
          representative,
          tin,
          tax,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true
        }
      );
      console.log(response);
      console.log(businessName);
      console.log(supplierContact);
      console.log(supplierEmail);
      console.log(representative);
      console.log(tin);
      console.log(tax);
      //window.location = '/suppliers/add'; //refresh the page
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Failed to add supplier');
      }
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Add Suppliers</title>
      </Helmet>

      <section>
        <p>{errMsg}</p>
        <h1 className="my-3">Create Supplier</h1>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3" controlId="businessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              onChange={(e) => { console.log(e.target.value); setBusinessName(e.target.value) }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="representative">
            <Form.Label>Representative</Form.Label>
            <Form.Control
              type="representative"
              required
              onChange={(e) => { console.log(e.target.value); setRepresenative(e.target.value) }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="supplierEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="supplierEmail"
              required
              onChange={(e) => { console.log(e.target.value); setSupplierEmail(e.target.value) }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="supplierContact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="supplierContact"
              required
              onChange={(e) => { console.log(e.target.value); setSupplierContact(e.target.value) }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tin">
            <Form.Label>TIN</Form.Label>
            <Form.Control
              type="tin"
              required
              onChange={(e) => { console.log(e.target.value); setTin(e.target.value) }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tax">
            <Form.Label>Tax Type</Form.Label>
            <Form.Control
              type="tax"
              required
              onChange={(e) => { console.log(e.target.value); setTax(e.target.value) }}
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Add</Button>
            <Button>
              <Link to="/dashboard">Back</Link>
            </Button>
            <br />
          </div>
        </Form>
      </section>
    </Container>
  );
}
export default AddSupplier;