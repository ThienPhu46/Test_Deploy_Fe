import React, { useState } from 'react';
import '../../Design_Css/Admin/ServiceManager.css';
import Sidebar from '../../Components/Admin/Sliderbar';

const ServiceManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    serviceCode: '',
    serviceName: '',
    serviceType: '',
    unitPrice: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const services = [
    { serviceCode: 1, serviceName: 'Đưa đón', serviceType: 'Vận chuyển', unitPrice: '17,000 VND' },
    { serviceCode: 2, serviceName: 'Pepsi', serviceType: 'Nước uống', unitPrice: '12,000 VND' },
    { serviceCode: 3, serviceName: 'Sting', serviceType: 'Nước uống', unitPrice: '12,000 VND' },
    { serviceCode: 4, serviceName: 'Cơm chiên', serviceType: 'Đồ ăn', unitPrice: '30,000 VND' },
    { serviceCode: 5, serviceName: 'Mì xào', serviceType: 'Đồ ăn', unitPrice: '25,000 VND' },
    { serviceCode: 6, serviceName: 'Đưa đón sân bay', serviceType: 'Vận chuyển', unitPrice: '200,000 VND' },
    { serviceCode: 7, serviceName: 'Karaoke', serviceType: 'Giải trí', unitPrice: '150,000 VND' },
    { serviceCode: 8, serviceName: 'Chuyển đồ', serviceType: 'Vận chuyển', unitPrice: '100,000 VND' },
    { serviceCode: 9, serviceName: 'Bún bò', serviceType: 'Đồ ăn', unitPrice: '30,000 VND' },
    { serviceCode: 10, serviceName: 'Mì quảng', serviceType: 'Đồ ăn', unitPrice: '25,000 VND' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sm-main-container">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={() => setShowLogoutConfirm(true)} 
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Quản Lý Dịch Vụ</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="sm-content-wrapper">
        <div className="sm-search-add-section">
          <div className="sm-search-box">
            <span className="sm-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên dịch vụ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="sv-add-action">
            <button className="sm-add-service-btn" onClick={() => {
              setNewService({
                serviceCode: '',
                serviceName: '',
                serviceType: '',
                unitPrice: ''
              });
              setSelectedService(null);
              setShowDetailsModal(true);
            }}>
              Thêm dịch vụ
            </button>
          </div>
        </div>

        <div className="sm-table-container">
          <table className="sm-service-table">
            <thead>
              <tr>
                <th>Mã dịch vụ</th>
                <th>Tên dịch vụ</th>
                <th>Loại</th>
                <th>Đơn giá</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.serviceCode}>
                  <td>{service.serviceCode}</td>
                  <td>{service.serviceName}</td>
                  <td>{service.serviceType}</td>
                  <td>{service.unitPrice}</td>
                  <td>
                    <div className="sv-edit-action">
                      <button className="sm-edit-btn" onClick={() => {
                        setSelectedService(service);
                        setShowDetailsModal(true);
                      }}>
                        <span className="sm-edit-icon">✏️</span>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="sv-delete-action">
                      <button
                        className="sm-delete-btn"
                        onClick={() => {
                          setServiceToDelete(service);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <span className="sm-delete-icon">🗑️</span>
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
        <div className="sv-modal-overlay">
          <div className="sv-modal-wrapper">
            <h2 className="sv-modal-title">{selectedService ? `Sửa dịch vụ ${selectedService.serviceCode}` : 'Thêm dịch vụ'}</h2>
            <div className="sv-modal-content">
              <div className="sv-form-container">
                <div className="sv-form-field">
                  <span className="sv-field-icon">🔢</span>
                  <input
                    type="text"
                    placeholder="Mã dịch vụ"
                    value={selectedService ? selectedService.serviceCode : newService.serviceCode}
                    onChange={(e) => {
                      if (selectedService) {
                        setSelectedService({ ...selectedService, serviceCode: e.target.value });
                      } else {
                        setNewService({ ...newService, serviceCode: e.target.value });
                      }
                    }}
                    className="sv-input-field"
                  />
                </div>
                <div className="sv-form-field">
                  <span className="sv-field-icon">📋</span>
                  <input
                    type="text"
                    placeholder="Tên dịch vụ"
                    value={selectedService ? selectedService.serviceName : newService.serviceName}
                    onChange={(e) => {
                      if (selectedService) {
                        setSelectedService({ ...selectedService, serviceName: e.target.value });
                      } else {
                        setNewService({ ...newService, serviceName: e.target.value });
                      }
                    }}
                    className="sv-input-field"
                  />
                </div>
                <div className="sv-form-field">
                  <span className="sv-field-icon">🏷️</span>
                  <select
                    value={selectedService ? selectedService.serviceType : newService.serviceType}
                    onChange={(e) => {
                      if (selectedService) {
                        setSelectedService({ ...selectedService, serviceType: e.target.value });
                      } else {
                        setNewService({ ...newService, serviceType: e.target.value });
                      }
                    }}
                    className="sv-select-field"
                  >
                    <option value="" disabled>Loại dịch vụ</option>
                    <option value="Đồ ăn">Đồ ăn</option>
                    <option value="Nước uống">Nước uống</option>
                    <option value="Vận chuyển">Vận chuyển</option>
                    <option value="Giải trí">Giải trí</option>
                  </select>
                </div>
                <div className="sv-form-field">
                  <span className="sv-field-icon">💰</span>
                  <input
                    type="text"
                    placeholder="Đơn giá"
                    value={selectedService ? selectedService.unitPrice : newService.unitPrice}
                    onChange={(e) => {
                      if (selectedService) {
                        setSelectedService({ ...selectedService, unitPrice: e.target.value });
                      } else {
                        setNewService({ ...newService, unitPrice: e.target.value });
                      }
                    }}
                    className="sv-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="sv-modal-actions">
              <button className="sv-save-btn" onClick={() => {
                if (selectedService) {
                  console.log('Lưu thông tin dịch vụ:', selectedService);
                } else {
                  console.log('Thêm dịch vụ mới:', newService);
                  setShowAddSuccess(true);
                }
                setShowDetailsModal(false);
                setShowSaveConfirm(true);
              }}>Lưu</button>
              <button className="sv-cancel-btn" onClick={() => {
                setShowDetailsModal(false);
                setSelectedService(null);
                setNewService({
                  serviceCode: '',
                  serviceName: '',
                  serviceType: '',
                  unitPrice: ''
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
              <p className="logout-message">Thêm dịch vụ thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin dịch vụ thành công!</p>
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
      {showDeleteConfirm && serviceToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}>X</span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa {serviceToDelete.serviceName}?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => {
                console.log(`Xóa dịch vụ ${serviceToDelete.serviceCode}`);
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

export default ServiceManagement;