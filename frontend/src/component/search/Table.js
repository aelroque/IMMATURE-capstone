import React from 'react';

function Table({data}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>PID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>Unit Price</th>
            <th>Selling Price</th>
            <th>Unit Measure</th>
            <th>Brand Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.pid} alt={item.pname}>
              <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>{item.category}</td>
              <td>{item.instock}</td>
              <td>{item.uprice}</td>
              <td>{item.srp}</td>
              <td>{item.uom}</td>
              <td>{item.brand}</td>
              <td>{item.descript}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
