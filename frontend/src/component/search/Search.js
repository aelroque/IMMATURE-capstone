import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

function ProductSearch() {
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const products = await axios.get('http://localhost:8000/products');
            setProducts(products.data);
        };
        fetchData(products);
    }, []);

    return (
      <Container className="small-container">
        <Helmet>
          <title>Price List</title>
        </Helmet>

        <h1 className="my-3">Price List</h1>
        <div className="App">
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="list">
            {products
              .filter((product) => product.pname.toLowerCase().includes(query))
              .map((product) => (
                <li key={product.pid} className="lisItem">
                  {product.pname} : {product.srp}
                </li>
              ))}
          </ul>
        </div>
      </Container>
    );
}
export default ProductSearch;