import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

function AddProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [businessname, setBusinessname] = useState('');
  const [productname, setProductname] = useState('');
  const [unitmeasure, setUnitmeasure] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitprice, setUnitprice] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category_name, setCategory_name] = useState([]);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [
    businessname,
    productname,
    unitmeasure,
    quantity,
    unitprice,
    brand,
    description,
  ]);

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/products/add',
        JSON.stringify({
          businessname,
          productname,
          unitmeasure,
          quantity,
          unitprice,
          brand,
          description,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response);
      setSuccess(true);
      toast.success('Successfully added.');
      setBusinessname('');
      setProductname('');
      setUnitmeasure('');
      setQuantity('');
      setUnitprice('');
      setBrand('');
      setDescription('');
      window.location = '/products/add';
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function category(e) {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategory_name(response.data);
        console.log(response.data);
      } catch (err) {
      console.log(err);
    }
  };
    category();
  }, []);

  const handleChange = event => {
    console.log(event.target.value);
  }

  return (
    <Container>
      <Helmet>
        <title>Create Product</title>
      </Helmet>

      <Button className="button-login" onClick={handleShow}>
        Add Product
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={createHandler}>
            <Form.Group className="mb-3" controlId="businessname">
              <Form.Label className="label">Supplier</Form.Label>
              <Form.Control
                onChange={(e) => setBusinessname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productname">
              <Form.Label className="label">Product Name</Form.Label>
              <Form.Control
                onChange={(e) => setProductname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="unitprice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="unitprice"
                required
                onChange={(e) => setUnitprice(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="sellingprice">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="sellingprice"
                required
                onChange={(e) => setSellingprice(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="unitmeasure">
              <Form.Label>Unit Measure</Form.Label>
              <Form.Control
                type="unitmeasure"
                required
                onChange={(e) => setUnitmeasure(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="category">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={handleChange} className="category" aria-label="category">
                {category_name.map((option, index) => (
                  <option key={index} value={option.value}>{option.category_name}</option>
                ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <div >
              <Button type="submit" className="button-login">
                Add to List
              </Button>
              <br />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default AddProduct;
