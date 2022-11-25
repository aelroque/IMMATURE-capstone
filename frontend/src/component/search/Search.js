import axios from "axios";
import { useEffect, useState } from "react";

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
        <div className="App">
            <input
                type="text"
                placeholder="Search"
                className="search"
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="list">
                {products.filter(product=>product.pname.toLowerCase().includes(query)).map((product) => (
                    <li key={product.pid} className="lisItem">{product.pname} : {product.srp}</li>
                ))}
            </ul>
        </div>
    )
}
export default ProductSearch;