import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Homepage from "../pages/Homepage";

const user = JSON.parse(localStorage.getItem("user"));
const router = createBrowserRouter([
  {
    path: "/:pId?",
    element: user ? <Homepage /> : <WelcomePage />,
    errorElement: <div>Not found</div>,
  },
]);

export default router;
