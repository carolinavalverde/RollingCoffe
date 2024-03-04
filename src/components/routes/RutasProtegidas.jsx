import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
  //decidir su logica
  const admin =
    JSON.parse(sessionStorage.getItem("loginRollingCoffee")) || null;
  //pregunto si no estoy logueado
  if (!admin) {
    //no somos admin
    return <Navigate to={"/login"}></Navigate>;
  } else {
    //si soy admin
    return children;
  }
};

export default RutasProtegidas;
