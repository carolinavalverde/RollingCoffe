import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { registrarUsuario } from "../../helpers/queries";
import { useNavigate } from "react-router-dom";

const Registro = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = async (usuario) => {
    try {
      const respuesta = await registrarUsuario(usuario);
      if (respuesta.status === 201) {
        // Registro exitoso
        Swal.fire({
          title: "Registro exitoso",
          text: `Usuario registrado correctamente`,
          icon: "success",
        });
        // Guardar el usuario en el state
        setUsuarioLogueado(usuario.email);
        // Redireccionar a la página de inicio de sesión
        navegacion("/login");
      } else {
        // Error en el registro
        Swal.fire({
          title: "Ocurrió un error",
          text: `No se pudo registrar el usuario. Inténtelo nuevamente.`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Mostrar mensaje de error
      Swal.fire({
        title: "Ocurrió un error",
        text: `Hubo un problema al intentar registrar el usuario. Por favor, inténtelo nuevamente más tarde.`,
        icon: "error",
      });
    }
  };

  return (
    <Container className="mainSection">
      <Card className="my-5">
        <Card.Header as="h5">Registro</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message:
                      "Ingrese una dirección de correo electrónico válida",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registro;
