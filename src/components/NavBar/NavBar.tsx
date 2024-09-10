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

  const url = "https://budget-manager-server-tau.vercel.app";

  const deleteProductsFromCurrent = () => {
    const data = {
      month: "current",
    };
    fetch(`${url}/api/v1/products/clear_month`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteCategoriesFromCurrent = () => {
    const data = {
      month: "current",
    };
    fetch(`${url}/api/v1/categories/clear_month`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const advanceCategoriesFromNext = () => {
    const data = {
      month: "next",
      new_month: "current",
    };
    fetch(`${url}/api/v1/categories/change_month`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const advanceProductsFromNext = () => {
    const data = {
      month: "next",
      new_month: "current",
    };
    fetch(`${url}/api/v1/products/change_month`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  async function onAdvanceMonth() {
    const advance_sequence = [
      deleteProductsFromCurrent,
      deleteCategoriesFromCurrent,
      advanceCategoriesFromNext,
      advanceProductsFromNext,
    ];
    for (const step of advance_sequence) {
      await step();
    }
    window.location.reload();
  }

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
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onAdvanceMonth}>
              Advance Month
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
