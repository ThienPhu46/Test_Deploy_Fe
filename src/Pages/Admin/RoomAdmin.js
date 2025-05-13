import React, { useState } from 'react';
import RoomCard from '../../Components/Admin/RoomCard';
import '../../Design_Css/Admin/RoomAdmin.css';
import Sidebar from '../../Components/Admin/Sliderbar';

const Room = () => {
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterType, setFilterType] = useState('Tất cả');
  const [filterCondition, setFilterCondition] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-04-11');
  const [selectedTime, setSelectedTime] = useState('15:52');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const rooms = [
    { number: 'P101', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Đã dọn dẹp' },
    { number: 'P102', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Chưa dọn dẹp' },
    { number: 'P103', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Đã dọn dẹp' },
    { number: 'P104', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Sửa chữa' },
    { number: 'P105', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Đã dọn dẹp' },
    { number: 'P106', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đơn', condition: 'Chưa dọn dẹp' },
    { number: 'P201', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Đã dọn dẹp' },
    { number: 'P203', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Chưa dọn dẹp' },
    { number: 'P204', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Đã dọn dẹp' },
    { number: 'P205', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Sửa chữa' },
    { number: 'P206', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Đã dọn dẹp' },
    { number: 'P207', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Chưa dọn dẹp' },
    { number: 'P208', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Đã dọn dẹp' },
    { number: 'P209', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Chưa dọn dẹp' },
    { number: 'P210', status: 'Phòng trống', date: '0 ngày', roomType: 'Phòng đôi', condition: 'Đã dọn dẹp' },
    { number: 'P301', status: 'Phòng đã đặt', date: '3 ngày', roomType: 'Phòng gia đình', condition: 'Đã dọn dẹp' },
    { number: 'P302', status: 'Phòng đã đặt', date: '2 ngày', roomType: 'Phòng gia đình', condition: 'Chưa dọn dẹp' },
    { number: 'P303', status: 'Phòng đã đặt', date: '5 ngày', roomType: 'Phòng gia đình', condition: 'Đã dọn dẹp' },
    { number: 'P304', status: 'Phòng đã đặt', date: '1 ngày', roomType: 'Phòng gia đình', condition: 'Sửa chữa' },
    { number: 'P305', status: 'Phòng đã đặt', date: '4 ngày', roomType: 'Phòng gia đình', condition: 'Đã dọn dẹp' },
    { number: 'P306', status: 'Phòng đã đặt', date: '2 ngày', roomType: 'Phòng gia đình', condition: 'Chưa dọn dẹp' },
    { number: 'P401', status: 'Phòng đang thuê', date: '7 ngày', roomType: 'Phòng đơn', condition: 'Đã dọn dẹp' },
    { number: 'P402', status: 'Phòng đang thuê', date: '3 ngày', roomType: 'Phòng đơn', condition: 'Chưa dọn dẹp' },
    { number: 'P403', status: 'Phòng đang thuê', date: '5 ngày', roomType: 'Phòng đơn', condition: 'Đã dọn dẹp' },
    { number: 'P404', status: 'Phòng đang thuê', date: '2 ngày', roomType: 'Phòng đơn', condition: 'Sửa chữa' },
  ];
 const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filteredRooms = rooms.filter(room => {
    const matchesStatus = filterStatus === 'Tất cả' || room.status === filterStatus;
    const matchesType = filterType === 'Tất cả' || room.roomType === filterType;
    const matchesCondition = filterCondition === 'Tất cả' || room.condition === filterCondition;
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesCondition && matchesSearch;
  });

  return (
    
    <div className="r-room-container">
         <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={handleLogoutClick} 
      />
      <div className="r-page-header">
        <div className="r-menu-icon"onClick={toggleSidebar}>☰</div>
        <div className="r-header-content">
          <h1>Phòng</h1>
          <div className="r-date-time-picker">
            <div className="r-date-picker">
              <label>Chọn ngày</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="r-time-picker">
              <label>Chọn giờ</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="r-search-bar">
          <input
            type="text"
            placeholder="Tìm phòng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="r-search-icon">▶</span>
        </div>
      </div>

      <div className="r-filter-sidebar">
        <div className="r-filter-section">
          <h3>Trạng thái</h3>
          <label><input type="radio" name="status" value="Tất cả" checked={filterStatus === 'Tất cả'} onChange={() => setFilterStatus('Tất cả')} /> Tất cả</label>
          <label><input type="radio" name="status" value="Phòng trống" checked={filterStatus === 'Phòng trống'} onChange={() => setFilterStatus('Phòng trống')} /> Phòng trống</label>
          <label><input type="radio" name="status" value="Phòng đã đặt" checked={filterStatus === 'Phòng đã đặt'} onChange={() => setFilterStatus('Phòng đã đặt')} /> Phòng đã đặt</label>
          <label><input type="radio" name="status" value="Phòng đang thuê" checked={filterStatus === 'Phòng đang thuê'} onChange={() => setFilterStatus('Phòng đang thuê')} /> Phòng đang thuê</label>
        </div>
        <div className="r-filter-section">
          <h3>Loại phòng</h3>
          <label><input type="radio" name="type" value="Tất cả" checked={filterType === 'Tất cả'} onChange={() => setFilterType('Tất cả')} /> Tất cả</label>
          <label><input type="radio" name="type" value="Phòng đơn" checked={filterType === 'Phòng đơn'} onChange={() => setFilterType('Phòng đơn')} /> Phòng đơn</label>
          <label><input type="radio" name="type" value="Phòng đôi" checked={filterType === 'Phòng đôi'} onChange={() => setFilterType('Phòng đôi')} /> Phòng đôi</label>
          <label><input type="radio" name="type" value="Phòng gia đình" checked={filterType === 'Phòng gia đình'} onChange={() => setFilterType('Phòng gia đình')} /> Phòng gia đình</label>
        </div>
        <div className="r-filter-section">
          <h3>Tình trạng</h3>
          <label><input type="radio" name="condition" value="Tất cả" checked={filterCondition === 'Tất cả'} onChange={() => setFilterCondition('Tất cả')} /> Tất cả</label>
          <label><input type="radio" name="condition" value="Đã dọn dẹp" checked={filterCondition === 'Đã dọn dẹp'} onChange={() => setFilterCondition('Đã dọn dẹp')} /> Đã dọn dẹp</label>
          <label><input type="radio" name="condition" value="Chưa dọn dẹp" checked={filterCondition === 'Chưa dọn dẹp'} onChange={() => setFilterCondition('Chưa dọn dẹp')} /> Chưa dọn dẹp</label>
          <label><input type="radio" name="condition" value="Sửa chữa" checked={filterCondition === 'Sửa chữa'} onChange={() => setFilterCondition('Sửa chữa')} /> Sửa chữa</label>
        </div>
      </div>
      
      <div style={{ paddingTop: '160px' }}> {/* Thêm padding-top để tạo khoảng đệm */}
        <div className="r-main-content">
          <div className="r-room-header">
            <span>Phòng đơn</span>
          </div>
          <div className="r-room-list">
            {filteredRooms.filter(room => room.status === 'Phòng trống').map((room) => (
              <RoomCard
                key={room.number}
                roomNumber={room.number}
                status={room.status}
                date={room.date}
                roomType={room.roomType}
                condition={room.condition}
              />
            ))}
          </div>
          <div className="r-room-header">
            <span>Phòng đôi</span>
          </div>
          <div className="r-room-list">
            {filteredRooms.filter(room => room.status === 'Phòng đã đặt').map((room) => (
              <RoomCard
                key={room.number}
                roomNumber={room.number}
                status={room.status}
                date={room.date}
                roomType={room.roomType}
                condition={room.condition}
              />
            ))}
          </div>
          <div className="r-room-header">
            <span>Phòng gia đình</span>
          </div>
          <div className="r-room-list">
            {filteredRooms.filter(room => room.status === 'Phòng đang thuê').map((room) => (
              <RoomCard
                key={room.number}
                roomNumber={room.number}
                status={room.status}
                date={room.date}
                roomType={room.roomType}
                condition={room.condition}
              />
            ))}
          </div>
        </div>
      </div>
           {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={handleCancelLogout}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có muốn đăng xuất?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmLogout}>
                YES
              </button>
              <button className="cancel-button" onClick={handleCancelLogout}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;