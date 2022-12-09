import React, { useState } from 'react';
import { Button, Form, Modal} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProduct = ({ product, pid }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedPname, setUpdatedPname] = useState([product.pname]);
  const [updatedCategory, setUpdatedCategory] = useState([product.category]);
  const [updatedBrand, setUpdatedBrand] = useState([product.brand]);

  const [errMsg, setErrMsg] = useState('');

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/products/update/${product.pid}`,
        JSON.stringify({
          pname: updatedPname,
          category: updatedCategory,
          brand: updatedBrand,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true
        }
      );
      console.log(updatedBrand);
      console.log(updatedCategory);
      console.log(updatedPname);
      console.log(response);
      toast.success('Updated Successfully');
      window.location = '/products/update'; //refresh the page
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        toast.err('No Server Response');
      } else {
        setErrMsg('Failed to add product');
        toast.err('Failed to add product');
      }
    }
  };

  return (
    <>
      <Button
        className='"btn btn-primary'
        onClick={handleShow}
        controlledid={product.pid}
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
          <Modal.Title>Edit Product {product.pid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editProduct(e)} controlledid={product.pid}>
            <Form.Group className="mb-3" controlledid="updatedPname">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="updatedPname"
                defaultValue={updatedPname}
                onChange={(e) => setUpdatedPname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="updatedCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="updatedCategory"
                defaultValue={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlledid="updatedBrand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="updatedBrand"
                defaultValue={updatedBrand}
                onChange={(e) => setUpdatedBrand(e.target.value)}
              />
            </Form.Group>

            {/*<Form.Group className="mb-3" controlledid="instock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="instock"
              required
              defaultValue={product.instock } 
              onChange={(e) => setInstock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlledid="uprice">
            <Form.Label>U. Price</Form.Label>
            <Form.Control
              type="uprice"
              required
              defaultValue={product.uprice } 
              onChange={(e) => setUprice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlledid="srp">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              type="srp"
              required
              defaultValue={product.srp} 
              onChange={(e) => setSrp(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlledid="uom">
            <Form.Label>Unit Measure</Form.Label>
            <Form.Control
              type="uom"
              required
              defaultValue={product.uom} 
              onChange={(e) => setUom(e.target.value)}
            />
          </Form.Group>



          <Form.Group className="mb-3" controlledid="descript">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="descript"
              required
              defaultValue={product. descript} 
              onChange={(e) => setDescript(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="UploadImage" controlledid="image">
            <Form.Label>Upload Image here</Form.Label>
            <Form.Control
              type="file"
              // required
              //onChange={(e) => SetImage(e.target.value)}
              onClick={UploadImage}
            />
          </Form.Group> */}
            <Modal.Footer>
              <Button className="btn btn-secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>

            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProduct;
