import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import Footer from './component/Footer';

function App() {
  return (
    <div>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>immature</Navbar.Brand>
        </LinkContainer>
        <Link className="nav-link" to="signin">
          <i className="fas fa-user" />
          {''} Sign In
        </Link>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
