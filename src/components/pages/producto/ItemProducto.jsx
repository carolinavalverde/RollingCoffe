import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProducto, leerProductos } from "../../../helpers/queries";
import { Link } from 'react-router-dom';

const ItemProducto = ({ producto, setProductos }) => {

  const eliminarProducto = () => {
    Swal.fire({
      title: "está seguro de eliminar el producto?",
      text: "No se puede revertir ésta operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //solicitar a la api eliminar el producto
        const respuesta = await borrarProducto(producto.id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto ${producto.nombreProducto} fue eliminado correctamente`,
            icon: "success",
          });

          //actualizar tabla del administrador
          const respuestaNuevosProductos = await leerProductos();
          if (respuestaNuevosProductos.status === 200) {
            const nuevosProductos = await respuestaNuevosProductos.json()
            setProductos(nuevosProductos);
          }
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto ${producto.nombreProducto} no fue eliminado, intente ésta operacion en unos minutos`,
            icon: "error"
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{producto.id}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">{producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Link className="me-lg-2 btn btn-warning" to={'/administrador/editar/'+ producto.id}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
