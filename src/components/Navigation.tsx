import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// simple navbar component to be usedon all pages
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
            <Nav.Link
              as={Link}
              to="/https://github.com/GaelGil/algorithm-visualizer"
            >
              Git-Repo
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
