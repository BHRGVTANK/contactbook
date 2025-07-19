import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import ViewContactsPage from "./pages/ViewContactsPage";
import AddContactsPage from "./pages/AddContactsPage";
import ManageUser from "./pages/ManageUser";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditContactPage from "./pages/EditContactPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/view-contacts" element={<ViewContactsPage />} />
        <Route path="/add-contact" element={<AddContactsPage />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/logout-user" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editcontact/:id" element={<EditContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
