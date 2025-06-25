import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Algorithm Visualiser
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/graphs">
              Graphs
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Arrays
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
