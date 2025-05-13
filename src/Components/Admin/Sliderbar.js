import React from 'react';
import './Sliderbar.css'; 
import { Link } from "react-router-dom";
const Sidebar = ({ isSidebarOpen, toggleSidebar, onLogoutClick }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="close-icon" onClick={toggleSidebar}>X</div>
        <div className="avatar-placeholder"></div>
        <p>Administrator</p>
      </div>
      <ul className="sidebar-menu">
      <li>
    <Link to="/Dashboard">
      <span className="menu-icon">🏠</span> Trang Chủ
    </Link>
  </li>
  <li>
    <Link to="/RoomAdmin">
      <span className="menu-icon">🛏️</span> Phòng
    </Link>
  </li>
  <li>
    <Link to="/BookingRoom">
      <span className="menu-icon">📅</span> Đặt Phòng
    </Link>
  </li>
  <li>
    <Link to="/BillAdmin">
      <span className="menu-icon">📄</span> Hóa Đơn
    </Link>
  </li>
  <li>
    <Link to="/CustomerManager">
      <span className="menu-icon">👥</span> QL Khách Hàng
    </Link>
  </li>
  <li>
    <Link to="/AccountCustomerManager">
      <span className="menu-icon">📋</span> QLTK Khách Hàng
    </Link>
  </li>
  <li>
    <Link to="/ql-loai-phong">
      <span className="menu-icon">🏢</span> QL Phòng
    </Link>
  </li>
  <li>
    <Link to="/ql-dich-vu">
      <span className="menu-icon">🏢</span> QL Loại Phòng
    </Link>
  </li>
  <li>
    <Link to="/nhan-vien">
      <span className="menu-icon">👤</span> QL Dịch Vụ
    </Link>
    </li>
  <li>
    <Link to="/qlct-tinh-diem">
      <span className="menu-icon">🔢</span> QLCT Tính Điểm
    </Link>
  </li>
  <li>
    <Link to="/qlls-tich-diem">
      <span className="menu-icon">🔢</span> QLLS Tích Điểm
    </Link>
  </li>
  <li>
    <Link to="/tai-khoan">
      <span className="menu-icon">📋</span> QL Tài Khoản
    </Link>
  </li>
  <li onClick={onLogoutClick}>
          <span className="menu-icon">📊</span> Đăng Xuất
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;