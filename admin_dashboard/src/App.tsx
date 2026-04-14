import { Route, Routes } from "react-router-dom";
import ShipmentPage from "./Shipments/pages/ShipmentPage.tsx";
import ShipmentDetailsPage from "./Shipments/pages/ShipmentDetailsPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import DeliveryPartnerDetails from "./DeliveryPartners/DeliveryPartnerDetails.tsx";
import AdminRolesPage from "./AdminRoleManagement/AdminRole";
function App() {
  return (
    <Routes>
      {/* 🔥 Layout */}
      {/* <Route path="/" element={<DashboardLayout />}> */}
        {/* Pages */}
        {/* <Route index element={<ShipmentPage />} /> */}
        {/* <Route path="shipment/:id" element={<ShipmentDetailsPage />} /> */}
        {/* <Route path="/" element={<DeliveryPartnerDetails />} /> */}
       <Route path="/" element={<AdminRolesPage />} /> 
      
    </Routes>
  );
}

export default App;
