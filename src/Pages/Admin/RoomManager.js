
import React, { useState } from 'react';
import '../../Design_Css/Admin/RoomManager.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal'; 
const RoomManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    status: '',
    roomType: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const rooms = [
    { id: 'P101', roomNumber: 'P101', status: 'Đã dọn dẹp', roomType: 'Phòng đơn' },
    { id: 'P102', roomNumber: 'P102', status: 'Chưa dọn dẹp', roomType: 'Phòng đơn' },
    { id: 'P103', roomNumber: 'P103', status: 'Đã dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P104', roomNumber: 'P104', status: 'Chưa dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P105', roomNumber: 'P105', status: 'Sửa chữa', roomType: 'Phòng đôi' },
    { id: 'P106', roomNumber: 'P106', status: 'Đã dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P201', roomNumber: 'P201', status: 'Chưa dọn dẹp', roomType: 'Phòng đơn' },
    { id: 'P202', roomNumber: 'P202', status: 'Đã dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P203', roomNumber: 'P203', status: 'Sửa chữa', roomType: 'Phòng đôi' },
    { id: 'P204', roomNumber: 'P204', status: 'Chưa dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P205', roomNumber: 'P205', status: 'Đã dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P206', roomNumber: 'P206', status: 'Chưa dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P207', roomNumber: 'P207', status: 'Sửa chữa', roomType: 'Phòng đôi' },
    { id: 'P208', roomNumber: 'P208', status: 'Đã dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P209', roomNumber: 'P209', status: 'Chưa dọn dẹp', roomType: 'Phòng đôi' },
    { id: 'P210', roomNumber: 'P210', status: 'Đã dọn dẹp', roomType: 'Phòng đơn' },
    { id: 'P301', roomNumber: 'P301', status: 'Chưa dọn dẹp', roomType: 'Phòng gia đình' },
    { id: 'P302', roomNumber: 'P302', status: 'Sửa chữa', roomType: 'Phòng gia đình' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/'; // Điều hướng sau khi xác nhận
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    const room = rooms.find((r) => r.id === id);
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };
const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  const filteredRooms = rooms.filter((room) =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const room = rooms.find((r) => r.id === id);
    setRoomToDelete(room);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa phòng ${roomToDelete.id}`);
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
  };

  const handleAddRoom = () => {
    setNewRoom({
      roomNumber: '',
      status: '',
      roomType: ''
    });
    setSelectedRoom(null);
    setShowDetailsModal(true);
  };

  const handleSave = () => {
    if (selectedRoom) {
      console.log('Lưu thông tin phòng:', selectedRoom);
    } else {
      console.log('Thêm phòng mới:', newRoom);
      setShowAddSuccess(true);
    }
    setShowDetailsModal(false);
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowDetailsModal(false);
    setSelectedRoom(null);
    setNewRoom({
      roomNumber: '',
      status: '',
      roomType: ''
    });
  };

  return (
    <div className="rm-main-container">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={() => setShowLogoutConfirm(true)} 
      />
       <LogoutModal 
        isOpen={showLogoutConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Quản Lý Phòng</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="rm-content-wrapper">
        <div className="rm-search-add-section">
          <div className="rm-search-box">
            <span className="rm-search-icon"><img src="/icon_LTW/TimKiem.png" alt="#"></img></span>
            <input
              type="text"
              placeholder="Tìm theo số phòng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="rm-add-room-btn" onClick={handleAddRoom}>
            Thêm phòng
          </button>
        </div>

        <div className="rm-table-container">
          <table className="rm-room-table">
            <thead>
              <tr>
                <th>Số phòng</th>
                <th>Tình trạng</th>
                <th>Loại phòng</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.status}</td>
                  <td>{room.roomType}</td>
                  <td>
                    <button className="rm-edit-btn" onClick={() => handleEdit(room.id)}>
                      <span className="rm-edit-icon"><img src="/icon_LTW/Edit.png" alt="#"></img></span>
                    </button>
                  </td>
                  <td>
                    <button
                      className="rm-delete-btn"
                      onClick={() => handleDelete(room.id)}
                    >
                      <span className="rm-delete-icon"><img src="/icon_LTW/Xoa.png" alt="#"></img></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div className="cm-modal-overlay">
          <div className={selectedRoom ? 'rm-edit-modal-wrapper' : 'rm-add-modal-wrapper'}>
            <h2 className="cm-modal-title">{selectedRoom ? `Sửa phòng ${selectedRoom.roomNumber}` : 'Thêm phòng'}</h2>
            <div className="cm-modal-content">
              <div className="cm-form-container">
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/QLP_SoPhong.png" alt="#"></img></span>
                  <input
                    type="text"
                    placeholder="Số phòng"
                    value={selectedRoom ? selectedRoom.roomNumber : newRoom.roomNumber}
                    onChange={(e) => {
                      if (selectedRoom) {
                        setSelectedRoom({ ...selectedRoom, roomNumber: e.target.value });
                      } else {
                        setNewRoom({ ...newRoom, roomNumber: e.target.value });
                      }
                    }}
                    className="cm-input-field"
                  />
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/QLP_SuaPhong.png" alt="#"></img></span>
                  <select
                    value={selectedRoom ? selectedRoom.status : newRoom.status}
                    onChange={(e) => {
                      if (selectedRoom) {
                        setSelectedRoom({ ...selectedRoom, status: e.target.value });
                      } else {
                        setNewRoom({ ...newRoom, status: e.target.value });
                      }
                    }}
                    className="cm-select-field"
                  >
                    <option value="" disabled>Tình trạng</option>
                    <option value="Đã dọn dẹp">Đã dọn dẹp</option>
                    <option value="Chưa dọn dẹp">Chưa dọn dẹp</option>
                    <option value="Sửa chữa">Sửa chữa</option>
                  </select>
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/QLP_SuaPhong2.png" alt="#"></img></span>
                  <select
                    value={selectedRoom ? selectedRoom.roomType : newRoom.roomType}
                    onChange={(e) => {
                      if (selectedRoom) {
                        setSelectedRoom({ ...selectedRoom, roomType: e.target.value });
                      } else {
                        setNewRoom({ ...newRoom, roomType: e.target.value });
                      }
                    }}
                    className="cm-select-field"
                  >
                    <option value="" disabled>Loại phòng</option>
                    <option value="Phòng đơn">Phòng đơn</option>
                    <option value="Phòng đôi">Phòng đôi</option>
                    <option value="Phòng gia đình">Phòng gia đình</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="cm-modal-actions">
              <button className={selectedRoom ? 'rm-save-edit-btn' : 'rm-save-add-btn'} onClick={handleSave}>Lưu</button>
              <button className="cm-cancel-btn" onClick={handleCancel}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}
     
      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            {showAddSuccess ? (
              <p className="logout-message">Thêm phòng thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin phòng thành công!</p>
            )}
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => {
                setShowSaveConfirm(false);
                setShowAddSuccess(false);
              }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && roomToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa phòng {roomToDelete.roomNumber}?</p>
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
            <p className="logout-message">Xóa phòng thành công!</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowDeleteSuccess(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;