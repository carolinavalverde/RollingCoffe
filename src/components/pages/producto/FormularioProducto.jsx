import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  crearProducto,
  obtenerProducto,
  editarProducto,
} from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormularioProducto = ({ editando, titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    if (editando) {
      //solicitar y mostrar el producto en el formullario
      cargarProductoEnFormulario();
    }
  }, []);

  const cargarProductoEnFormulario = async () => {
    const respuesta = await obtenerProducto(id);
    if (respuesta.status === 200) {
      //extraer el producto de la respuesta
      const productoBuscado = await respuesta.json();
      //cargar los datos del producto en el formulario
      setValue("nombreProducto", productoBuscado.nombreProducto);
      setValue("precio", productoBuscado.precio);
      setValue("imagen", productoBuscado.imagen);
      setValue("categoria", productoBuscado.categoria);
      setValue("descripcion_breve", productoBuscado.descripcion_breve);
      setValue("descripcion_amplia", productoBuscado.descripcion_amplia);
    }
  };

  const datosValidados = async (producto) => {
    //console.log(producto);
    if (editando) {
      const respuesta = await editarProducto(producto, id);
      console.log(respuesta);
      //si recibi status 200 se edito correctamente
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Producto editado",
          text: `El producto: ${producto.nombreProducto} fue editado correctamente`,
          icon: "success",
        });
        //redireccionar
        navegacion("/administrador");
      } else {
        Swal.fire({
          title: "El producto no se pudo editar",
          text: `El producto: ${producto.nombreProducto} no se pudo editar, intentelo nuevamente`,
          icon: "error",
        });
      }
    } else {
      //le voy a pedir a la api crear el producto nuevo
      const respuesta = await crearProducto(producto);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Producto creado",
          text: `El producto: ${producto.nombreProducto} fue creado correctamente`,
          icon: "success",
        });
        //resetear el form
        reset();
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: `El producto no pude ser creado, intente esta operacion en unos minutos`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(datosValidados)}>
        <Form.Group className="mb-3" controlId="formNombreProducto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es un dato obligatorio",
              minLength: {
                value: 4,
                message:
                  "El nombre del producto debe tener como mínimo 4 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "El nombre del producto debe tener como máximo 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio es un dato obligatorio",
              min: {
                value: 100,
                message: "El precio del producto es como mínimo de $100",
              },
              max: {
                value: 10000,
                message: "El precio del producto es como máximo de $10000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La url de la imagen es obligatoria",
              pattern: {
                value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/,
                message:
                  "Debe ingresar una URL válida, con una imagen en formato (jpg | jpeg | gif | png)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoría",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Infusiones">Infusiones</option>
            <option value="Batidos">Batidos</option>
            <option value="Dulce">Dulce</option>
            <option value="Salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescripcionBreve">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Una taza de café suave y aromático."
            as="textarea"
            {...register("descripcion_breve", {
              required: "La descripcion breve es obligatoria",
              minLength: {
                value: 10,
                message: "Debe ingresar como minimo 10 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe ingresar como maximo 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_breve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescripcionAmplia">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente, lo que resulta en una taza de café suave y aromático. Es una opción popular para aquellos que prefieren un café menos intenso que el espresso tradicional. Perfecto para disfrutar en cualquier momento del día."
            as="textarea"
            {...register("descripcion_amplia", {
              required: "La descripcion amplia es obligatoria",
              minLength: {
                value: 30,
                message: "Debe ingresar como minimo 30 caracteres",
              },
              maxLength: {
                value: 300,
                message: "Debe ingresar como maximo 300 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_amplia?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioProducto;
