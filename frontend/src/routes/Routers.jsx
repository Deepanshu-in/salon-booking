import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import Salons from "../pages/Salons/Salons";
import SalonsDetails from "../pages/Salons/SalonsDetails";
import Barber from "../pages/Barber/Barber";
import BarberDetails from "../pages/Barber/BarberDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/salon-account/Dashboard";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProtectedRoutes from "./ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/salons/:id" element={<SalonsDetails />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="/barber/:id" element={<BarberDetails />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["customer"]}>
              <MyAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/salons/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["salon"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default Routers;
