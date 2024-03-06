import { useEffect, useState } from "react";
import { obtenerProducto } from "../../helpers/queries";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarPoducto = async () => {
      try {
        const response = await obtenerProducto(id);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        Swal.fire({
          title: "El producto no se pudo cargar",
          text: `Intentelo nuevamente más tarde.`,
          icon: "error",
        });
      }
    };

    cargarPoducto();
  }, [id]);

  if (!producto) {
    return null;
  }

  const { imagen, nombreProducto, descripcion, categoria, precio } = producto;

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img variant="top" className="img-fluid" src={imagen} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">{nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
                {descripcion}
                <br />
                <br />
                <span className="primary-font fw-semibold">
                  Categoría:
                </span>{" "}
                {categoria}
                <br className="mb-3" />
                <span className="primary-font fw-semibold">Precio:</span> $
                {precio}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
