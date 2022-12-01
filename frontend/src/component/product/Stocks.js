import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AddProducts from './AddProduct.js';
import { Link } from 'react-router-dom';
//import {ReactToPrint} from 'react-to-print';


function InStock() {
 
  const [products, setProducts] = useState([]);
  //const [show, toggleShow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await axios.get('http://localhost:8000/products');
      setProducts(products.data);
      console.log(products);
    };
    fetchData(products);
  }, [products]);

  return (
    <div>
      <Row>
        <Col>
          <h1>Stocks</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={AddProducts}>
              <Link to="/products/add">Add Product</Link>
            </Button>
            <Button type="button">
              <Link to="/search/table">Product Search</Link>
            </Button>
          </div>
        </Col>
      </Row>

      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>Unit Price</th>
            <th>Selling Price</th>
            <th>Unit Measure</th>
            <th>Brand Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.pid} alt={product.pname}>
              <td>{product.code}</td>
              <td>{product.pname}</td>
              <td>{product.category}</td>
              <td>{product.instock}</td>
              <td>{product.uprice}</td>
              <td>{product.srp}</td>
              <td>{product.uom}</td>
              <td>{product.brand}</td>
              <td>{product.descript}</td>
              <td>
                <Link to={'/products/update/' + product.pid}>Edit</Link> {''}

                {/* <Button
                  className="btn"
                  variant="light"
                  onClick={() => toggleShow(!show)} >
                  {show ? "Show" : " Hide"}
                </Button>
                {show &&<h2>Hidden</h2>} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <Button>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <br />
      </div>
    </div>
  );
};

export default InStock;
