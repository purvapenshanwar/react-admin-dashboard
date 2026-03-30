import { Route, Routes } from "react-router-dom";
import Transactions from "./transactions/pages/Transactions.tsx";
import ShipmentPage from "./Shipments/pages/ShipmentPage.tsx";
import ShipmentDetailsPage from "./Shipments/pages/ShipmentDetailsPage.tsx";
function App() {
  return (
 <Routes>
   {/* <Route path="/" element={<Transactions />} /> */}
   <Route path="/" element={<ShipmentPage/>} />
  <Route path="/shipment/:id" element={<ShipmentDetailsPage />} />
</Routes>

 
  );
}

export default App;