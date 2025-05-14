import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Admin/Login';
import Dashboard from './Pages/Admin/Dashboard';
import RoomAdmin from './Pages/Admin/RoomAdmin';
import BookingRoom from './Pages/Admin/BookingRoom';
import BillAdmin from './Pages/Admin/BillAdmin';
import CustomerManager from './Pages/Admin/CustomerManager';
import AccountCustomerManager from './Pages/Admin/AccountCustomerManager';
import RoomManager from './Pages/Admin/RoomManager';
import RoomTypeManager from './Pages/Admin/RoomTypeManager';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/RoomAdmin" element={<RoomAdmin />} />
        <Route path="/BookingRoom" element={<BookingRoom />} />
        <Route path="/BillAdmin" element={<BillAdmin />} />
        <Route path="/CustomerManager" element={<CustomerManager />} />
        <Route path="/AccountCustomerManager" element={<AccountCustomerManager/>} />
        <Route path="/RoomManager" element={<RoomManager/>} />
         <Route path="/RoomTypeManager" element={<RoomTypeManager/>} />
      </Routes>
    </Router>
  );
};

export default App;