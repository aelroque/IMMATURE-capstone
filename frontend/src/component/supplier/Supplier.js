import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function AddProduct(props) {
  const [sbusname, setSbusname] = useState('');
  const [semail, setSemail] = useState('');
  const [sphone, setSphone] = useState('');
  const [srepname, setSrepname] = useState('');

  const [success, setSuccess] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setSuccess(true);
    setSbusname('');
    setSemail('');
    setSphone('');
    setSrepname('');
  }, []);

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/suppliers',
        JSON.stringify({
          sbusname,
          semail,
          sphone,
          srepname,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true
        }
      );
      console.log(response);
      setSuccess(true);
      setSbusname('');
      setSemail('');
      setSphone('');
      setSrepname('');
      
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
              <title>Suppliers</title>
          </Helmet>
          
      <section>
        <p>{errMsg}</p>
        <h1 className="my-3">Suppliers</h1>
        <Form onSubmit={createHandler}>
          <Form.Group className="mb-3" controlId="sbusname">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              onChange={(e) => setSbusname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="semail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="semail"
              required
              onChange={(e) => setSemail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="sphone">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="sphone"
              required
              onChange={(e) => setSphone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="srepname">
            <Form.Label>Representative</Form.Label>
            <Form.Control
              type="srepname"
              required
              onChange={(e) => setSrepname(e.target.value)}
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
