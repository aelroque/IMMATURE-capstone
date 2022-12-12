import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddSupplier from './AddSupplier.js';
import UpdateSupplier from './UpdateSupplier.js';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplier_id, setSupplier_id] = useState('');
   
  useEffect(() => {
     const fetchData = async () => {
       const suppliers = await axios.get('http://localhost:8000/suppliers');
       setSuppliers(suppliers.data);
     };
     fetchData();
  }, [suppliers]);
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Suppliers</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={AddSupplier}>
              <Link to="/suppliers/add">Add Supplier</Link>
            </Button>
          </div>
        </Col>
      </Row>

      <table className="table">
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Business Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Representative</th>
            <th>Tax Type</th>
            <th>TIN No.</th>
            <th>Action</th>
          </tr>
            </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.supplier_id}>
              <td>{supplier.supplier_code} </td>
              <td>{supplier.business_name}</td>
              <td>{supplier.supplier_email}</td>
              <td>{supplier.supplier_contact}</td>
              <td>{supplier.representative}</td>
              <td>{supplier.tax}</td>
              <td>{supplier.tin}</td>
              <td>
                <UpdateSupplier supplier={supplier} id={`${supplier.supplier_id}`} />
                &nbsp;
              </td>
            </tr>
          ))}
          </tbody>
      </table>

          <div className="mb-3">
        <Button>
          <Link to="/dashboard">Back</Link>
        </Button>
        <br />
            </div>       
    </Container>
  );
}

export default SupplierList;