import { Routes, Route } from "react-router-dom";
import Administrador from "../components/pages/Administrador";
import FormularioProducto from "../components/pages/producto/FormularioProducto";

const RutasAdmin = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Administrador></Administrador>}
      ></Route>
      <Route
        exact
        path="/crear"
        element={
          <FormularioProducto
            editando={false}
            titulo="Nuevo producto"
          ></FormularioProducto>
        }
      ></Route>
      <Route
        exact
        path="/editar/:id"
        element={
          <FormularioProducto
            editando={true}
            titulo="Editar producto"
          ></FormularioProducto>
        }
      ></Route>
    </Routes>
  );
};
