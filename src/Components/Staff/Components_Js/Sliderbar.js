import React from 'react';
import '../Components_Css/Sliderbar.css';
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar, onLogoutClick }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sb-close-icon">
          <img onClick={toggleSidebar} src="/icon_LTW/dongslidebar.png" alt="Đóng Sidebar" />
        </div>
        <div className="avatar-placeholder">
          <img src="/icon_LTW/Admin.jpg" alt="Avatar Staff" />
        </div>
        <p>Staff</p>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/Staff/Dashboard">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_TrangChu.png" alt="Trang Chủ" />
            </span> Trang Chủ
          </Link>
        </li>
        <li>
          <Link to="/Staff/RoomStaff">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_Phong.png" alt="Phòng" />
            </span> Phòng
          </Link>
        </li>
        <li>
          <Link to="/Staff/BookingRoom">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_DatPhong.png" alt="Đặt Phòng" />
            </span> Đặt Phòng
          </Link>
        </li>
        <li>
          <Link to="/Staff/BillStaff">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_HoaDon.png" alt="Hóa Đơn" />
            </span> Hóa Đơn
          </Link>
        </li>
        <li>
          <Link to="/Staff/CustomerManager">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_QLKH.png" alt="QL Khách Hàng" />
            </span> QL Khách Hàng
          </Link>
        </li>
        <li>
          <button onClick={onLogoutClick} className="sidebar-menu-button">
            <span className="menu-icon">
              <img src="/icon_LTW/SB_DangXuat.png" alt="Đăng Xuất" />
            </span> Đăng Xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;