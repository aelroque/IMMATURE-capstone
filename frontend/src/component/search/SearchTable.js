import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Table from './Table';

function SearchTable() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const products = await axios.get('http://localhost:8000/products');
      setProducts(products.data);
    };
    fetchData(products);
  }, [products]);
    
    const keys = ["pname", "category", "brand", "descript"]
    
    const search = (data) => {
        return data.filter((item) =>    
            keys.some((keys) => item[keys].toLowerCase().includes(query))
        );
    };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Search Product</title>
      </Helmet>

      <h1 className="my-3">Product Table</h1>
      <div className="App">
        <input
          type="text"
          placeholder="Search"
          className="search"
          onChange={(e) => setQuery(e.target.value)}
              />
              <br />
              <Table data={search(products)} />
      </div>
      <Button>
        <Link to="/products">Stocks</Link>
      </Button>
      <Button>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    </Container>
  );
}
export default SearchTable;
