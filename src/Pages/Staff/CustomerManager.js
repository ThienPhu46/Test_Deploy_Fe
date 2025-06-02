import React, { useState } from 'react';
import '../../Design_Css/Staff/CustomerManager.css';
import Sidebar from '../../Components/Staff/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Staff/Components_Js/LogoutModal';

const CustomerManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    citizenId: '',
    phone: '',
    city: '',
    gender: '',
    nationality: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false); // Thông báo thêm thành công
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const customers = [
    { id: 1, name: 'Vũ Văn Phú', citizenId: '182731928733', phone: '0123456789', city: 'Biên Hòa', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 2, name: 'Trần Thị Bích Hạnh', citizenId: '13146789012', phone: '0912345678', city: 'Hà Nội', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 3, name: 'Lê Văn Hùng', citizenId: '234567890123', phone: '0987654321', city: 'TP. HCM', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 4, name: 'Nguyễn Minh Trang', citizenId: '234567890123', phone: '0909090909', city: 'Đà Nẵng', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 5, name: 'Phạm Quốc Hạnh', citizenId: '456789012345', phone: '093311222', city: 'Cần Thơ', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 6, name: 'Hồ Thị Thu Hương', citizenId: '567890123456', phone: '0977998888', city: 'Huế', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 7, name: 'Đặng Minh Tâm', citizenId: '678901234567', phone: '0911222333', city: 'Hải Phòng', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 8, name: 'Võ Ngọc Mai', citizenId: '789012345678', phone: '0966554444', city: 'Nha Trang', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 9, name: 'Nguyễn Văn Quang', citizenId: '890123456789', phone: '0944433222', city: 'Gia Lai', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 10, name: 'Lê Thị Kim Ngân', citizenId: '901234567890', phone: '0922110000', city: 'Bình Dương', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 11, name: 'Trần Nhật Hào', citizenId: '12345678901', phone: '0900222111', city: 'Tây Ninh', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 12, name: 'Mai Thị Điểm My', citizenId: '223456789012', phone: '0888110000', city: 'Quảng Nam', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 13, name: 'Phan Văn Lợi', citizenId: '334567890123', phone: '0933556666', city: 'Đồng Nai', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 14, name: 'Bùi Thị Thanh Thảo', citizenId: '445678901234', phone: '0977334444', city: 'Vũng Tàu', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 15, name: 'Nguyễn Đức Tài', citizenId: '556789012345', phone: '0911445555', city: 'Bến Tre', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 16, name: 'Vũ Thị Hồng Nhung', citizenId: '667890123456', phone: '0966778889', city: 'Kiên Giang', gender: 'Nữ', nationality: 'Việt Nam' },
    { id: 17, name: 'Lâm Văn Khôi', citizenId: '778901234567', phone: '0900112222', city: 'Phú Yên', gender: 'Nam', nationality: 'Việt Nam' },
    { id: 18, name: 'Trần Gia Huy', citizenId: '889012345678', phone: '0944002211', city: 'Bắc Ninh', gender: 'Nam', nationality: 'Việt Nam' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/'; // Điều hướng sau khi xác nhận
  };
  const handleDelete = (id) => {
    const customer = customers.find((c) => c.id === id);
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa khách hàng ${customerToDelete.id}`);
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
  };

  const handleAddCustomer = () => {
    setNewCustomer({
      name: '',
      citizenId: '',
      phone: '',
      city: '',
      gender: '',
      nationality: ''
    });
    setSelectedCustomer(null);
    setShowDetailsModal(true);
  };

  const handleSave = () => {
    if (selectedCustomer) {
      console.log('Lưu thông tin khách hàng:', selectedCustomer);
    } else {
      console.log('Thêm khách hàng mới:', newCustomer);
      setShowAddSuccess(true); // Hiển thị thông báo thêm thành công
    }
    setShowDetailsModal(false);
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowDetailsModal(false);
    setSelectedCustomer(null);
    setNewCustomer({
      name: '',
      citizenId: '',
      phone: '',
      city: '',
      gender: '',
      nationality: ''
    });
  };
  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  return (
    <div className="cm-main-container">
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
          <div className="top-title">Quản Lý Khách Hàng</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="cm-content-wrapper">
        <div className="cm-search-add-section">
          <div className="cm-search-box">
            <span className="cm-search-icon"><img src="/icon_LTW/TimKiem.png" alt="#"></img></span>
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="cm-add-customer-btn" onClick={handleAddCustomer}>
            Thêm khách hàng
          </button>
        </div>

        <div className="cm-table-container">
          <table className="cm-customer-table">
            <thead>
              <tr>
                <th>Mã khách hàng</th>
                <th>Họ và tên</th>
                <th>Căn cước công dân</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Quốc tịch</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.citizenId}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.city}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.nationality}</td>
                  <td>
                    <button className="cm-edit-btn" >
                      <img onClick={() => handleEdit(customer.id)} src="/icon_LTW/Edit.png" alt="#"></img>
                    </button>
                  </td>
                  <td>
                    <button
                      className="cm-delete-btn" >
                      <img onClick={() => handleDelete(customer.id)} src="/icon_LTW/Xoa.png" alt="#"></img>
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
          <div className="cm-modal-wrapper">
            <h2 className="cm-modal-title">{selectedCustomer ? `Sửa khách hàng ${selectedCustomer.id}` : 'Thêm khách hàng'}</h2>
            <div className="cm-modal-content">
              <div className="cm-form-container">
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_Hoten.png" alt="#"></img></span>
                  <input
                    type="text"
                    placeholder="Họ và tên khách hàng"
                    value={selectedCustomer ? selectedCustomer.name : newCustomer.name}
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer({ ...selectedCustomer, name: e.target.value });
                      } else {
                        setNewCustomer({ ...newCustomer, name: e.target.value });
                      }
                    }}
                    className="cm-input-field"
                  />
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_GioiTInh.png" alt="#"></img></span>
                  <select
                    value={selectedCustomer ? selectedCustomer.gender : newCustomer.gender}
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer({ ...selectedCustomer, gender: e.target.value });
                      } else {
                        setNewCustomer({ ...newCustomer, gender: e.target.value });
                      }
                    }}
                    className="cm-select-field"
                  >
                    <option value="" disabled>Giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_Chitietphieuthue.png" alt="#"></img></span>
                  <div className="cm-input-with-length">
                    <input
                      type="text"
                      placeholder="Nhập CCCD"
                      value={selectedCustomer ? selectedCustomer.citizenId : newCustomer.citizenId}
                      onChange={(e) => {
                        if (selectedCustomer) {
                          setSelectedCustomer({ ...selectedCustomer, citizenId: e.target.value });
                        } else {
                          setNewCustomer({ ...newCustomer, citizenId: e.target.value });
                        }
                      }}
                      className="cm-input-field"
                      maxLength="12"
                    />
                    <span className="cm-field-length">{(selectedCustomer ? selectedCustomer.citizenId : newCustomer.citizenId).length}/12</span>
                  </div>
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_SĐT.png" alt="#"></img></span>
                  <div className="cm-input-with-length">
                    <input
                      type="text"
                      placeholder="Nhập SĐT"
                      value={selectedCustomer ? selectedCustomer.phone : newCustomer.phone}
                      onChange={(e) => {
                        if (selectedCustomer) {
                          setSelectedCustomer({ ...selectedCustomer, phone: e.target.value });
                        } else {
                          setNewCustomer({ ...newCustomer, phone: e.target.value });
                        }
                      }}
                      className="cm-input-field"
                      maxLength="10"
                    />
                    <span className="cm-field-length">{(selectedCustomer ? selectedCustomer.phone : newCustomer.phone).length}/10</span>
                  </div>
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_Diachi.png" alt="#"></img></span>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={selectedCustomer ? selectedCustomer.city : newCustomer.city}
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer({ ...selectedCustomer, city: e.target.value });
                      } else {
                        setNewCustomer({ ...newCustomer, city: e.target.value });
                      }
                    }}
                    className="cm-input-field"
                  />
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_QuocTich.png" alt="#"></img></span>
                  <input
                    type="text"
                    placeholder="Nhập quốc tịch"
                    value={selectedCustomer ? selectedCustomer.nationality : newCustomer.nationality}
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer({ ...selectedCustomer, nationality: e.target.value });
                      } else {
                        setNewCustomer({ ...newCustomer, nationality: e.target.value });
                      }
                    }}
                    className="cm-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="cm-modal-actions">
              <button className="cm-save-btn" onClick={handleSave}>Lưu</button>
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
              <p className="logout-message">Thêm khách hàng thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin khách hàng thành công!</p>
            )}
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => {
                setShowSaveConfirm(false);
                setShowAddSuccess(false); // Đặt lại trạng thái thông báo
              }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && customerToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa {customerToDelete.name}?</p>
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
    </div>
  );
};

export default CustomerManagement;