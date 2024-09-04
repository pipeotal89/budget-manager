import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavBar.css";

interface NavBarProps {
  month: string;
}

function NavBar(props: NavBarProps) {
  const { month } = props;

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href={`/${month}`} style={{ fontSize: "30px" }}>
          Budget Manager 2.0
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown
            title={month!.charAt(0).toUpperCase() + month!.substring(1)}
            id="basic-nav-dropdown"
            style={{ fontSize: "20px" }}
          >
            <NavDropdown.Item href="/current">Current</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/next">Next</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
