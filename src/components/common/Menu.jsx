import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import logo from "../../assets/coffee_Logo.png";

const Menu = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="Logo de RollingCoffee"
            className="img-fluid"
            width={150}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink>Inicio</NavLink>
            <NavLink>Administrador</NavLink>
            <NavLink>Registro</NavLink>
            <NavLink>Login</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
