import React, { useState } from 'react';
import '../../Design_Css/Admin/RoomTypeManager.css';
import Sidebar from '../../Components/Admin/Sliderbar';
const RoomTypeManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [newType, setNewType] = useState({
    typeCode: '',
    typeName: '',
    bedCount: '',
    dayPrice: '',
    hourPrice: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  

  const roomTypes = [
    { id: 'TP01', typeCode: '1', typeName: 'Phòng đơn', bedCount: 1, dayPrice: '300,000 VND', hourPrice: '60,000 VND' },
    { id: 'TP02', typeCode: '2', typeName: 'Phòng đôi', bedCount: 2, dayPrice: '450,000 VND', hourPrice: '80,000 VND' },
    { id: 'TP03', typeCode: '3', typeName: 'Phòng gia đình', bedCount: 3, dayPrice: '650,000 VND', hourPrice: '100,000 VND' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    const type = roomTypes.find((t) => t.id === id);
    setSelectedType(type);
    setShowEditModal(true);
  };

  const filteredTypes = roomTypes.filter((type) =>
    type.typeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const type = roomTypes.find((t) => t.id === id);
    setTypeToDelete(type);
    setShowDeleteConfirm(true);
  };

    const handleConfirmDelete = () => {
    console.log(`Xóa loại phòng ${typeToDelete.id}`);
    setShowDeleteConfirm(false);
     setShowDeleteSuccess(true);

  };

  const handleAddType = () => {
    setNewType({
      typeCode: '',
      typeName: '',
      bedCount: '',
      dayPrice: '',
      hourPrice: ''
    });
    setSelectedType(null);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (selectedType) {
      console.log('Lưu thông tin loại phòng:', selectedType);
    } else {
      console.log('Thêm loại phòng mới:', newType);
      setShowAddSuccess(true);
    }
    setShowEditModal(false);
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setSelectedType(null);
    setNewType({
      typeCode: '',
      typeName: '',
      bedCount: '',
      dayPrice: '',
      hourPrice: ''
    });
  };

  return (
    <div className="rtm-main-container">
        <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={() => setShowLogoutConfirm(true)} 
      />
      <div className="sidebar">
        <button onClick={() => setShowLogoutConfirm(true)}>Đăng xuất</button>
      </div>
       <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Quản Lý Loại Phòng</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>


      <div className="rtm-content-wrapper">
        <div className="rtm-search-add-section">
          <div className="rtm-search-box">
            <span className="rtm-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên loại phòng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="rtm-add-type-btn" onClick={handleAddType}>
            Thêm loại phòng
          </button>
        </div>

        <div className="rtm-table-container">
          <table className="rtm-type-table">
            <thead>
              <tr>
                <th>Mã loại phòng</th>
                <th>Tên loại phòng</th>
                <th>Số giường</th>
                <th>Giá ngày</th>
                <th>Giá giờ</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredTypes.map((type) => (
                <tr key={type.id}>
                  <td>{type.typeCode}</td>
                  <td>{type.typeName}</td>
                  <td>{type.bedCount}</td>
                  <td>{type.dayPrice}</td>
                  <td>{type.hourPrice}</td>
                  <td>
                    <button className="rtm-edit-btn" onClick={() => handleEdit(type.id)}>
                      <span className="rtm-edit-icon">✏️</span>
                    </button>
                  </td>
                  <td>
                    <button className="rtm-delete-btn" onClick={() => handleDelete(type.id)}>
                      <span className="rtm-delete-icon">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div className="rtm-modal-overlay">
          <div className={selectedType ? 'rtm-edit-modal-wrapper' : 'rtm-add-modal-wrapper'}>
            <h2 className="rtm-modal-title">{selectedType ? `Sửa loại phòng ${selectedType.typeName}` : 'Thêm loại phòng'}</h2>
            <div className="rtm-modal-content">
              <div className="rtm-form-container">
                <div className="rtm-form-field">
                  <span className="rtm-field-icon">🔢</span>
                  <input
                    type="text"
                    placeholder="Mã loại phòng"
                    value={selectedType ? selectedType.typeCode : newType.typeCode}
                    onChange={(e) => {
                      if (selectedType) {
                        setSelectedType({ ...selectedType, typeCode: e.target.value });
                      } else {
                        setNewType({ ...newType, typeCode: e.target.value });
                      }
                    }}
                    className="rtm-input-field"
                  />
                </div>
                <div className="rtm-form-field">
                  <span className="rtm-field-icon">🏷️</span>
                  <input
                    type="text"
                    placeholder="Tên loại phòng"
                    value={selectedType ? selectedType.typeName : newType.typeName}
                    onChange={(e) => {
                      if (selectedType) {
                        setSelectedType({ ...selectedType, typeName: e.target.value });
                      } else {
                        setNewType({ ...newType, typeName: e.target.value });
                      }
                    }}
                    className="rtm-input-field"
                  />
                </div>
                <div className="rtm-form-field">
                  <span className="rtm-field-icon">🛏️</span>
                  <input
                    type="number"
                    placeholder="Số giường"
                    value={selectedType ? selectedType.bedCount : newType.bedCount}
                    onChange={(e) => {
                      if (selectedType) {
                        setSelectedType({ ...selectedType, bedCount: e.target.value });
                      } else {
                        setNewType({ ...newType, bedCount: e.target.value });
                      }
                    }}
                    className="rtm-input-field"
                  />
                </div>
                <div className="rtm-form-field">
                  <span className="rtm-field-icon">💰</span>
                  <input
                    type="text"
                    placeholder="Giá ngày"
                    value={selectedType ? selectedType.dayPrice : newType.dayPrice}
                    onChange={(e) => {
                      if (selectedType) {
                        setSelectedType({ ...selectedType, dayPrice: e.target.value });
                      } else {
                        setNewType({ ...newType, dayPrice: e.target.value });
                      }
                    }}
                    className="rtm-input-field"
                  />
                </div>
                <div className="rtm-form-field">
                  <span className="rtm-field-icon">⏰</span>
                  <input
                    type="text"
                    placeholder="Giá giờ"
                    value={selectedType ? selectedType.hourPrice : newType.hourPrice}
                    onChange={(e) => {
                      if (selectedType) {
                        setSelectedType({ ...selectedType, hourPrice: e.target.value });
                      } else {
                        setNewType({ ...newType, hourPrice: e.target.value });
                      }
                    }}
                    className="rtm-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="rtm-modal-actions">
              <button className={selectedType ? 'rtm-save-edit-btn' : 'rtm-save-add-btn'} onClick={handleSave}>Lưu</button>
              <button className="rtm-cancel-btn" onClick={handleCancel}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && typeToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa loại phòng {typeToDelete.typeName}?</p>
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

      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            {showAddSuccess ? (
              <p className="logout-message">Thêm loại phòng thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin loại phòng thành công!</p>
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

      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowLogoutConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có muốn đăng xuất?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowLogoutConfirm(false)}>
                YES
              </button>
              <button className="cancel-button" onClick={() => setShowLogoutConfirm(false)}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}
       {showDeleteSuccess && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Xóa loại phòng thành công!</p>
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

export default RoomTypeManagement;