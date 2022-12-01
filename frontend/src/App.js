import Footer from './component/Footer.js';
import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import Register from './component/Register.js';
import Login from './component/Login';
import Home from './page/Home.js';
import InStock from './component/product/Stocks.js';
import AddProduct from './component/product/AddProduct.js';
import Dashboard from './page/Dashboard.js';
import SlugView from './component/ecommerce/SlugView.js';
import Featured from './component/ecommerce/Featured.js';
import UpdateProduct from './component/product/EditModal.js';
import ProductSearch from './component/search/Search.js';
import SearchTable from './component/search/SearchTable.js';
import Update from './component/product/Update.js';
import Reference from './component/user/Reference.js';


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>immature</Navbar.Brand>
              </LinkContainer>
              <Link className="nav-link" to="login">
                <i className="fas fa-user" />
                {''} Login
              </Link>
            </Container>
          </Navbar>
        </header>

        <main>
          <Routes>
            <Route path="/reference" element={<Reference />} />
            <Route path="/update" element={<Update />} />
            <Route path="/search/table" element={<SearchTable />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products/:slug" element={<SlugView />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/update/:pid" element={<UpdateProduct />} />
            <Route path="/products" element={<InStock />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
