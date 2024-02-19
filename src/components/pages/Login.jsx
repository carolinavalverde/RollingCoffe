import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormularioLogin = () => {
  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Iniciar Sesión</h1>
      <hr />
      <Form className="my-4">
        <Form.Group className="mb-3" controlId="formCorreoElectronicoLogin">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            className="form-control"
            id="email"
            placeholder="nombre@ejemplo.com"
            minlength="5"
            maxlength="100"
            required
          />
          <Form.Text className="text-danger">prueba de error</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContraseñaLogin">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            id="password"
            placeholder="Escribe tu contraseña"
            minlength="8"
            maxlength="15"
            required
          />
          <Form.Text className="text-danger">prueba de error</Form.Text>
        </Form.Group>
        <Button type="submit" variant="success" className="mb-4">
          Iniciar Sesión
        </Button>
        <Form.Group className="mb-3" controlId="formOlvidasteTuContraseñaLogin">
          <Link to="/error">Olvidaste tu contraseña?</Link>
        </Form.Group>
      </Form>
    </section>
  );
};

export default FormularioLogin;
