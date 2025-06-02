import React, { useState } from 'react';
import '../../Design_Css/Staff/BookingRoom.css';
import Sidebar from '../../Components/Staff/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Staff/Components_Js/LogoutModal'; 


const BookingList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const bookings = [
    { id: 1, customerName: 'Nguyễn Sơn Phi Hoàng', bookingDate: '27/03/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P101', startDate: '27/03/2025 12:00 AM', endDate: '29/03/2025 12:00 AM', guestCount: 2 },
    { id: 2, customerName: 'Nguyễn Văn A', bookingDate: '28/03/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P102', startDate: '28/03/2025 12:00 AM', endDate: '30/03/2025 12:00 AM', guestCount: 3 },
    { id: 3, customerName: 'Trần Thị B', bookingDate: '29/03/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P103', startDate: '29/03/2025 12:00 AM', endDate: '31/03/2025 12:00 AM', guestCount: 1 },
    { id: 4, customerName: 'Lê Văn C', bookingDate: '30/03/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P104', startDate: '30/03/2025 12:00 AM', endDate: '01/04/2025 12:00 AM', guestCount: 2 },
    { id: 5, customerName: 'Phạm Thị D', bookingDate: '31/03/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P105', startDate: '31/03/2025 12:00 AM', endDate: '02/04/2025 12:00 AM', guestCount: 4 },
    { id: 6, customerName: 'Đỗ Văn E', bookingDate: '01/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P106', startDate: '01/04/2025 12:00 AM', endDate: '03/04/2025 12:00 AM', guestCount: 2 },
    { id: 7, customerName: 'Võ Thị F', bookingDate: '02/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P107', startDate: '02/04/2025 12:00 AM', endDate: '04/04/2025 12:00 AM', guestCount: 3 },
    { id: 8, customerName: 'Nguyễn Hữu G', bookingDate: '03/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P108', startDate: '03/04/2025 12:00 AM', endDate: '05/04/2025 12:00 AM', guestCount: 1 },
    { id: 9, customerName: 'Bùi Thị H', bookingDate: '04/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P109', startDate: '04/04/2025 12:00 AM', endDate: '06/04/2025 12:00 AM', guestCount: 2 },
    { id: 10, customerName: 'Lý Văn I', bookingDate: '05/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P110', startDate: '05/04/2025 12:00 AM', endDate: '07/04/2025 12:00 AM', guestCount: 3 },
    { id: 11, customerName: 'Trần Minh J', bookingDate: '06/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P111', startDate: '06/04/2025 12:00 AM', endDate: '08/04/2025 12:00 AM', guestCount: 2 },
    { id: 12, customerName: 'Nguyễn Thị K', bookingDate: '07/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P112', startDate: '07/04/2025 12:00 AM', endDate: '09/04/2025 12:00 AM', guestCount: 1 },
    { id: 13, customerName: 'Hoàng Văn L', bookingDate: '08/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P113', startDate: '08/04/2025 12:00 AM', endDate: '10/04/2025 12:00 AM', guestCount: 4 },
    { id: 14, customerName: 'Vũ Thị M', bookingDate: '09/04/2025', employeeName: 'Chu Ngọc Sơn', roomNumber: 'P114', startDate: '09/04/2025 12:00 AM', endDate: '11/04/2025 12:00 AM', guestCount: 2 },
  ];

  const availableRooms = [
    { id: 'P101', type: 'Phòng đơn' },
    { id: 'P102', type: 'Phòng đôi' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

 const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/'; // Điều hướng sau khi xác nhận
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleSaveConfirm = () => {
    console.log('Lưu thông tin đặt phòng:', selectedRooms);
    setShowSaveConfirm(false);
    setIsFormOpen(false);
    setSelectedRooms([]);
  };

  const handleCancelSave = () => {
    setShowSaveConfirm(false);
  };

  const handleDetails = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const booking = bookings.find((b) => b.id === id);
    setBookingToDelete(booking);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa phiếu thuê ${bookingToDelete.id}`);
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
  };

  const handleAddBooking = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRooms([]);
  };

  const handleSaveBooking = () => {
    if (selectedRooms.length === 0) {
      alert('Vui lòng chọn ít nhất một phòng trước khi lưu.');
      return;
    }
    setShowSaveConfirm(true);
  };

  const handleAddRoom = (room) => {
    setSelectedRooms([...selectedRooms, { ...room, guests: 1 }]);
  };

  const handleRemoveRoom = (roomId) => {
    setSelectedRooms(selectedRooms.filter((room) => room.id !== roomId));
  };

  const handleMoreOptions = () => {
    console.log('Mở tùy chọn bổ sung');
  };

  return (
    <div className="booking-list-container">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogoutClick={handleLogoutClick}
      />
       <LogoutModal 
        isOpen={showLogoutConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Đặt Phòng</div>
        </div>
        <div className="more-icon" onClick={handleMoreOptions}>⋮</div>
      </div>

      <div className="content-wrapperr">
        <div className="search-bar-container">
          <div className="search-barr">
            <span className="search-icon"><img src="/icon_LTW/TimKiem.png" alt="Tìm kiếm"></img></span>
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-booking-button" onClick={handleAddBooking}>
            Đặt phòng
          </button>
        </div>

        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Số phiếu thuê</th>
                <th>Tên khách hàng</th>
                <th>Ngày lập phiếu</th>
                <th>Tên nhân viên</th>
                <th>Chi tiết</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.employeeName}</td>
                  <td>
                    <button
                      className="details-buttonn"
                      onClick={() => handleDetails(booking.id)}
                    >
                      <img src="/icon_LTW/ChiTiet.png" alt="Chi tiết"></img>
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <img src="/icon_LTW/Xoa.png" alt="Xóa"></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div className="booking-form-overlay">
          <div className="booking-form-container">
            <h2 className="booking-form-title">Đặt Phòng</h2>

            <div className="form-sections">
              <div className="form-section">
                <h3>Thông tin khách hàng</h3>
                <div className="form-group">
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_Hoten.png" alt="Họ tên"></img></span>
                    <input type="text" placeholder="Họ và tên" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_CCCD.png" alt="CCCD"></img></span>
                    <input type="text" placeholder="Nhập CCCD" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_SĐT.png" alt="SĐT"></img></span>
                    <input type="text" placeholder="Nhập SĐT" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_Diachi.png" alt="Địa chỉ"></img></span>
                    <input type="text" placeholder="Nhập địa chỉ" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_QuocTich.png" alt="Quốc tịch"></img></span>
                    <input type="text" placeholder="Nhập quốc tịch" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_GioiTInh.png" alt="Giới tính"></img></span>
                    <select>
                      <option value="" disabled selected>Giới tính</option>
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Thông tin phòng</h3>
                <div className="form-group">
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/Lich.png" alt="Ngày bắt đầu"></img></span>
                    <input type="date" placeholder="Ngày bắt đầu" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/DongHo.png" alt="Giờ bắt đầu"></img></span>
                    <input type="time" placeholder="Giờ bắt đầu" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/Lich.png" alt="Ngày kết thúc"></img></span>
                    <input type="date" placeholder="Ngày kết thúc" />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/DongHo.png" alt="Giờ kết thúc"></img></span>
                    <input type="time" placeholder="Giờ kết thúc" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rooms-container">
              <div className="rooms-section">
                <h4>Danh sách phòng trống</h4>
                <table className="room-table">
                  <thead>
                    <tr>
                      <th>Số phòng</th>
                      <th>Loại phòng</th>
                      <th>Thêm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableRooms
                      .filter((room) => !selectedRooms.some((r) => r.id === room.id))
                      .map((room) => (
                        <tr key={room.id}>
                          <td>{room.id}</td>
                          <td>{room.type}</td>
                          <td>
                            <button
                              className="action-button add-room-button"
                              onClick={() => handleAddRoom(room)}
                            >
                              <img src="/icon_LTW/MdiPlusCircle.png" alt="Thêm phòng"></img>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="rooms-section">
                <h4>Phòng đã chọn</h4>
                <table className="room-table">
                  <thead>
                    <tr>
                      <th>Số phòng</th>
                      <th>Loại phòng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRooms.length > 0 ? (
                      selectedRooms.map((room) => (
                        <tr key={room.id}>
                          <td>{room.id}</td>
                          <td>{room.type}</td>
                          <td>
                            <button
                              className="action-button remove-room-button"
                              onClick={() => handleRemoveRoom(room.id)}
                            >
                              <img src="/icon_LTW/MdiMinusCircle.png" alt="Xóa phòng"></img>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">Chưa có phòng nào được chọn</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-buttons">
              <button className="cancel-button" onClick={handleSaveBooking}>LƯU</button>
              <button className="cancel-buttonn" onClick={handleCloseForm}>THOÁT</button>
            </div>
          </div>
        </div>
      )}


      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={handleCancelSave}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn đã đặt phòng thành công !</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleSaveConfirm}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && bookingToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có muốn xóa khách hàng này?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmDelete}>
                YES
              </button>
              <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccess && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Xóa thành công!</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowDeleteSuccess(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedBooking && (
        <div className="details-modal">
          <div className="details-modal-contentt">
            <h2 className="details-modal-title">Chi Tiết Phiếu Thuê {selectedBooking.id}</h2>
            <div className="details-modal-header">
              <div className="header-item">
                <span role="img" aria-label="user"><img src="/icon_LTW/ĐP_Chitietphieuthue.png" alt="Khách hàng"></img>
                </span> {selectedBooking.customerName}
              </div>
              <div className="header-item">
                <span role="img" aria-label="calendar"><img src="/icon_LTW/Lich.png" alt="Ngày lập"></img>
                </span> {selectedBooking.bookingDate}
              </div>
              <div className="header-item">
                <span role="img" aria-label="employee"><img src="/icon_LTW/ĐPChitietphieuthue2.png" alt="Nhân viên"></img>
                </span> {selectedBooking.employeeName}
              </div>
            </div>
            <table className="bk-details-table">
              <thead>
                <tr>
                  <th>Số phòng</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Số người</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedBooking.roomNumber}</td>
                  <td>{selectedBooking.startDate}</td>
                  <td>{selectedBooking.endDate}</td>
                  <td>{selectedBooking.guestCount}</td>
                </tr>
              </tbody>
            </table>
            <div className="details-modal-buttons">
              <button className="close-details-buttonn" onClick={handleCloseDetails}>
                Thoát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;