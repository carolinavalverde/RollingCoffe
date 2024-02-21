import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormularioLogin = () => {
  return (
    <section className="container mainSection">
      <div className="card">
        <div className="card-title bg-body-tertiary">
          <h1 className="mx-3 my-2">Login</h1>
        </div>
        <div className="card-body">
          <Form>
            <Form.Group
              className="mb-3 container"
              controlId="formCorreoElectronicoLogin"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control bg-body-tertiary"
                id="email"
                placeholder="admin@rollingcode.com"
                minlength="5"
                maxlength="100"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 container"
              controlId="formContraseñaLogin"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control bg-body-tertiary"
                id="password"
                placeholder="Escribe tu contraseña"
                minlength="8"
                maxlength="15"
                required
              />
            </Form.Group>
            <div className="container">
              <Button type="submit" variant="primary" className="mb-4">
                Iniciar Sesión
              </Button>
            </div>
            <Form.Group
              className="mb-3 container"
              controlId="formOlvidasteTuContraseñaLogin"
            >
              <Link to="/error">Olvidaste tu contraseña?</Link>
            </Form.Group>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default FormularioLogin;
