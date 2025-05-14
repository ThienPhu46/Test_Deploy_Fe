import React, { useState } from 'react';
import '../../Design_Css/Admin/ServiceTypeManager.css';
import Sidebar from '../../Components/Admin/Sliderbar';

const ServiceTypeManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [newServiceType, setNewServiceType] = useState({
    serviceTypeCode: '',
    serviceTypeName: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [serviceTypeToDelete, setServiceTypeToDelete] = useState(null);

  const serviceTypes = [
    { serviceTypeCode: 1, serviceTypeName: 'Đồ ăn' },
    { serviceTypeCode: 2, serviceTypeName: 'Nước uống' },
    { serviceTypeCode: 3, serviceTypeName: 'Vận chuyển' },
    { serviceTypeCode: 4, serviceTypeName: 'Giải trí' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServiceTypes = serviceTypes.filter((serviceType) =>
    serviceType.serviceTypeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="svtype-main-container">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={() => setShowLogoutConfirm(true)} 
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Quản Lý Loại Dịch Vụ</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="svtype-content-wrapper">
        <div className="svtype-search-add-section">
          <div className="svtype-search-box">
            <span className="svtype-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên loại dịch vụ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="svtype-add-action">
            <button className="svtype-add-service-type-btn" onClick={() => {
              setNewServiceType({
                serviceTypeCode: '',
                serviceTypeName: ''
              });
              setSelectedServiceType(null);
              setShowDetailsModal(true);
            }}>
              Thêm loại dịch vụ
            </button>
          </div>
        </div>

        <div className="svtype-table-container">
          <table className="svtype-service-type-table">
            <thead>
              <tr>
                <th>Mã loại dịch vụ</th>
                <th>Tên loại dịch vụ</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceTypes.map((serviceType) => (
                <tr key={serviceType.serviceTypeCode}>
                  <td>{serviceType.serviceTypeCode}</td>
                  <td>{serviceType.serviceTypeName}</td>
                  <td>
                    <div className="svtype-edit-action">
                      <button className="svtype-edit-btn" onClick={() => {
                        setSelectedServiceType(serviceType);
                        setShowDetailsModal(true);
                      }}>
                        <span className="svtype-edit-icon">✏️</span>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="svtype-delete-action">
                      <button
                        className="svtype-delete-btn"
                        onClick={() => {
                          setServiceTypeToDelete(serviceType);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <span className="svtype-delete-icon">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div className="svtype-modal-overlay">
          <div className="svtype-modal-wrapper">
            <h2 className="svtype-modal-title">{selectedServiceType ? `Sửa loại dịch vụ ${selectedServiceType.serviceTypeCode}` : 'Thêm loại dịch vụ'}</h2>
            <div className="svtype-modal-content">
              <div className="svtype-form-container">
               
                <div className="svtype-form-field">
                  <span className="svtype-field-icon">📋</span>
                  <input
                    type="text"
                    placeholder="Tên loại dịch vụ"
                    value={selectedServiceType ? selectedServiceType.serviceTypeName : newServiceType.serviceTypeName}
                    onChange={(e) => {
                      if (selectedServiceType) {
                        setSelectedServiceType({ ...selectedServiceType, serviceTypeName: e.target.value });
                      } else {
                        setNewServiceType({ ...newServiceType, serviceTypeName: e.target.value });
                      }
                    }}
                    className="svtype-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="svtype-modal-actions">
              <button className="svtype-save-btn" onClick={() => {
                if (selectedServiceType) {
                  console.log('Lưu thông tin loại dịch vụ:', selectedServiceType);
                } else {
                  console.log('Thêm loại dịch vụ mới:', newServiceType);
                  setShowAddSuccess(true);
                }
                setShowDetailsModal(false);
                setShowSaveConfirm(true);
              }}>Lưu</button>
              <button className="svtype-cancel-btn" onClick={() => {
                setShowDetailsModal(false);
                setSelectedServiceType(null);
                setNewServiceType({
                  serviceTypeCode: '',
                  serviceTypeName: ''
                });
              }}>Hủy bỏ</button>
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
      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            {showAddSuccess ? (
              <p className="logout-message">Thêm loại dịch vụ thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin loại dịch vụ thành công!</p>
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
      {showDeleteConfirm && serviceTypeToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa {serviceTypeToDelete.serviceTypeName}?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => {
                console.log(`Xóa loại dịch vụ ${serviceTypeToDelete.serviceTypeCode}`);
                setShowDeleteConfirm(false);
                setShowDeleteSuccess(true);
              }}>
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
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}>X</span>
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
    </div>
  );
};

export default ServiceTypeManagement;