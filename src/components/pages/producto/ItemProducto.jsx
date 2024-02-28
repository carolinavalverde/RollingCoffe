import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProducto } from "../../../helpers/queries";

const ItemProducto = ({ producto }) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        //solicitar a la api eliminar el producto
        borrarProducto(producto.id);

        Swal.fire({
          title: "Producto eliminado",
          text: `El producto ${
            (producto, nombreProducto)
          } fue eliminado correctamente`,
          icon: "success",
        });
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
      <td>{producto.categoría}</td>
      <td className="text-center">
        <Button variant="warning" className="me-lg-2">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
