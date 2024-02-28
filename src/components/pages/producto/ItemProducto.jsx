import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarProducto, leerProductos } from "../../../helpers/queries";

const ItemProducto = ({ producto, setProducto }) => {
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
            text: `El producto ${
              (producto, nombreProducto)
            } fue eliminado correctamente`,
            icon: "success",
          });
          //actualizar tabla del administrador
          const respuestaNuevosProductos = await leerProductos();
          if (respuestaNuevosProductos.status === 200) {
            const nuevosProductos = await respuestaNuevosProductos.json();
            setProducto(nuevosProductos);
          }
        } else {
          Swal.fire({
            title: "Ocurrio un erro",
            text: `El producto ${
              (producto, nombreProducto)
            } no fue eliminado correctamente, intente la operacion nuevamente`,
            icon: "error",
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
