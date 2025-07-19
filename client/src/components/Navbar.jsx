import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <BSNavbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold">
          Contact Book
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/view-contacts">
              View Contacts
            </Nav.Link>
            <Nav.Link as={Link} to="/add-contact">
              Add Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/manage-user">
              Manage User
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/logout-user">Logout</Nav.Link> */}
            <Nav.Link as={Link} to="/logout-user" className="logout-link">
              Logout
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
